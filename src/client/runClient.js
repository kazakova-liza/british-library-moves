let dataForTable = [];
let dates = [];
let JSONtable;
let svgObject;
let svgDoc1;
let svgDoc2;
let svgElement1;
let svgElement2;
let command;
const buttons = ['start', 'period++', 'phase++', 'jump', 'dump'];

const disableButtons = (buttonName, boolean) => {
    if (buttonName === 'all') {
        for (const button of buttons) {
            document.getElementById(button).disabled = boolean;
        }
    }
    else {
        document.getElementById(buttonName).disabled = boolean;
    }
}

const onStartClick = () => {
    const variables = svgDoc1.getElementById('variables');
    const tspans = [...variables.getElementsByTagName('tspan')];
    for (const tspan of tspans) {
        tspan.textContent = '-';
    }

    if (svgDoc1.getElementsByClassName('rectangle').length !== 0) {
        const rectangles = [...svgDoc.getElementsByClassName('rectangle')];
        rectangles.map((rectangle) => rectangle.remove())
    }

    dataForTable = [];

    if (document.getElementById('Variables table') === null) {
        command = {
            topic: 'start',
        };
    }
    else {
        const mySqlTable = document.getElementById('Variables table').value;
        command = {
            topic: 'start',
            payload: {
                mySqlTable,
            }
        };
    }
    ws.send(JSON.stringify(command));
    disableButtons('start', true);

};

const onJumpClick = () => {
    disableButtons('all', true);
    const numberOfPeriods = document.getElementById('numberOfPeriods').value;
    command = {
        topic: 'jump',
        payload: numberOfPeriods,
    };
    ws.send(JSON.stringify(command));
};

const onDumpClick = () => {
    command = {
        topic: 'dump',
        payload: document.getElementById('mySQLTable').value
    }
    ws.send(JSON.stringify(command));
};

const json2Table = (json) => {
    //https://dev.to/boxofcereal/how-to-generate-a-table-from-json-data-with-es6-methods-2eel
    let cols = Object.keys(json[0]);
    let headerRow = cols
        .map(col => `<th>${col}</th>`)
        .join("");

    let rows = json
        .map(row => {
            let tds = cols.map(col => `<td>${row[col]}</td>`).join("  ");
            return `<tr>${tds}</tr>`;
        })
        .join("  ");

    const table = `
    <table>
      <thead>
        <tr>${headerRow}</tr>
      <thead>
      <tbody>
        ${rows}
      <tbody>
    <table>`;

    return table;
}

const onStopClick = () => {
    command = {
        topic: 'stop',
    };
    ws.send(JSON.stringify(command));
};

const onPhaseClick = () => {
    disableButtons('all', true);
    command = {
        topic: 'phase++',
    };
    console.log(command);
    ws.send(JSON.stringify(command));
};

const onPeriodClick = () => {
    disableButtons('all', true);
    command = {
        topic: 'period++',
    };
    ws.send(JSON.stringify(command));
};


document.getElementById('svg1').addEventListener('load', function () {
    svgElement1 = document.getElementById('svg1');
    svgDoc1 = svgElement1.contentDocument;
    var panZoom = svgPanZoom(svgElement1, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        minZoom: 0.1,
        mouseWheelZoomEnabled: false,
        // fit: 1,
        center: false
    });
    panZoom.zoom(1);
    panZoom.fit();
    panZoom.resize();
})

document.getElementById('svg2').addEventListener('load', function () {
    svgElement2 = document.getElementById('svg2');
    svgDoc2 = svgElement2.contentDocument;
    var panZoom = svgPanZoom(svgElement2, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        minZoom: 0.1,
        mouseWheelZoomEnabled: false,
        // fit: 1,
        center: false
    });
    panZoom.zoom(1);
    panZoom.fit();
    panZoom.resize();
})


if (document.getElementById('table') !== undefined) {
    JSONtable = document.getElementById('table');
}

const ws = new WebSocket('ws://localhost:50005/');
ws.onopen = function () {
    console.log('WebSocket Client Connected');
    command = {
        topic: 'inputs',
    };
    ws.send(JSON.stringify(command));
};


