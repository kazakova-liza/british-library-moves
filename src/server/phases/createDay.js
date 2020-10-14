import getter from '../airtable/getter.js';
import cache from '../cache.js';

const createDay = async (phase) => {
    cache.transitionDays = cache.transitionDays.filter((day, i) => cache.transitionDays.indexOf(day) === i);
    cache.transitionDays = cache.transitionDays.sort((a, b) => a - b);
    const currentDay = cache.transitionDays[phase];
    let objectsUpdate = [];
    console.log(`phase: ${phase}`);
    if (phase !== 0) {
        const previousDay = cache.transitionDays[phase - 1];
        console.log(`previous day: ${previousDay}`);
        console.log(cache.timeline);
        cache.timeline[currentDay] = cache.timeline[previousDay];
    }
    else {
        cache.timeline[currentDay] = {};
    }

    objectsUpdate.push({
        id: 'dayNumber',
        type: "variable",
        svg: 2,
        value: currentDay,
        phase: phase + 1,
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

            fromObjects.map((fromObject) => {
                let color;
                if (currentDay === move.endDay) {
                    color = '#ffffff';
                    toObjects.map((toObject) => {
                        cache.timeline[currentDay][toObject] = {
                            ref: move.ref,
                            type: "move",
                            svg: 2,
                            color: collectionColor,
                            phase: phase + 1,
                        }
                    })
                }
                else {
                    color = collectionColor
                }
                cache.timeline[currentDay][fromObject] = {
                    ref: move.ref,
                    type: "move",
                    svg: 2,
                    color,
                    borderColor: '#000000',
                    phase: phase + 1,
                    arrowStartingPoint,
                    arrowEndPoint
                }
                // cache.timeline[currentDay][arrowStartingPoint] = {
                //     ref: move.ref,
                //     type: "arrow",
                //     secondaryType: "start",
                //     svg: 2,
                // }
                // cache.timeline[currentDay][arrowEndPoint] = {
                //     ref: move.ref,
                //     type: "arrow",
                //     secondaryType: "end",
                //     svg: 2,
                // }
            })
        })
    objectsUpdate.push(cache.timeline[currentDay]);
    return objectsUpdate;
}


export default createDay;
