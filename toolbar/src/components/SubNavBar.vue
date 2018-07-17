<template>
    <v-card class="py-2">
    <div class="text-xs-center">
      <v-btn flat @click="openApp('http://localhost:8081')" class="primary">Charts Demo</v-btn>
      <v-btn flat @click="openApp('http://localhost:8082')" class="primary">Chat Demo</v-btn>
      <v-btn flat @click="openApp('http://localhost:8083')" class="primary">Live Dashboard Demo</v-btn>
      <v-btn flat @click="openApp('http://localhost:8084')" class="primary">UI Builder Demo</v-btn>
      <v-btn flat @click="openApp('http://localhost:8085')" class="primary">Screen Sharing Demo</v-btn>
    </div>
  </v-card>
    
</template>

<script>
import WindowManagementMixin from '../mixins/windowManagementMixin'

export default {
  name: 'sub-nav',
  mixins: [WindowManagementMixin],
  data () {
    return {
    }
  },
  computed: {
    menu: {
      get: function() {
        return this.$store.state.menu
      },
      set: function() {
      }
    }
  },
  methods: {
    toggleMenu: function() {
      this.$store.commit('toggleMenu')
    },
  }
}
</script>

<style lang="stylus" scoped>
  // #menu-button {
  //   position: fixed;
  //   z-index: 2;
  // }
  //
  // a {
  //   text-decoration: none;
  // }
  //
  // .sidebar-menu {
  //   font-family: Roboto;
  //   font-size: 18px;
  //   line-height: 1.4;
  //   text-align: left;
  //   color: #212b36;
  //   margin-left: 5px;
  // }
</style>
