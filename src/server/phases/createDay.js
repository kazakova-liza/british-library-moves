import getter from '../airtable/getter.js';
import cache from '../cache.js';

const createDay = async (phase) => {
    cache.transitionDays = cache.transitionDays.filter((day, i) => cache.transitionDays.indexOf(day) === i);
    cache.transitionDays = cache.transitionDays.sort((a, b) => a - b);
    cache.timeline = {};
    //     cache.transitionDays.map((day) => {
    //         cache.processedMoves.map((move) => {
    //             if (move.startDay <= day && move.endDay > day) {
    //                 cache.timeline[move.ref].status = 'active';
    //             }
    //             if (move.endDay <= day) {
    //                 cache.timeline[move.ref].status = 'finished';
    //             }
    //         }
    // })
    const currentDay = cache.transitionDays[phase];
    let objectsUpdate = [];
    if (phase !== 0) {
        const previousDay = cache.transitionDays[phase - 1];
        cache.timeline[currentDay] = cache.timeline[previousDay];
    }

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

            const data = {
                ref: move.ref,
                type: "move",
                svg: 2,
                color: currentDay === move.endDay ? '#ffffff' : collectionColor,
                borderColor: '#000000',
                fromObjects,
                toObjects,
                status: currentDay === move.endDay ? 'finished' : 'active',
                arrowEndPoint: currentDay === move.endDay ? undefined : arrowEndPoint,
                arrowStartingPoint: currentDay === move.endDay ? undefined : arrowStartingPoint,
                phase: phase + 1,
            };
            objectsUpdate.push(data);

        })
    return objectsUpdate;
}


export default createDay;
