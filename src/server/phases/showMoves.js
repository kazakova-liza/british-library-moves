import cache from '../cache.js'
import objects from '../objects.js';


const showMoves = () => {
    let svgUpdate = [];
    cache.moves.map((move) => {
        let value;
        let startDay;
        const moveNumber = cache.moves.indexOf(move) + 1;
        if (move.condition === null) {
            startDay = 1;
        }
        else {
            const dependency = svgUpdate.find((element) => element.ref === move.condition);
            startDay = dependency.endDay;
        }
        if (move.map2 === null) {
            value = `${move.type} ${move.desc} at ${move.map1}`;
        }
        else {
            value = `${move.type} ${move.desc} from ${move.map1} to ${move.map2}`;
        }
        svgUpdate.push({
            id: `move_${moveNumber}`,
            ref: move.ref,
            type: move.type,
            number: moveNumber,
            value,
            condition: move.condition,
            duration: move.duration,
            startDay,
            endDay: startDay + move.duration
        })
    })
    console.log(svgUpdate);
    return svgUpdate;
}

export default showMoves;