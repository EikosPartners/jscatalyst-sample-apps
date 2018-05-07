var lifeCycleMixin;
import {mapState, mapGetters} from 'vuex'

export default lifeCycleMixin = {
    created(){
        window.addEventListener('beforeunload', this.closeHandler)
    },
    beforeMount() {
      this.connected = this.$socket.connected
    },
    mounted: function(){
      if (this.connected) {
          this.$socket.emit('pageOpened')
      }
    },
    computed: {
      ...mapState([
        'allUsers',
        'myUsername',
        'mySocketID'
      ]),
      ...mapGetters([
        'usersWhoAreMe',
        'usersWhoAreNotMe',
        'allUsersByUserName'
      ]),
    },
    methods: {
      closeHandler: function(event){
        this.$socket.emit('pageClosed', {username: this.myUsername, id: this.mySocketID})
      }

    }
}
