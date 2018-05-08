import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    socketAddress: 'http://localhost:4000',
    allUsers: [],
    myUsername: '',
    mySocketID: '',
  },
  mutations: {
    ALL_USERS: function(state, payload) {
      state.allUsers = payload
    },
    ADD_USER: function(state, payload) {
      state.allUsers = [...state.allUsers, payload]
    },
    REMOVE_USER: function(state, payload) {
      state.allUsers = state.allUsers.filter(item=>{return item.username !== payload.username })
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
  		return state.allUsers.filter(item=>{return item.id == state.mySocketID})
  	},
  	usersWhoAreNotMe: function(state, getters) {
  		 return state.allUsers.filter(item=>{return item.id != state.mySocketID})
  	},
    usersWhoAreNotMeByUserName: function(state, getters) {
       return state.allUsers.filter(item=>{return item.id != state.mySocketID}).map(item=> item.username)
    },
  	allUsersByUserName: function(state, getters) {
  		return state.allUsers.map(item=>item.username)
  	}
  }
  // plugins: [(new VuexPersistence({
  //       storage: window.sessionStorage
  //   })).plugin]



})
