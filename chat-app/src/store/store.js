import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    socketAddress: 'http://localhost:4000',
    allUsers: [],
    myUsername: '',
    mySocketID: '',
    myChats: [],
    myDMs: [],
    connected: false
  },
  mutations: {
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
    SOCKET_CONNECT: function(state, payload) {
      state.connected = true
      this._vm.$socket.emit('pageOpened')
    },
    SOCKET_USERCONNECTED: function(state, payload) {
      let msg = payload[0]
      if (!state.myUsername) {
          state.myUsername = msg.username
        }
      if (!state.mySocketID) {
        state.mySocketID = msg.id
      } else if (state.mySocketID === msg.id && state.myUsername !== msg.username)  {
        state.myUsername = msg.username
      }
      if (!this.getters.allUsersByUserName || !this.getters.allUsersByUserName.includes(msg.username)) {
         state.allUsers = [...state.allUsers, msg]
         state.myDMs.push({username: msg.username, messages: []})
      }
    },
    SOCKET_ALLUSERS: function(state, payload) {
      let msg = payload[0]
      msg.forEach(item=>{
          if (!this.getters.allUsersByUserName || !this.getters.allUsersByUserName.includes(item.username)) {
            state.allUsers = [...state.allUsers, item]
            state.myDMs.push({username: item.username, messages: []})
          }
        })
    },
    SOCKET_USERDISCONNECTED: function(state, payload) {
      let msg = payload[0]
      state.allUsers = state.allUsers.filter(item=>{return item.username !== msg.username })
      state.myDMs = state.myDMs.filter(item=>{return item.username !== msg.username})
    },
    SOCKET_DIRECTMESSAGE: function(state, payload) {
      let to = payload[0].recipient
      let from = payload[0].from 
      let value = payload[0].value 
      let messagePool = state.myDMs
      let poolIndexFinder = messagePool.map(item=>item.username)
      let indexOfSender
      if (to.username === state.myUsername) {
        indexOfSender = poolIndexFinder.indexOf(from.username)
        state.myDMs[indexOfSender].messages.push(payload[0])
      } else if (from.username === state.myUsername){
        indexOfSender = poolIndexFinder.indexOf(to.username)
        state.myDMs[indexOfSender].messages.push(payload[0])
      } 
    },
    SOCKET_CHATMESSAGE: function(state, payload) {
      state.myChats.push(payload[0])
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
  	},
    darkness: function(state, getters){
      return state.themeMod.displayTheme !== 'light'
    },
    chatRows: function(state, getters){
        if (getters.usersWhoAreNotMeByUserName.length > 5) {
          return getters.usersWhoAreNotMeByUserName.length * 3
        } else if (state.myChats.length < 15) {
          return 15
        } else {
           return state.myChats.length + 1
        }
    }

  }
})
