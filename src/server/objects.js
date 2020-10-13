import createGanttChart from './phases/createGanttChart.js'
import createDay from './phases/createDay.js'

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
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 3,
            name: '3',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 4,
            name: '4',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 5,
            name: '5',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 6,
            name: '6',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 7,
            name: '7',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 8,
            name: '8',
            function: createDay,
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