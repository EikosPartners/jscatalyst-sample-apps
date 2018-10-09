<template>
    <main>
        <h1 class="display-2 mb-5 text-xs-center">Google Charts</h1>

        <div class="google-wrapper">
            <div class="timeline">
                <timeline :dataModel="tlData" :title="'GoogleCharts Timeline'"/>
            </div>
            <div class="gauge">
                <gauge :dataModel="gaugeData" :title="'GoogleCharts Gauge'" :config="gaugeOpts"/>
            </div>
            <div class="orgchart">
                <orgchart :dataModel="orgData" :title="'GoogleCharts Org Chart'"></orgchart>
            </div>
            <div class="sankey">
                <sankey :dataModel="sankeyData" :title="'GoogleCharts Sankey Diagram'"/>
            </div>
            <div class="combo">
                <combo :dataModel="comboData" :title="'GoogleCharts Combo Chart'" :config='comboOpts'/>
            </div>
        </div>
    </main>
</template>

<script>
    import { Timeline, Gauge, OrgChart, SankeyDiagram, ComboChart } from 'jscatalyst';

    import tlData from '@/mockData/google/timelineMock.js'
    import gaugeData from '@/mockData/google/gaugeMock.js';
    import orgData from '@/mockData/google/orgChartMock.js';
    import sankeyData from '@/mockData/google/sankeyDiagramMock.js';
    import comboData from '@/mockData/google/comboChartMock.js'

    export default {
        components: {
            'timeline': Timeline,
            'gauge': Gauge,
            'orgchart': OrgChart,
            'sankey': SankeyDiagram,
            'combo': ComboChart
        },
        data () {
            return { 
                tlData,
                gaugeData,
                orgData,
                sankeyData,
                gaugeOpts: {
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                },
                comboData,
                comboOpts: {
                    seriesType: 'bars',
                    series: [
                        { type: 'bars'},
                        { type: 'candlesticks' },
                        { type: 'line'}
                    ],
                    height: 300,
                    backgroundColor: "white"
                }
            }
        }
    }
</script>

<style lang="stylus">
    .google-wrapper {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(12, 1fr);

        & .timeline {
            height: 500px;
            grid-column: 1/7;
        }

        & .gauge {
            height: 500px;
            grid-column: 7/13;
        }

        & .orgchart {
            height: 500px;
            grid-column: 1/7;
        }

        & .sankey {
            height: 500px;
            grid-column: 7/13;
        }

        & .combo {
            height: 500px;
            grid-column: 1/7;
        }
    }
</style>