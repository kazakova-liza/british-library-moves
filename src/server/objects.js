import createGanttChart from './phases/createGanttChart.js'
import createDay1 from './phases/day1.js'

const objects = {
    inputs: [
        {
            name: "Variables table",
            type: "text"
        },
    ],
    phases: [
        {
            number: 1,
            name: '1',
            function: createGanttChart,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 2,
            name: '2',
            function: createDay1,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        }
    ],
    speeds: {
        A: 0.2,
        B: 0.25
    }
}

export default objects;