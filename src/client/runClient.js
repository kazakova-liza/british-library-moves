let dataForTable = [];
let dates = [];
let JSONtable;

const makeSticky = () => {
    const svgElement = document.getElementById('svg1');
    const svgDoc = svgElement.contentDocument;
    const fixedElement = svgDoc.getElementById('sticky-svg');
    const container = document.getElementById('container');
    fixedElement.setAttribute('x', container.scrollLeft);
    container.addEventListener('scroll', function () {
        fixedElement.setAttribute('x', container.scrollLeft);
    });
}

const disableButtons = (buttonName) => {
    const buttons = ['start', 'period++', 'phase++', 'jump', 'dump'];
    if (buttonName === 'all') {
        for (const button of buttons) {
            document.getElementById(button).disabled = true;
        }
    }
    else {
        document.getElementById(buttonName).disabled = true;
    }
}

const enableButtons = (buttonName) => {
    const buttons = ['start', 'period++', 'phase++', 'jump', 'dump'];
    if (buttonName === 'all') {
        for (const button of buttons) {
            document.getElementById(button).disabled = false;
        }
    }
    else {
        document.getElementById(buttonName).disabled = false;
    }
}

const onStartClick = () => {
    const svgObject = document.getElementById('svg1');
    const svgDoc = svgObject.contentDocument;


    if (svgDoc.getElementsByClassName('rectangle').length !== 0) {
        const rectangles = [...svgDoc.getElementsByClassName('rectangle')];
        rectangles.map((rectangle) => rectangle.remove())
    }

    let command;
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
    disableButtons('start');
};

const onJumpClick = () => {
    disableButtons('all');
    const numberOfPeriods = document.getElementById('numberOfPeriods').value;
    const command = {
        topic: 'jump',
        payload: numberOfPeriods,
    };
    ws.send(JSON.stringify(command));
};

const onDumpClick = () => {
    const command = {
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
    const command = {
        topic: 'stop',
    };
    ws.send(JSON.stringify(command));
};

const onPhaseClick = () => {
    disableButtons('all');
    const command = {
        topic: 'phase++',
    };
    console.log(command);
    ws.send(JSON.stringify(command));
};

const onPeriodClick = () => {
    disableButtons('all');
    const command = {
        topic: 'period++',
    };
    ws.send(JSON.stringify(command));
};

let svgDoc;
let svgElement;



document.getElementById('svg1').addEventListener('load', function () {
    svgElement = document.getElementById('svg1');
    svgDoc = svgElement.contentDocument;
    var panZoom = svgPanZoom(svgElement, {
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

    // makeSticky();
})


if (document.getElementById('table') !== undefined) {
    JSONtable = document.getElementById('table');
}

const ws = new WebSocket('ws://localhost:50005/');
ws.onopen = function () {
    console.log('WebSocket Client Connected');
    const command = {
        topic: 'inputs',
    };
    ws.send(JSON.stringify(command));
};


ws.onmessage = function (e) {
    message = JSON.parse(e.data);
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
        disableButtons(message.payload);
    }

    if (message.topic == 'enableButtons') {
        enableButtons(message.payload);
    }

    if (message.topic == 'variablesUpdate') {
        console.log(message);
        for (element of message.payload) {
            const svgObject = document.getElementById('svg1');
            const svgDoc = svgObject.contentDocument;
            const el = svgDoc.getElementById(element.id);
            if (el.getElementsByTagName('tspan') !== undefined) {
                const tspans = el.getElementsByTagName('tspan');
                tspans[0].textContent = element.value;
            }
            else {
                svgDoc.getElementById(element.id).textContent = element.value;
            }
            const startingPoint = svgDoc.getElementById('line_1');
            const pixelsPerDay = Math.round(80 / 20);
            const pixelsPerMove = 269 - 207;
            const x0 = parseInt(startingPoint.attributes["x1"].value);
            const y0 = parseInt(startingPoint.attributes["y1"].value) + 6;
            let x1;
            let y1;
            let color;
            if (element.number === 1) {
                x1 = x0.toString();
                y1 = y0.toString();
            }
            else {
                x1 = (x0 + pixelsPerDay * element.startDay).toString();
                y1 = (y0 + pixelsPerMove * (element.number - 1) + 6).toString();
            }
            const width = (pixelsPerDay * element.duration).toString();
            console.log(x1, y1);
            const svgArea = svgDoc.getElementById('Page-1');
            if (element.type === 'Move') {
                color = '#73B7D5';
            }
            else {
                color = '#E1D382';
            }
            svgArea.innerHTML = svgArea.innerHTML + `<rect xmlns="http://www.w3.org/2000/svg" id = "Rectangle100" class="rectangle" fill = "${color}" x = "${x1}" y = "${y1}" width = "${width}" height = "51"></rect>`;
        }
        makeSticky();
    }

    if (message.topic == 'transitionUpdate') {
        console.log(message);
        for (element of message.payload) {
            const svgObject = document.getElementById('svg1');
            const svgDoc = svgObject.contentDocument;
            const el = svgDoc.getElementById(element.id);
            el.style.visibility = 'visible';
        }
    }

    if (message.topic == 'setToNought') {
        console.log(message);
        const svgObject = document.getElementById('svg1');
        const svgDoc = svgObject.contentDocument;
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
        const svgObject = document.getElementById('svg1');
        const svgDoc = svgObject.contentDocument;
        const elementToUpdate = svgDoc.getElementById(message.payload.id);
        console.log(elementToUpdate);
        elementToUpdate.style.fill = message.payload.color;
    }
};

