// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export const store = new Vuex.Store({
//   state: {
//   	localVideo: null,
//   	remoteVideo: null,
//   	localAudio: null,
//   	remoteAudio: null,
//     localStream: null,
//     remoteStream: null,
//     localPeerConnection: null,
//     remotePeerConnection: null,
//     offerOptions: {
//       offerToReceiveVideo: 1,
//     },
//     mediaStreamConstraints: {
//       video: true,
//     },
//     startButton: null,
//     callButton: null,
//     hangupButton: null,
//     startTime: null

//   },
//   mutations: {
//   	SET_LOCAL_VIDEO: function(state, payload) {
//   		state.localVideo = payload.el
//   	},
//   	SET_REMOTE_VIDEO: function(state, payload) {
//   		state.remoteVideo = payload.el
//   	},
//   	SET_LOCAL_AUDIO: function(state, payload) {
//   		state.localAudio = payload.el
//   	},
//   	 SET_REMOTE_AUDIO: function(state, payload) {
//   		state.remoteAudio = payload.el
//   	},
//     SET_LOCAL_STREAM: function(state, payload){
//         state.localStream = payload.stream
//     },
//     SET_REMOTE_STREAM: function(state, payload){
//         state.remoteStream = payload.stream
//     },
//     SET_LOCAL_PEER: function(state, payload){
//         state.localPeerConnection = payload.peer
//     },
//     SET_REMOTE_PEER: function(state, payload){
//         state.remotePeerConnection = payload.peer
//     },
//     SET_START_BUTTON: function(state, payload){
//       state.startButton = payload.el
//     },
//     SET_CALL_BUTTON: function(state, payload){
//       state.callButton = payload.el
//     },
//     SET_HANGUP_BUTTON: function(state, payload){
//       state.hangupButton = payload.el
//     },
//     SET_START_TIME: function(state, payload){
//       state.startTime = payload.time
//     }

//   },
//   getters: {

//   },
//   actions: {

//   }

// })