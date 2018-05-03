import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    socketAddress: 'http://localhost:4000',
    menu: null,
    allUsers: [],
    myIPaddress: ''
  },
  mutations: {
    ALL_USERS: function(state, payload) {
      console.log(payload);
      state.allUsers = [...state.allUsers, payload]
    },
    MY_IP_ADDRESS: function(state, payload) {
    	state.myIPaddress = payload
    },

  },
  getters: {
  	usersWhoAreMe: function(state, getters){
  		return state.allUsers.filter(item=>{return item.address == state.myIPaddress})
  	},
  	usersWhoAreNotMe: function(state, getters) {
  		 return state.allUsers.filter(item=>{return item.address != state.myIPaddress})
  	}
  }



})
