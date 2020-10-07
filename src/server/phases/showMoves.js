import cache from '../cache.js'
import objects from '../objects.js';


const showMoves = () => {
    let svgUpdate = [];
    cache.moves.map((move) => {
        let value;
        let startDay;
        let duration;
        const moveNumber = cache.moves.indexOf(move) + 1;
        if (move.condition === null) {
            startDay = 1;
        }
        else {
            const dependency = svgUpdate.find((element) => element.ref === move.condition);
            startDay = dependency.endDay;
        }
        if (move.map2 === null) {
            value = `${move.ref} ${move.type} ${move.desc} at ${move.map1}`;
        }
        else {
            value = `${move.ref} ${move.type} ${move.desc} from ${move.map1} to ${move.map2}`;
        }
        if (move.desc === '') {
            duration = move.duration;
        }
        else {
            duration = move.length / objects.speeds[move.speed];
        }
        svgUpdate.push({
            id: `move_${moveNumber}`,
            ref: move.ref,
            type: move.type,
            number: moveNumber,
            value,
            length: move.length,
            speed: move.speed,
            condition: move.condition,
            duration,
            startDay,
            endDay: startDay + duration
        })
        // console.log(objects.speeds[move.speed] * move.length)
    })
    console.log(svgUpdate);
    return svgUpdate;
}

export default showMoves;