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
            const toBuilding = move.toBuilding;
            const fromZones = move.fromZone.split(",");
            const toZones = move.toZone.split(",");
            let toObjects = [];
            let arrowStartingPoint = '';
            let arrowEndPoint = '';
            let fillOpacity;
            let borderColor;

            if (move.fromZone.length === 1) {
                arrowStartingPoint = `zone_${floor}_${move.fromZone[0]}`;
            }
            if (fromZones.length < 9 && fromZones.length > 1) {
                arrowStartingPoint = `zone_${floor}_${fromZones[1]}`;
            }
            if (fromZones.length === 9) {
                arrowStartingPoint = `zone_${floor}_${1}`;
            }
            if (move.type !== "Construction") {
                if (toBuilding === 'B31') {
                    arrowEndPoint = 'zone_b31';
                }
                else if (toBuilding === 'Off site') {
                    arrowEndPoint = 'offSite';
                }
                else if (toZones.length === 1 && toBuilding !== 'B31' && toBuilding !== 'Off site') {
                    arrowEndPoint = `zone_${toFloor}_${toZones}`;
                }
                if (toZones.length > 1)
                    arrowEndPoint = `zone_${toFloor}_${toZones[1]}`;
            }

            let collectionColor = colors.find((col) => col.collection === move.collection);
            if (collectionColor !== undefined) {
                collectionColor = collectionColor.collectionColor;
            }

            const fromObjects = fromZones.map((zone) => `zone_${floor}_${zone}`);
            toObjects = toZones.map((zone) => {
                if (move.toBuilding === 'B31') {
                    return 'zone_b31';
                }
                else if (move.toBuilding === 'Off site') {
                    return 'offSite'
                }
                else {
                    return `zone_${toFloor}_${zone}`;
                }

            })

            fromObjects.map((fromObject) => {
                let color;
                let type;
                if (move.type === 'Move') {
                    type = 'move';
                    color = collectionColor;
                    fillOpacity = '1';
                    borderColor = '#000000';
                }
                if (move.type === 'Construction') {
                    color = 'url(#pattern-2)';
                    fillOpacity = '0.6';
                    type = 'construction';
                    arrowStartingPoint = undefined;
                    arrowEndPoint = undefined;
                    // }
                }
                if (currentDay === move.endDay) {
                    color = '#ffffff';
                    borderColor = '#000000';
                    arrowStartingPoint = undefined;
                    arrowEndPoint = undefined;
                    fillOpacity = '1';

                    toObjects.map((toObject) => {
                        cache.timeline[currentDay][toObject] = {
                            ref: move.ref,
                            type,
                            svg: 2,
                            color: '',
                            borderColor: "#979797",
                            phase: phase + 1,
                            fillOpacity: '1',
                            arrowStartingPoint: undefined,
                            arrowEndPoint: undefined,
                            floor: move.floor,

                        }
                    })
                }
                cache.timeline[currentDay][fromObject] = {
                    ref: move.ref,
                    type,
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
