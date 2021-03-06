import cache from '../cache.js'
import objects from '../objects.js';

const createGanttChart = () => {
    let svgUpdate = [];
    let totalLengthMoved = 0;
    cache.transitionDays = [];
    cache.moves.map((move) => {
        let value;
        let startDay;
        let duration;
        const moveNumber = cache.moves.indexOf(move) + 1;
        if (move.condition === '') {
            startDay = 1;
        }
        else {
            const dependency = svgUpdate.find((element) => element.ref === move.condition);
            startDay = dependency.endDay + 1;
        }
        if (move.map2 === '') {
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
        startDay = Math.round(startDay);
        const endDay = Math.round(startDay + duration - 1);

        cache.transitionDays.push(startDay);
        cache.transitionDays.push(endDay);

        svgUpdate.push({
            id: `move_${moveNumber}`,
            svg: 1,
            ref: move.ref,
            type: move.type,
            building: move.building,
            floor: move.floor,
            toBuilding: move.toBuilding,
            toFloor: move.toFloor,
            toZone: move.toZone,
            fromZone: move.fromZone,
            collection: move.collection,
            number: moveNumber,
            value,
            length: move.length,
            speed: move.speed,
            condition: move.condition,
            duration: Math.round(duration),
            startDay,
            endDay
        })
        totalLengthMoved += move.length;
    })
    const maxDay = Math.max(...cache.transitionDays);
    svgUpdate.push({
        id: 'length_moved',
        svg: 1,
        value: Math.round(totalLengthMoved),
    })
    svgUpdate.push({
        id: 'maximum_day',
        svg: 1,
        value: Math.round(maxDay),
    })
    cache.processedMoves = svgUpdate;
    console.log(cache.processedMoves);
    return svgUpdate;
}

export default createGanttChart;