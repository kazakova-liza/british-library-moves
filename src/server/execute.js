import cache from './cache.js';
import objects from './objects.js'


const execute = async (numberOfPeriodsToExecute, phase = cache.currentPhase) => {
    const t1 = Date.now();
    const periods = [];
    for (let i = 0; i < cache.moves.length; i++) {
        periods[i] = i + 1;
    }
    const dtes = periods;
    console.log('dtes = ', dtes.length);

    for (let i = cache.currentPeriod; i < cache.currentPeriod + parseInt(numberOfPeriodsToExecute); i++) {
        cache.thisDte = dtes[i].dte;
        let variablesUpdate;
        let htmlUpdate;

        cache.connection.sendUTF(JSON.stringify({
            topic: 'htmlUpdate',
            payload:
                [{
                    id: 'period',
                    value: dtes[i]
                }]
        }));
        if (phase === 'all') {
            for (const el of objects.phases) {
                cache.connection.sendUTF(JSON.stringify({
                    topic: 'svgUpdate',
                    payload: {
                        id: el.svgTransitionElementId,
                        color: "#ff8000"
                    }
                }));
                if (el.async !== undefined) {
                    variablesUpdate = await el.function();
                }
                else {
                    variablesUpdate = el.function();
                }
                htmlUpdate = [{ id: 'phase', value: el.textOnCompletion }];
                cache.connection.sendUTF(JSON.stringify({
                    topic: 'svgUpdate',
                    payload: {
                        id: el.svgTransitionElementId,
                        color: "#bfbfbf"
                    }
                }));
                cache.connection.sendUTF(JSON.stringify({
                    topic: 'htmlUpdate',
                    payload: htmlUpdate
                }));
            }
        }
        else {
            const currentPhase = objects.phases.find((el) => el.number === phase);
            cache.connection.sendUTF(JSON.stringify({
                topic: 'htmlUpdate',
                payload:
                    [{
                        id: 'phase',
                        value: currentPhase.textOnProcessing
                    }]
            }));
            // cache.connection.sendUTF(JSON.stringify({
            //     topic: 'svgUpdate',
            //     payload: {
            //         id: currentPhase.svgTransitionElementId,
            //         color: "#ff8000"
            //     }
            // }));
            if (currentPhase.async !== undefined) {
                variablesUpdate = await currentPhase.function(cache.currentPhase - 2);
            }
            else {
                variablesUpdate = currentPhase.function(cache.currentPhase - 2);
            }
            cache.connection.sendUTF(JSON.stringify({
                topic: 'htmlUpdate',
                payload:
                    [{
                        id: 'phase',
                        value: currentPhase.textOnCompletion
                    }]
            }));
            cache.connection.sendUTF(JSON.stringify({
                topic: 'svgUpdate',
                payload: {
                    id: currentPhase.svgTransitionElementId,
                    color: "#bfbfbf"
                }
            }));
            cache.connection.sendUTF(JSON.stringify({
                topic: cache.currentPhase === 1 ? 'variablesUpdate' : 'movesUpdate',
                payload: variablesUpdate
            }));
        }

        if (i !== cache.currentPeriod + parseInt(numberOfPeriodsToExecute) - 1) {
            cache.connection.sendUTF(JSON.stringify({ topic: 'setToNought' }));
        }
    }
    const t2 = Date.now();

    console.log(t2 - t1);
}

export default execute;
