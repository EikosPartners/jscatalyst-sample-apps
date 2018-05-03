import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    socketAddress: 'http://localhost:4000',
    allUsers: [],
    myIPaddress: '',
    myUsername: '',
    mySocketID: ''
  },
  mutations: {
    ALL_USERS: function(state, payload) {
      state.allUsers = payload
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
  	}
  }



})
