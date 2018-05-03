const express = require('express');
const router = express.Router();
const barData = require('../src/mockData/barchartMock.json')
const bubbleData = require('../src/mockData/bubbleMock.json')
const heatData = require('../src/mockData/heatmapMock.json')
const stackData = require('../src/mockData/stackedbarchartMock.json')
const lineData = require('../src/mockData/lineChartMock.json')
const linePlotData = require('../src/mockData/linePlotMock.json')
const punchData = require('../src/mockData/punchCardMock.json')
const ganttData = require('../src/mockData/ganttChartMock.json')
const twoLineData = require('../src/mockData/twoLinePlotMock.json')
const pieData = require('../src/mockData/pieChartMock.json')
const sunData = require('../src/mockData/flare.json')
const scatterData = require('../src/mockData/scatterplotMock.json')
const differenceData = require('../src/mockData/differenceChartMock.json')
const bulletData = require('../src/mockData/bulletChartMock.json')
const dendroData = require('../src/mockData/dendrogramMock.json')
const zoomData = require('../src/mockData/lineChartZoomableMock.json')
const usCountyData = require('../src/mockData/usMapCountyMock.json')
const usStateData = require('../src/mockData/usMapStateMock.json')
const histogramData = require('../src/mockData/histogramMock.json')
const worldData = require('../src/mockData/worldMapMock.json')
const boxData = require('../src/mockData/boxPlotMock.json')
const forceData = require('../src/mockData/forceDirectedGraphMock.json')

const cjspieData = require('../src/mockData/polarMock.json')
const cjsbubbleData = require('../src/mockData/bubbleMock.json')
const radarData = require('../src/mockData/radarMock.json')
const cjsscatterData = require('../src/mockData/scatterMock.json')
const multiLineData = require('../src/mockData/multiLineMock.json')

router.get('/:comp', (req, res) => {
    const dataModels = {
      'barchart': barData,
      linechart: lineData,
      bubblechart: bubbleData,
      heatmap: heatData,
      stackedbar: stackData,
      lineplot: linePlotData,
      punchcard: punchData,
      ganttchart: ganttData,
      twolineplot: twoLineData,
      piechart: pieData,
      sunburst: sunData,
      scatterplot: scatterData,
      differencechart: differenceData,
      bulletchart: bulletData,
      dendrogram: dendroData,
      zoomablelinechart: zoomData,
      usmapcounty: usCountyData,
      usmapstate: usStateData,
      histogram: histogramData,
      wolrdmap: worldData,
      boxplot: boxData,
      forcegraph: forceData,
      cjspiechart: cjspieData,
      cjsbubblechart: cjsbubbleData,
      radarchart: radarData,
      cjsscatterplot: cjsscatterData,
      multiline: multiLineData
    }
    res.send({ dataModel: dataModels[req.params.comp] });
});

module.exports = router;
