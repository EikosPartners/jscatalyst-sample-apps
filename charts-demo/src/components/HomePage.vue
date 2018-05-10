<template lang="html">
  <main>
    <section class="left">
      <h1 class="display-3">Chart Examples</h1>
      <p class="headline my-3">
        This page demonstrates all of the charts, including the various charting JavaScript libraries, available in the JS Catalyst package.</p>
    </section>
    <section class="right">
      <div class="card">
        <div class="my-3 mb-5">
          <h3 class="title mb-2">To Use</h3>
          <p>The libraries and their respective charts are located in the menu dropdown on the upper left. All of the charts respond to various color themes, which can be changed using the Themes dropdown in the navigation bar.</p>
          <p>In JS Catalyst, you can use pre-made themes, or easily create your own.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">D3 Charts</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nisl nec fermentum laoreet, augue nulla pulvinar risus, a sagittis justo turpis vel elit. Aliquam et est tincidunt Read more <a href="#"> tincidunt</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Plotly Charts</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nisl nec fermentum laoreet, augue nulla pulvinar risus, a sagittis justo turpis vel elit. Aliquam et est tincidunt Read more <a href="#"> tincidunt</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Chartjs Charts</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nisl nec fermentum laoreet, augue nulla pulvinar risus, a sagittis justo turpis vel elit. Aliquam et est tincidunt Read more <a href="#"> tincidunt</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Chartist Charts</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nisl nec fermentum laoreet, augue nulla pulvinar risus, a sagittis justo turpis vel elit. Aliquam et est tincidunt Read more <a href="#"> tincidunt</a>.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
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
