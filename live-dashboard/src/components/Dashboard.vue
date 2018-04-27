<template>
  <div class='wrapper-livedashboard'>

    <section class="description">
      <h1 class="display-1 my-5">Live Dashboard</h1>
      <p class="body-1 mt-3">
        This is an example of a live dashboard built using JS Catalyst. The data is being streamed in through websockets in real time from the IEX api. The two charts on the top, and the table at the bottom of the page are being fed live data. The other charts provide a analysis of past performance by showing previos stock performance based on the time filter applied. Please feel free to look at the code and play around or even use this as a base design for your dashboard! **Please note that the api is only actively sening new data between the hours of 9:30AM - 4:30PM EST. The charts may not update when out of this time period because the api is not actively updating. Thank you!**
      </p>
    </section>

    <div class='select-stock'>
      <panel-heading headerText="Select stock" />
          <v-select
          :items="stockSymbols"
          label="Type Stock here"
          single-line
          bottom
          :autocomplete='true'
          @input='changeStock'
          append-icon="trending_up"
        ></v-select>
    </div>


    <div class='line-plot'>
          <panel-heading :headerText="currentStock + ' Last Sale Price'" />
          <v-alert type="info" :value="true" v-if="liveLinePlotData.length === 0">
              Waiting for new Data
          </v-alert>
          <line-plot
            :dataModel='liveLinePlotData'
            propID='line-plot'
            metric='Last Sale Price'
            startDate="'January 01, 2017'"
            dateFormat="h:mm:ss"
            ></line-plot>
    </div>

    <div class='two-line-plot'>
        <panel-heading :headerText="currentStock + ' Ask Price compared to Last Sale Price'" />
        <v-alert type="info" :value="true" v-if="liveLinePlotData.length === 0">
            Waiting for new Data
        </v-alert>
        <two-line-plot v-else
          :dataModel='liveLinePlotData.slice(-40)'
          :dataModel2='liveLinePlotData2.slice(-40)'
          metric='Last Sale Price'
          metric2='Ask Price'
          propID='two-line-plot1'
          startDate="'Februrary 22, 2018'"
          dateFormat="h:mm:ss"
          :directComparison="true"
          ></two-line-plot>
    </div>

    <div class='bullet-chart'>
      <panel-heading headerText="Bullet Chart" />
          <bullet-chart
            :dataModel="bulletChartData"
            propID="container-bulletchart"
            :isStock="true"
          ></bullet-chart>
    </div>

    <div class='date-filters'>
      <div class="pan-heading">
        <panel-heading headerText="Choose Time Period" />
      </div>
      <div class="btn-container" style="padding-top:10px;">
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">1 Month</v-btn>
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">3 Months</v-btn>
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">YTD</v-btn>
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">1 Year</v-btn>
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">2 Years</v-btn>
        <v-btn class="filter-buttons" color="primary" large @click="selectTimeRange">5 Years</v-btn>
      </div>

    </div>

    <div class="difference-chart">
      <panel-heading :headerText="'Opening and Closing values of ' + currentStock + ' Stock ' + selectedTime" />
      <v-alert type="info" :value="true" v-if="staticLinePlotData.length === 0">
          Waiting for new Data
      </v-alert>
      <difference-chart
        :dataModel="staticDifferenceChartData"
        propID="container-differencechart"
        metric="Stock Price"
        dateFormat="MM-DD-YY"
        :keys="['Close Price','Open Price']"
      ></difference-chart>
    </div>

      <div class="stl-chart">
        <panel-heading :headerText="currentStock + ' Highs ' + selectedTime" />
        <line-plot
          :dataModel='staticLinePlotData'
          propID='line-plot-highvalue'
          metric='Daily High'
          startDate="'January 01, 2017'"
          dateFormat="MM-DD-YYYY"
          ></line-plot>
      </div>

    <div class="static-two-line">
      <panel-heading :headerText="currentStock + ' High compared to Low ' + selectedTime" />
      <v-alert type="info" :value="true" v-if="staticLinePlotData.length === 0">
          Waiting for new Data
      </v-alert>
      <two-line-plot
        :dataModel='staticTwoLinePlotData'
        :dataModel2='staticTwoLinePlotData2'
        metric='Daily High'
        metric2='Daily Low'
        propID='two-line-plot-highlow'
        startDate="'Februrary 22, 2018'"
        dateFormat="MM-DD-YYYY"
        ></two-line-plot>
    </div>



  <div class='stacked-bar' >
    <panel-heading headerText="Averages of Open/Close High/Low" />
    <stacked-bar-chart
      :dataModel='stackedBarData'
      propID='stacked-bar-chart'
      dateFormat='M/YY'
    ></stacked-bar-chart>
  </div>

    <div v-if='hasGridData' class='table'>
      <panel-heading headerText="Stock Data" />
          <ag-table
            :gridOptions="gridOptions"
          ></ag-table>
    </div>
  </div>
