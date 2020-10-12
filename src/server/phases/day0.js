import getter from '../airtable/getter.js';
import cache from '../cache.js';

const createDay1 = async (phase) => {
    let svgUpdate = [];
    svgUpdate.push({
        id: 'dayNumber',
        svg: 2,
        value: phase + 1,
    })
    const colors = await getter('collections');
    cache.moves.map((move) => {
        console.log(move);
        const floor = move.floor;
        if (move.fromZone !== null) {
            if (move.collection !== null) {
                const zones = move.fromZone.split(",");
                console.log(zones);

                const collectionColor = colors.find((col) => col.collection === move.collection).collectionColor;
                zones.map((zone) => {
                    svgUpdate.push({
                        id: `zone_${floor}_${zone}`,
                        svg: 2,
                        color: collectionColor
                    })
                })
            }
        }
    })
    return svgUpdate;
}

export default createDay1;


// const createGanttChartAndDay0 = () => {
//     let svgUpdate = [];
//     createGanttChart(svgUpdate);
//     cache.transitionDays = cache.transitionDays.filter((day, i) => cache.transitionDays.indexOf(day) === i);
//     cache.transitionDays = cache.transitionDays.sort();
//     createDay0(svgUpdate);
//     // console.log(svgUpdate);
//     return svgUpdate;
// }