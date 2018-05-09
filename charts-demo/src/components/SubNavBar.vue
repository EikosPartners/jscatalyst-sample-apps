<template>
  <section class="mt-5">
    <v-btn flat :to="{name: 'HomePage'}" class="primary">Home</v-btn>
    <v-btn flat :to="{name: 'D3Charts'}" class="primary">D3</v-btn>
    <v-btn flat :to="{name: 'PlotlyCharts'}" class="primary">Plotly</v-btn>
    <v-btn flat :to="{name: 'ChartjsCharts'}" class="primary">Chartjs</v-btn>
    <v-btn flat :to="{name: 'ChartistCharts'}" class="primary">Chartist</v-btn>
  </section>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  section {
    margin: auto;
  }
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
