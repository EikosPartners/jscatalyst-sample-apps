import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  	localVideo: null,
  	remoteVideo: null,
  	localAudio: null,
  	remoteAudio: null

  },
  mutations: {
  	SET_LOCAL_VIDEO: function(state, payload) {
  		state.localVideo = payload.el
  	},
  	SET_REMOTE_VIDEO: function(state, payload) {
  		state.remoteVideo = payload.el
  	},
  	SET_LOCAL_AUDIO: function(state, payload) {
  		state.localAudio = payload.el
  	},
  	 SET_REMOTE_AUDIO: function(state, payload) {
  		state.remoteAudio = payload.el
  	},
  },
  getters: {

  },
  actions: {

  }

})