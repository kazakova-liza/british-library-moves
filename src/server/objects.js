import showMoves from './phases/showMoves.js'

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
            function: showMoves,
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