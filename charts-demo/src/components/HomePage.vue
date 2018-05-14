<template lang="html">
  <main>
    <section class="left">
      <h1 class="display-3">Chart Examples</h1>
      <p class="headline my-3">
        This page displays all of the charts, including the various charting JavaScript libraries, available in the JS Catalyst package.</p>
    </section>
    <section class="right">
      <div class="card">
        <div class="my-3 mb-5">
          <h3 class="title mb-2">To Use</h3>
          <p>The libraries and their respective charts are located below. All of the charts respond to various color themes, which can be changed using the Themes dropdown in the navigation bar.</p>
          <p>In JS Catalyst, you can use pre-made themes, or easily create your own.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">D3 Charts</h3>
          <p>The most popular JavaScript data visualization library. Charts are built using HTML, SVG, and CSS. <a href="https://d3js.org/" target="_blank">Read more</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Plotly Charts</h3>
          <p>A declarative charting library with easy-to-use, beautifully styled visuals. <a href="https://plot.ly/" target="_blank">Read more</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Chartjs Charts</h3>
          <p>A simple and flexible charting library. <a href="http://www.chartjs.org/" target="_blank">Read more</a>.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">Chartist Charts</h3>
          <p>A flexible, responsive charting library. <a href="https://gionkunz.github.io/chartist-js/" target="_blank">Read more</a>.</p>
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
