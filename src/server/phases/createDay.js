import getter from '../airtable/getter.js';
import cache from '../cache.js';

const createDay = async (phase) => {
    if (phase === 0) {
        cache.timeline = {};
    }
    cache.transitionDays = cache.transitionDays.filter((day, i) => cache.transitionDays.indexOf(day) === i);
    cache.transitionDays = cache.transitionDays.sort((a, b) => a - b);

    const currentDay = cache.transitionDays[phase];
    let objectsUpdate = [];

    if (phase !== 0) {
        const previousDay = cache.transitionDays[phase - 1];
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
            const fromZones = move.fromZone.split(",");
            const toZones = move.toZone.split(",");
            let arrowEndPoint;
            let collectionColor;
            let arrowStartingPoint = `zone_${floor}_${fromZones[0]}`;

            if (move.type === 'Move') {
                collectionColor = colors.find((col) => col.collection === move.collection).collectionColor;
            }

            const fromObjects = fromZones.map((zone) => `zone_${floor}_${zone}`);
            const toObjects = toZones.map((zone) => {
                if (move.toBuilding === 'B31') {
                    arrowEndPoint = 'zone_b31';
                    return 'zone_b31';
                }
                if (move.toBuilding === 'B23') {
                    arrowEndPoint = 'zone_b23';
                    return 'zone_b23';
                }
                if (move.toBuilding === 'B24') {
                    arrowEndPoint = 'zone_b24';
                    return 'zone_b24';
                }
                else if (move.toBuilding === 'Off site') {
                    arrowEndPoint = 'offSite';
                    return 'offSite';
                }
                else {
                    arrowEndPoint = `zone_${toFloor}_${toZones[0]}`;
                    return `zone_${toFloor}_${zone}`;
                }
            })

            fromObjects.map((object) => {
                let fillOpacity = '1';
                let borderColor = '#000000';
                let color;

                if (move.type === 'Move') {
                    color = collectionColor;
                }
                if (move.type === 'Construction') {
                    color = 'url(#pattern-2)';
                    fillOpacity = '0.6';
                    borderColor = undefined;
                    arrowStartingPoint = undefined;
                    arrowEndPoint = undefined;
                }
                if (move.type === 'Renovation') {
                    color = 'url(#pattern-3)';
                    fillOpacity = '0.6';
                    borderColor = undefined;
                    arrowStartingPoint = undefined;
                    arrowEndPoint = undefined;
                }
                if (currentDay === move.endDay) {
                    if (move.type === 'Move') {
                        arrowStartingPoint = undefined;
                        arrowEndPoint = undefined;
                        color = '#ffffff';
                        toObjects.map((object) => {
                            cache.timeline[currentDay][object] = {
                                ref: move.ref,
                                type: move.type,
                                svg: 2,
                                color: '',
                                borderColor: "#979797",
                                phase: phase + 1,
                                fillOpacity,
                                arrowStartingPoint,
                                arrowEndPoint,
                                floor: toFloor,

                            }
                        })
                    }
                    else if (move.type === 'Renovation') {
                        color = collectionColor;
                    }
                    else {
                        color = '#ffffff';
                    }
                }
                cache.timeline[currentDay][object] = {
                    ref: move.ref,
                    type: move.type,
                    svg: 2,
                    color,
                    borderColor,
                    phase: phase + 1,
                    fillOpacity,
                    arrowStartingPoint,
                    arrowEndPoint,
                    floor: move.floor,
                }
            })
        })
    objectsUpdate.push(cache.timeline[currentDay]);
    return objectsUpdate;
}


export default createDay;
