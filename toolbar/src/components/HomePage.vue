<template lang="html">
  <main>
    <toolbar></toolbar>
    <sub-nav></sub-nav>
  </main>
</template>

<script>
import Toolbar from './Toolbar.vue'
import SubNavBar from './SubNavBar.vue'

import ScreenGrabMixin from '../mixins/screengrabMixin'
import WindowManagementMixin from '../mixins/windowManagementMixin'


export default {
   components: {
    'toolbar': Toolbar,
    'sub-nav': SubNavBar
  },
  mixins: [ScreenGrabMixin, WindowManagementMixin],
}
</script>

<style lang="css" scoped>
main {
    height: 100%;
    display: grid;
    grid-gap: 40px;
    justify-content: space-around;
    /* background-color: #E0E0E0; */
  }

  section {
    margin: auto 80px;
  }

  .left {
    grid-column: 1 / 4;
    grid-row: 1 / 1;
  }

  .right {
    grid-column: 5 / 12;
    grid-row: 1 / 1;
  }

  .card {
    padding: 40px;
    background-color: #FFF;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #999;
  }
</style>