</template>

<script>
  // Components
  import { D3LinePlot,
          D3TwoLinePlot,
          D3DifferenceChart,
          D3BulletChart,
          D3LineChartZoomable,
          D3StreamGraph,
          D3StackedBarChart,
          AgTable } from 'jscatalyst'
  import PanelHeading from './PanelHeading.vue'

  // Utilities
  import moment from 'moment'
  import axios from 'axios'

  export default {
    data: function() {
      return {
        liveLinePlotData: [],
        liveLinePlotData2: [],
        connected: null,
        currentStock: 'FB',
        selectedTime: '1m',
        stockSymbols: [],
        staticLinePlotData: [],
        staticTwoLinePlotData: [],
        staticTwoLinePlotData2: [],
        staticDifferenceChartData: [],
        bulletChartData: [
          {'key': 'bidPrice', title: '- Bid Price'},
          {'key': 'askPrice', title: '- Ask Price'},
          {'key': 'lastSalePrice', title: '- Last Sale Price'}
        ],
        rowDataAg: [],
        columnDefsAg: [],
        hasGridData: false,
        stackedBarData: [],
        stockData: [],
      }
    },
    computed: {
      currentStockSymbol: function() {
        return this.currentStock.split(' ')[0]
      },
      gridOptions: function () {
          let gridOptions = {};
          gridOptions.rowHeight = 48;
          gridOptions.columnDefs = this.columnDefsAg;
          gridOptions.enableFilter = true;
          gridOptions.enableSorting = true;
          gridOptions.singleClickEdit = true;
          gridOptions.suppressScrollOnNewData = true;
          gridOptions.pagination = true;
          gridOptions.paginationPageSize = 10;
          gridOptions.rowBuffer = 100;
          gridOptions.debug = true;
          gridOptions.rowModelType = 'inMemory'
          gridOptions.getRowNodeId = function(data) {
            return data.id
          }
          //gridOptions.onCellClicked = this.onClicked;
          return gridOptions
      }
    },
    watch: {
      connected: function(value){
        this.connected = value
      }
    },
    components: {
      'panel-heading': PanelHeading,
      'line-plot': D3LinePlot,
      'two-line-plot': D3TwoLinePlot,
      'difference-chart': D3DifferenceChart,
      'bullet-chart': D3BulletChart,
      'ag-table': AgTable,
      'stream-graph': D3StreamGraph,
      'stacked-bar-chart': D3StackedBarChart
    },
    created() {
      axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        .then(res => {
          this.stockSymbols = res.data.filter(el => el.isEnabled).map(el => {
            return el['symbol'] + ' - ' + el['name']
          })
        })
    },
    mounted: function(){
      if (!this.$socket.connected) {
        this.connected = false
      }
      this.$socket.emit('subscribe', this.currentStock)
      this.getLiveStockData();
      this.getStaticStockData()
    },
    // defines all events that this comonent listens for from a websocket server
    sockets: {
      connect: function() {
        console.log('connected to websocket');
        this.connected = true
        this.$socket.emit('subscribe', this.currentStock)
      },
      message: function(data) {
        var parsedData;
        parsedData = JSON.parse(data)
        this.liveLinePlotData = this.liveLinePlotData.concat([{date: moment(parsedData.lastUpdated).format('HH:mm:ss'), value: parsedData.lastSalePrice}])
        this.liveLinePlotData2 = this.liveLinePlotData2.concat([{date: moment(parsedData.lastUpdated).format('HH:mm:ss'), value: parsedData.askPrice}])
        this.bulletChartData = this.bulletChartData.map(el => {
          var bulletType = el.key
          return Object.assign({}, el, {measures: [parsedData[bulletType]]})
        })

        if (!this.hasGridData) {
          this.columnDefsAg = Object.keys(parsedData).map(el => {
            var key = el.slice(0,1).toUpperCase() + el.slice(1)
            return {
              headerName: key,
              field: el
            }
          })
          this.rowDataAg = [Object.assign({}, parsedData, {
            id: moment(),
            lastSaleTime: moment(parsedData.lastSaleTime).format('h:mm:ss'),
            lastUpdated: moment(parsedData.lastUpdated).format('h:mm:ss')
          })];
          this.hasGridData = true;
          this.gridOptions.rowData = this.rowDataAg
        } else {
          this.rowDataAg.push(Object.assign({}, parsedData, {
            id: moment(),
            lastSaleTime: moment(parsedData.lastSaleTime).format('h:mm:ss'),
            lastUpdated: moment(parsedData.lastUpdated).format('h:mm:ss')
          }));
          this.rowDataAg.sort((a,b) => {
            return b.id - a.id;
          });
          this.gridOptions.api.setRowData(this.rowDataAg);
        }
      }
    },
    destroyed() {
      this.$socket.emit('unsubscribe', this.currentStockSymbol)
    },
    methods: {
      changeStock: function(stock) {
        this.$socket.emit('unsubscribe', this.currentStockSymbol)
        this.currentStock = stock
        this.liveLinePlotData = []
        this.liveLinePlotData2 = []
        this.gridOptions= {};
        this.getLiveStockData();
        this.getStaticStockData()
        this.$socket.emit('subscribe', this.currentStockSymbol)
      },
      selectTimeRange: function(event) {
        if(event.target.firstChild.nodeValue === '1 Month') {
          this.selectedTime = '1m'
        } else if(event.target.firstChild.nodeValue === '3 Months') {
          this.selectedTime = '3m'
        } else if(event.target.firstChild.nodeValue === 'YTD'){
          this.selectedTime = 'ytd'
        } else if(event.target.firstChild.nodeValue === '1 Year'){
          this.selectedTime = '1y'
        } else if(event.target.firstChild.nodeValue === '2 Years'){
          this.selectedTime = '2y'
        } else {
          this.selectedTime = '5y'
        };
        this.getStaticStockData()
      },
      getLiveStockData: function() {
        var today = moment().format('YYYYMMDD')
        var requestURL = `https://api.iextrading.com/1.0/stock/${this.currentStockSymbol}/chart/date/${today}`;
        var localThis = this;
        axios.get(requestURL)
          .then(res => {
            var lineData = [];
            res.data.forEach(el => {
              lineData.push({
                date: moment(el['minute']+ ':00', 'HH:mm:ss').format('HH:mm:ss'),
                value: el['average']
              })
            })
            var openData = res.data[0]
            this.bulletChartData = this.bulletChartData.map(el => {
              var currentData = openData['average']
              return {
                title: this.currentStockSymbol + "-" + el.title.split('-')[1],
                subtitle: 'in $',
                ranges: [currentData - 5, currentData, currentData + 5],
                measures: [currentData],
                markers: [currentData-3],
                key: el.key
              }

            })
            this.liveLinePlotData = lineData;
            this.liveLinePlotData2 = lineData;
          })
      },
      getStaticStockData: function() {
        axios.get(`https://api.iextrading.com/1.0/stock/${this.currentStockSymbol}/chart/${this.selectedTime}`)
          .then(res => {
            var data = res.data
            this.staticLinePlotData = data.slice().map(el => {
              return {
                date: moment(el.date).format('MM-DD-YYYY'),
                value: el.high
              }
            })
            this.staticTwoLinePlotData = this.staticLinePlotData.slice()
            this.staticTwoLinePlotData2 = data.slice().map(el => {
              return {
                date: moment(el.date).format('MM-DD-YYYY'),
                value: el.low
              }
            })
            this.staticDifferenceChartData = data.slice().map(el => {
              return {
                date: moment(el.date).format('MM-DD-YY'),
                expected: el.close,
                actual: el.open
              }
            })
            var months = {};
            data.slice().forEach(el => {
              var month = moment(el.date.split('-')[1] + '/' + el.date.split('-')[0], 'MM/YYYY').format('M/YY')
              if (!months[month]) {
                months[month] = {
                  open: el.open,
                  close: el.close,
                  high: el.high,
                  low: el.low,
                  count: 1
                }
              } else {
                months[month].open += el.open
                months[month].close += el.close
                months[month].high += el.high
                months[month].low += el.low
                months[month].count += 1
              }
            })
            var streamData = [];
            for (var key in months) {
              var count = months[key].count
              streamData.push({
                date: key,
                open: (months[key].open / count).toFixed(2),
                close: (months[key].close / count).toFixed(2),
                high: (months[key].high / count).toFixed(2),
                low: (months[key].low / count).toFixed(2)
              })
            }
            this.stackedBarData = streamData;
            this.stockData = data
          })
      }
    }
  }

