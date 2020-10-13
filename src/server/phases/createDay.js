import getter from '../airtable/getter.js';
import cache from '../cache.js';

const createDay = async (phase) => {
    cache.transitionDays = cache.transitionDays.filter((day, i) => cache.transitionDays.indexOf(day) === i);
    cache.transitionDays = cache.transitionDays.sort();
    const currentDay = cache.transitionDays[phase];
    console.log(currentDay);
    let objectsUpdate = [];
    objectsUpdate.push({
        id: 'dayNumber',
        type: "variable",
        svg: 2,
        value: currentDay,
    })
    const colors = await getter('collections');
    cache.processedMoves.filter((move) => move.startDay <= currentDay && move.endDay >= currentDay)
        .map((move) => {
            const floor = move.floor;
            const toFloor = move.toFloor;
            const toBuilding = move.toBuilding;
            const fromZones = move.fromZone.split(",");
            let toObjects = [];
            let arrowStartingPoint = '';
            let arrowEndPoint = '';

            if (fromZones.length <= 4) {
                arrowStartingPoint = `zone_${floor}_${fromZones[1]}`;
            }
            if (fromZones.length === 9) {
                arrowStartingPoint = `zone_${floor}_${1}`;
            }
            if (move.type !== "Construction") {
                if (toBuilding === 'B31') {
                    arrowEndPoint = 'zone_b31';
                    toObjects.push(arrowEndPoint);
                }
                if (toBuilding === 'Off site') {
                    arrowEndPoint = 'offSite';
                    toObjects.push(arrowEndPoint);
                }
                else {
                    const toZones = move.toZone.split(",");
                    if (toZones.length === 9) {
                        arrowEndPoint = `zone_${toFloor}_${1}`;
                    }
                    if (toZones.length === 4 || toZones.length === 2) {
                        arrowEndPoint = `zone_${toFloor}_${toZones[1]}`;
                    }
                    toObjects = toZones.map((zone) => `zone_${floor}_${zone}`);
                }
            }
            const collectionColor = colors.find((col) => col.collection === move.collection).collectionColor;
            const fromObjects = fromZones.map((zone) => `zone_${floor}_${zone}`);
            objectsUpdate.push({
                ref: move.ref,
                type: "move",
                svg: 2,
                color: collectionColor,
                borderColor: '#000000',
                fromObjects,
                toObjects,
                arrowEndPoint,
                arrowStartingPoint,
                phase: 1,
            })
        })
    return objectsUpdate;
}


export default createDay;