ws.onmessage = function (e) {
    message = JSON.parse(e.data);
    console.log(message);
    if (message.topic === 'inputs') {
        let html = '';
        for (const input of message.payload) {
            html += `<label for="${input.name}"> ${input.name}: </label>
                <textarea id="${input.name}" name="${input.name}" rows="1" cols="20"> </textarea>
                <br>`;
        }
        inputs = document.getElementById('inputs');
        inputs.innerHTML = html;
    }

    if (message.topic == 'disableButtons') {
        disableButtons(message.payload, true);
    }

    if (message.topic == 'enableButtons') {
        disableButtons(message.payload, false);
    }

    if (message.topic == 'variablesUpdate' && message.payload[0].svg === 2) {
        console.log(message);
        for (element of message.payload) {
            if (element.value !== undefined) {
                const el = svgDoc2.getElementById(element.id);
                console.log(element.id)
                if (el.getElementsByTagName('tspan') !== undefined) {
                    const tspans = el.getElementsByTagName('tspan');
                    tspans[0].textContent = element.value;
                }
                else {
                    svgDoc2.getElementById(element.id).textContent = element.value;
                }
            }
            else {
                const el = svgDoc2.getElementById(element.id);
                el.style.fill = element.color;
            }

        }
    }

    if (message.topic == 'variablesUpdate' && message.payload[0].svg === 1) {
        console.log(message);
        for (element of message.payload) {
            const el = svgDoc1.getElementById(element.id);
            console.log(element.id)
            if (el.getElementsByTagName('tspan') !== undefined) {
                const tspans = el.getElementsByTagName('tspan');
                tspans[0].textContent = element.value;
            }
            else {
                svgDoc1.getElementById(element.id).textContent = element.value;
            }
            const startingPoint = svgDoc1.getElementById('line_1');
            const pixelsPerDay = 4.9;
            const pixelsPerMove = 65;
            const x0 = parseInt(startingPoint.attributes["x1"].value);
            const y0 = parseInt(startingPoint.attributes["y1"].value);
            let color;
            const x1 = x0;
            const y1 = y0;
            const xn = x1 - 5 + pixelsPerDay * element.startDay;
            const yn = y1 + pixelsPerMove * (element.number - 1);
            const width = pixelsPerDay * element.duration;
            const svgArea = svgDoc1.getElementById('Page-1');
            if (element.type === 'Move') {
                color = '#73B7D5';
            }
            else {
                color = '#E1D382';
            }
            if (element.number === 1) {
                svgArea.innerHTML = svgArea.innerHTML + `<rect xmlns="http://www.w3.org/2000/svg" id = "Rectangle100" class="rectangle" fill = "${color}" x = "${x1.toString()}" y = "${y1.toString()}" width = "${width.toString()}" height = "51"></rect>`;
            }
            else {
                svgArea.innerHTML = svgArea.innerHTML + `<rect xmlns="http://www.w3.org/2000/svg" id = "Rectangle100" class="rectangle" fill = "${color}" x = "${xn.toString()}" y = "${yn.toString()}" width = "${width.toString()}" height = "51"></rect>`;
            }


            if (element.length !== undefined) {
                dataForTable.push({
                    name: element.value,
                    length: element.length,
                    speed: element.speed,
                    condition: element.condition,
                    duration: element.duration,
                    startDay: element.startDay,
                    endDay: element.endDay
                })
            }
            JSONtable.innerHTML = json2Table(dataForTable);
        }
    }

    if (message.topic == 'transitionUpdate') {
        console.log(message);
        for (element of message.payload) {
            const el = svgDoc.getElementById(element.id);
            el.style.visibility = 'visible';
        }
    }

    if (message.topic == 'setToNought') {
        console.log(message);
        const elements = svgDoc.getElementsByClassName('variable');
        for (const element of elements) {
            element.textContent = '-';
        }
        console.log(`data for table: ${dataForTable}`);
        table.innerHTML = json2Table(dataForTable);
    }

    if (message.topic == 'htmlUpdate') {
        console.log(message);
        for (element of message.payload) {
            document.getElementById(element.id).textContent = element.value;
        }
    }

    if (message.topic === 'svgUpdate') {
        console.log(message);
        const elementToUpdate = svgDoc1.getElementById(message.payload.id);
        console.log(elementToUpdate);
        elementToUpdate.style.fill = message.payload.color;
    }
};