</script>

<style>

  /* grid area abbreviations are defined in classes below */

  .wrapper-livedashboard {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(12, 1fr);
    padding: 0px 0px 30px 0px;
    grid-template-areas:
      'er er er er er er er er er er er er'
      '. ds ds ds ds ds ds ds ds ds ds .'
      '. ss ss ss ss ss ss ss ss ss ss .'
      '. lp lp lp lp lp lp lp lp lp lp .'
      '. tl tl tl tl tl tl tl tl tl tl .'
      '. bl bl bl bl bl bl bl bl bl bl .'
      '. df df df df df df df df df df .'
      '. dif dif dif dif dif dif dif dif dif dif .'
      '. slp slp slp slp slp slp slp slp slp slp .'
      '. stl stl stl stl stl stl stl stl stl stl .'
      '. st st st st st st st st st st .'
      '. tb tb tb tb tb tb tb tb tb tb .';
  }

  @media (min-width: 800px) {
    .wrapper-livedashboard {
      grid-template-areas:
        ". ds ds ds ds ds ds ds ds ds ds ."
        ". ss ss ss ss ss ss ss ss ss ss ."
        ". lp lp lp lp lp tl tl tl tl tl ."
        ". bl bl bl bl bl bl bl bl bl bl ."
        ". df df df df df df df df df df ."
        ". dif dif dif dif dif ch ch ch ch ch ."
        ". stl stl stl stl stl stl stl stl stl stl ."
        ". st st st st st st st st st st ."
        ". tb tb tb tb tb tb tb tb tb tb .";
    }
  }

  @media (min-width: 1500px) {
    .wrapper-livedashboard {
      grid-template-areas:
        "er er er er er er er er er er er er"
        ". ds ds ds ds ds ds ds ds ds ds ."
        ". ss ss ss ss . . . . . . ."
        ". lp lp lp lp lp tl tl  tl tl tl ."
        ". bl bl bl bl bl bl bl bl bl bl ."
        ". df df df df df df df df df df ."
        ". dif dif dif dif ch ch ch ch ch ch ."
        ". stl stl stl stl st st st st st st ."
        ". tb tb tb tb tb tb tb tb tb tb .";
    }
  }

  .error {
    grid-area: er;
  }

  .description {
    grid-area: ds;
  }

  .select-stock {
    height: 100px;
    grid-area: ss;
  }

  .line-plot {
    height: 400px;
    grid-area: lp;
  }

  .two-line-plot {
    height: 400px;
    grid-area: tl;
  }

  .static-two-line {
    height: 500px;
    grid-area: stl;
  }

  .stl-chart {
    grid-area: ch;
    height: 500px;
  }

  .filter {
    grid-area: df;
  }

  .header {
    grid-area: hd;
    width:100%;
  }

  .bullet-chart {
    padding-top: 50px;
    height: 370px;
    grid-area: bl;
  }

  .difference-chart {
    height: 500px;
    grid-area: dif;
  }

  .date-filters {
    height: 200px;
    display: grid;
    grid-area: df;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'ph'
      'bn';
  }

  .pan-heading {
    grid-area: ph;
  }

  .stacked-bar {
    height: 500px;
    grid-area: st;
  }

  .table {
    height: 550px;
    grid-area: tb;
  }

  .btn-container {
    justify-content: center;
    text-align: center;
  }

  .filter-buttons {
    grid-area: bn;
    width: 150px;
  }

</style>
