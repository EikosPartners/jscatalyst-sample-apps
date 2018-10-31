<template>
  <div>
    <v-btn
      style='background-color: var(--fifth)'
      @click.stop="toggleMenu"
      left
      small
      id='menu-button'
    >
      <v-icon>menu</v-icon>
    </v-btn>


      <v-toolbar flat class="transparent">

    <v-navigation-drawer
      v-model='menu'
      clipped
      fixed
      app
      stateless
    >
        <v-btn
          block
          @click.stop="toggleMenu"
          style='background-color: var(--fifth)'
          id='close-menu'
        >
          <v-icon>chevron_left</v-icon> Close
        </v-btn>
      </v-toolbar>

      <v-list class="mt-3">
        <v-list-tile>
          <v-list-tile-title><router-link :to="{name: 'HomePage'}" class="sidebar-menu">Home</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="sidebar-menu parent-page">Data Visualizations</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>insert_chart</v-icon> </v-list-tile-avatar>
           <v-list-tile-title>  <router-link :to="{name: 'D3Charts'}" class="sidebar-menu">D3</router-link> </v-list-tile-title>
          </v-list-tile>
          <!-- <v-list-tile> <v-list-tile-avatar> <v-icon>pie_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'PlotlyCharts'}" class="sidebar-menu">Plotly</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>bubble_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ChartjsCharts'}" class="sidebar-menu">Chartjs</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>multiline_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ChartistCharts'}" class="sidebar-menu">Chartist</router-link> </v-list-tile-title>
          </v-list-tile> -->
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>


</template>

<script>
export default {
  name: 'main-nav-drawer',
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
    grabScreen: function() {
      alert('Grab Screen')
    }
  }
}
</script>

<style lang="stylus" scoped>
  #menu-button {
    position: fixed;
    z-index: 2;
  }

  a {
    text-decoration: none;
  }

  .sidebar-menu {
    font-family: Roboto;
    font-size: 18px;
    line-height: 1.4;
    text-align: left;
    color: #212b36;
    margin-left: 5px;
  }

</style>
