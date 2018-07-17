import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import ChartistCharts from '@/components/ChartistCharts'
import ChartjsCharts from '@/components/ChartjsCharts'
import D3Charts from '@/components/D3Charts'
import PlotlyCharts from '@/components/PlotlyCharts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/chartist',
      name: 'ChartistCharts',
      component: ChartistCharts
    },
    {
      path: '/chartjs',
      name: 'ChartjsCharts',
      component: ChartjsCharts
    },
    {
      path: '/d3',
      name: 'D3Charts',
      component: D3Charts
    },
    {
      path: '/plotly',
      name: 'PlotlyCharts',
      component: PlotlyCharts
    }
  ]
})
