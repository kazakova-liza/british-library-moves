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
        },
        {
            number: 9,
            name: '9',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 10,
            name: '10',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 11,
            name: '11',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 12,
            name: '12',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 13,
            name: '13',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 14,
            name: '14',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 15,
            name: '15',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 16,
            name: '16',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 17,
            name: '17',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 18,
            name: '18',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 19,
            name: '19',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 20,
            name: '20',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 21,
            name: '21',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 22,
            name: '22',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 23,
            name: '23',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 24,
            name: '24',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 25,
            name: '25',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 26,
            name: '26',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },

    ],
    speeds: {
        A: 0.2,
        B: 0.25
    }
}

export default objects;