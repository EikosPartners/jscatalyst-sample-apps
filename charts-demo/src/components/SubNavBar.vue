<template>
  <v-card class="py-2">
    <div class="text-xs-center">
      <v-btn flat :to="{name: 'HomePage'}" class="primary">Home</v-btn>
      <v-btn flat :to="{name: 'D3Charts'}" class="primary">D3</v-btn>
      <v-btn flat :to="{name: 'Google'}" class="primary">Google</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'sub-nav',
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
