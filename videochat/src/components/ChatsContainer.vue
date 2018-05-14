<template>
<div>
	<MyContext :logVideoLoaded="logVideoLoaded"  />
	<Receiver :logVideoLoaded="logVideoLoaded" :logResizedVideo="logResizedVideo" /> 
</div>

</template>

<script>
const adapter = require('webrtc-adapter');
import MyContext from './MyContext'
import Receiver from './Receiver'
import {mapState} from 'vuex'


export default {
	data: function(){
		return {

		}
	},
	computed: {
	    ...mapState([
	      'localVideo',
	      'localAudio',
	      'remoteVideo',
	      'remoteAudio',
	      'localStream',
		  'remoteStream',
		  'localPeerConnection',
		  'remotePeerConnection',
		  'offerOptions',
		  'startButton',
		  'callButton',
		  'hangupButton',
		  'startTime'
	    ])
	  },

	components: {
		MyContext,
		Receiver
	},
	methods: {
		gotLocalMediaStream(mediaStream) {
		  this.localVideo.srcObject = mediaStream;
		  this.localStream = mediaStream;
		  this.trace('Received local stream.');
		  callButton.disabled = false;  // Enable call button.
		},
		handleLocalMediaStreamError(error) {
		  this.trace(`navigator.getUserMedia error: ${error.toString()}.`);
		},
		gotRemoteMediaStream(event) {
		  const mediaStream = event.stream;
		  this.remoteVideo.srcObject = mediaStream;
		  this.remoteStream = mediaStream;
		  this.trace('Remote peer connection received remote stream.');
		},
		logVideoLoaded(event) {
		  const video = event.target;
		  this.trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
		        `videoHeight: ${video.videoHeight}px.`);
		},
		logResizedVideo(event) {
		  this.logVideoLoaded(event);

		  if (this.startTime) {
		    const elapsedTime = window.performance.now() - this.startTime;
		    this.$store.commit('SET_START_TIME', {time: null}) 
		    this.trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
		  }
		},
		handleConnection(event) {
		  const peerConnection = event.target;
		  const iceCandidate = event.candidate;

		  if (iceCandidate) {
		    const newIceCandidate = new RTCIceCandidate(iceCandidate);
		    const otherPeer = this.getOtherPeer(peerConnection);

		    otherPeer.addIceCandidate(newIceCandidate)
		      .then(() => {
		        this.handleConnectionSuccess(peerConnection);
		      }).catch((error) => {
		        this.handleConnectionFailure(peerConnection, error);
		      });

		    this.trace(`${this.getPeerName(peerConnection)} ICE candidate:\n` +
		          `${event.candidate.candidate}.`);
		  }
		},
		handleConnectionSuccess(peerConnection) {
		  this.trace(`${this.getPeerName(peerConnection)} addIceCandidate success.`);
		},
		handleConnectionFailure(peerConnection, error) {
		  this.trace(`${this.getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
		        `${error.toString()}.`);
		},
		handleConnectionChange(event) {
		  const peerConnection = event.target;
		  console.log('ICE state change event: ', event);
		  this.trace(`${this.getPeerName(peerConnection)} ICE state: ` +
		        `${peerConnection.iceConnectionState}.`);
		},
		setSessionDescriptionError(error) {
		  this.trace(`Failed to create session description: ${error.toString()}.`);
		},
		setDescriptionSuccess(peerConnection, functionName) {
		  const peerName = this.getPeerName(peerConnection);
		  this.trace(`${peerName} ${functionName} complete.`);
		},
		setLocalDescriptionSuccess(peerConnection) {
		  this.setDescriptionSuccess(peerConnection, 'setLocalDescription');
		},
		setRemoteDescriptionSuccess(peerConnection) {
		  this.setDescriptionSuccess(peerConnection, 'setRemoteDescription');
		},
		createdOffer(description) {
		  this.trace(`Offer from localPeerConnection:\n${description.sdp}`);

		  this.trace('localPeerConnection setLocalDescription start.');
		  this.localPeerConnection.setLocalDescription(description)
		    .then(() => {
		      this.setLocalDescriptionSuccess(this.localPeerConnection);
		    }).catch(this.setSessionDescriptionError);

		  this.trace('remotePeerConnection setRemoteDescription start.');
		  this.remotePeerConnection.setRemoteDescription(description)
		    .then(() => {
		      this.setRemoteDescriptionSuccess(this.remotePeerConnection);
		    }).catch(this.setSessionDescriptionError);

		  this.trace('remotePeerConnection createAnswer start.');
		  this.remotePeerConnection.createAnswer()
		    .then(createdAnswer)
		    .catch(this.setSessionDescriptionError);
		},

		createdAnswer(description) {
		  this.trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

		  this.trace('remotePeerConnection setLocalDescription start.');
		  this.remotePeerConnection.setLocalDescription(description)
		    .then(() => {
		      this.setLocalDescriptionSuccess(this.remotePeerConnection);
		    }).catch(this.setSessionDescriptionError);

		  this.trace('localPeerConnection setRemoteDescription start.');
		  this.localPeerConnection.setRemoteDescription(description)
		    .then(() => {
		      this.setRemoteDescriptionSuccess(this.localPeerConnection);
		    }).catch(this.setSessionDescriptionError);
		},
	    startAction() {
	      this.startButton.disabled = true;
	      navigator.mediaDevices.getUserMedia({video: true})
	        .then(this.gotLocalMediaStream).catch(this.handleLocalMediaStreamError);
	      this.trace('Requesting local stream.');
	    },
		callAction(){

		  this.callButton.disabled = true;
	      this.hangupButton.disabled = false;

	      this.trace('Starting call.');
	      this.$store.commit('SET_START_TIME', {time: window.performance.now()}) 

	      const videoTracks = this.localStream.getVideoTracks();
	      const audioTracks = this.localStream.getAudioTracks();
	      if (videoTracks.length > 0) {
	        this.trace(`Using video device: ${videoTracks[0].label}.`);
	      }
	      if (audioTracks.length > 0) {
	        this.trace(`Using audio device: ${audioTracks[0].label}.`);
	      }

	      const servers = null;  // Allows for RTC server configuration.

	      // Create peer connections and add behavior.
	      this.localPeerConnection = new RTCPeerConnection(servers);
	      this.trace('Created local peer connection object localPeerConnection.');

	      this.localPeerConnection.addEventListener('icecandidate', this.handleConnection);
	      this.localPeerConnection.addEventListener(
	        'iceconnectionstatechange', this.handleConnectionChange);

	      this.remotePeerConnection = new RTCPeerConnection(servers);
	      this.trace('Created remote peer connection object remotePeerConnection.');

	      this.remotePeerConnection.addEventListener('icecandidate', this.handleConnection);
	      this.remotePeerConnection.addEventListener(
	        'iceconnectionstatechange', this.handleConnectionChange);
	      this.remotePeerConnection.addEventListener('addstream', this.gotRemoteMediaStream);

	      // Add local stream to connection and create offer to connect.
	      this.localPeerConnection.addStream(this.localStream);
	      this.trace('Added local stream to localPeerConnection.');

	      this.trace('localPeerConnection createOffer start.');
	      this.localPeerConnection.createOffer(this.offerOptions)
	        .then(this.createdOffer).catch(this.setSessionDescriptionError);
		},
		hangupAction() {
		  this.localPeerConnection.close();
		  this.remotePeerConnection.close();
		  this.localPeerConnection = null;
		  this.remotePeerConnection = null;
		  this.hangupButton.disabled = true;
		  this.callButton.disabled = false;

		  this.trace('Ending call.');
		},
	    getOtherPeer(peerConnection) {
		  return (peerConnection === this.localPeerConnection) ?
		      remotePeerConnection : this.localPeerConnection;
		},
		getPeerName(peerConnection) {
		  return (peerConnection === this.localPeerConnection) ?
		      'localPeerConnection' : 'remotePeerConnection';
		},
		trace(text) {
		  text = text.trim();
		  const now = (window.performance.now() / 1000).toFixed(3);

		  console.log(now, text);
		}


	},
	created(){

	},
	mounted(){


	},

}
</script>

<style>
</style>
