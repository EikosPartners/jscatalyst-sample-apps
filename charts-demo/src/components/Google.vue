<template>
    <main>
        <h1 class="display-2 mb-5 text-xs-center">Google Charts</h1>

        <div class="google-wrapper">
            <div class="timeline">
                <timeline :dataModel="tlData" :title="'GoogleCharts Timeline'"/>
            </div>
        </div>
    </main>
</template>

<script>
    import { Timeline } from 'jscatalyst';

    import tlData from '@/mockData/google/timelineMock.js'

    export default {
        components: {
            'timeline': Timeline
        },
        data () {
            return { 
                tlData: tlData
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
    }
</style>