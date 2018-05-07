import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    socketAddress: 'http://localhost:4000',
    allUsers: [],
    myIPaddress: '',
    myUsername: '',
    mySocketID: '',
  },
  mutations: {
    ADD_USER: function(state, payload) {
      state.allUsers = [...state.allUsers, payload]
    },
    REMOVE_USER: function(state, payload) {
      state.allUsers = state.allUsers.filter(item=>{return item.username !== payload.username })
    },
    MY_IP_ADDRESS: function(state, payload) {
    	state.myIPaddress = payload
    },
    MY_USERNAME: function(state, payload) {
    	state.myUsername = payload
    },
    MY_SOCKET_ID: function(state, payload) {
    	state.mySocketID = payload
    },

  },
  getters: {
  	usersWhoAreMe: function(state, getters){
  		return state.allUsers.filter(item=>{return item.username == state.myUsername})
  	},
  	usersWhoAreNotMe: function(state, getters) {
  		 return state.allUsers.filter(item=>{return item.username != state.myUsername})
  	},
  	allUsersByUserName: function(state, getters) {
  		return state.allUsers.map(item=>item.username)
  	}
  },
  // plugins: [(new VuexPersistence({
  //       storage: window.sessionStorage
  //   })).plugin]



})
