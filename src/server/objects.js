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
        {
            number: 27,
            name: '27',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 28,
            name: '28',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 29,
            name: '29',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 30,
            name: '30',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 31,
            name: '31',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 32,
            name: '32',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 33,
            name: '33',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 34,
            name: '34',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 35,
            name: '35',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 36,
            name: '36',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 37,
            name: '37',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 38,
            name: '38',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 39,
            name: '39',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 40,
            name: '40',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 41,
            name: '41',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 42,
            name: '42',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 43,
            name: '43',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 44,
            name: '44',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 45,
            name: '45',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 46,
            name: '46',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 47,
            name: '47',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 48,
            name: '48',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 49,
            name: '49',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 50,
            name: '50',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 51,
            name: '51',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 52,
            name: '52',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 53,
            name: '53',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 54,
            name: '54',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 55,
            name: '55',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 56,
            name: '56',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 57,
            name: '57',
            function: createGanttChart,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 58,
            name: '58',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 59,
            name: '59',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 60,
            name: '60',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 61,
            name: '61',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 62,
            name: '62',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 63,
            name: '63',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 64,
            name: '64',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 65,
            name: '65',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 66,
            name: '66',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 67,
            name: '67',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 68,
            name: '68',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 69,
            name: '69',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 70,
            name: '70',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 71,
            name: '71',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 72,
            name: '72',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 73,
            name: '73',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 74,
            name: '74',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 75,
            name: '75',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 76,
            name: '76',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 77,
            name: '77',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 78,
            name: '78',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 79,
            name: '79',
            function: createDay,
            textOnProcessing: 'processing',
            textOnCompletion: 'finished',
            async: false,
            svgTransitionElementId: undefined,
            svgShowOnTransitionId: undefined
        },
        {
            number: 80,
            name: '80',
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