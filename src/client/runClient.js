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

let dayNumber;

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

    const newDay = `<g id="day__DAY_NUMBER__" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform = "translate(__X_INCREMENT__, 0)">
    <path d="M1087.38162,521.5 L1385.43806,521.5 L1500.38716,1082.5 L1144.45384,1082.5 L1129.2226,925.5 L926.134253,925.5 L909.550034,1082.5 L530.605527,1082.5 L638.689653,521.5 L965.023476,521.5 L955.448213,618.5 L1097.55518,618.5 L1087.38162,521.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_7_1" stroke="#979797" fill="#D8D8D8" points="956 618 1097 618 1128.76876 926 926.584219 926"></polygon>
    <polygon id="zone_7_2" stroke="#979797" points="771 778.5 726.574219 1083 910 1083 939.5 778.5"></polygon>
    <polygon id="zone_7_3" stroke="#979797" points="589.503906 777.961318 530 1083 726.574219 1083 771 777.961318"></polygon>
    <polygon id="zone_7_6" stroke="#979797" points="1238.24219 521 1275 777.5 1113.53711 777.961318 1086.82644 521"></polygon>
    <polygon id="zone_7_7" stroke="#979797" points="1438.53516 777.961318 1275 777.961318 1238.24219 521 1385.84599 521"></polygon>
    <polygon id="zone_7_9" points="1113.53711 777.961318 1275 777.961318 1320.10547 1083 1144 1083"></polygon>
    <polygon id="zone_7_8" stroke="#979797" points="1275 777.961318 1438.53516 777.730659 1501 1083 1320.10547 1083"></polygon>
    <polygon id="zone_7_4" stroke="#979797" points="638.772883 521 590 777.961318 771.496094 777.961318 809.277344 521"></polygon>
    <polygon id="zone_7_5" stroke="#979797" points="808.78125 521 965.575263 521 939.5 778.25 771 778.5"></polygon>
    <path d="M965.023476,1201.5 L955.448213,1298.5 L1097.55518,1298.5 L1087.38162,1201.5 L1385.43806,1201.5 L1500.38716,1762.5 L1144.45384,1762.5 L1129.2226,1605.5 L926.134253,1605.5 L909.550034,1762.5 L530.605527,1762.5 L638.689653,1201.5 L965.023476,1201.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_6_4" stroke="#979797" points="638.27679 1201 589.503906 1457.96132 771 1457.96132 808.78125 1201"></polygon>
    <polygon id="zone_6_2" stroke="#979797" points="771 1458.5 726.574219 1763 910 1763 939.5 1458.5"></polygon>
    <polygon id="zone_6_3" stroke="#979797" points="589.503906 1457.96132 530 1763 726.574219 1763 771 1457.96132"></polygon>
    <polygon id="zone_6_6" stroke="#979797" points="1238.24219 1201 1275 1457.5 1113.53711 1457.96132 1086.82644 1201"></polygon>
    <polygon id="zone_6_7" stroke="#979797" points="1438.53516 1457.96132 1275 1457.96132 1238.24219 1201 1385.84599 1201"></polygon>
    <polygon id="zone_6_9" stroke="#979797" points="1113.53711 1457.96132 1275 1457.96132 1320.10547 1763 1144 1763"></polygon>
    <polygon id="zone_6_8" points="1275 1457.96132 1438.53516 1457.73066 1501 1763 1320.10547 1763"></polygon>
    <polygon id="zone_6_5" points="808.78125 1201 965.575263 1201 939.5 1458.25 771 1458.5"></polygon>
    <polygon id="zone_6_1" stroke="#979797" points="956 1298 1097 1298 1128.76876 1606 926.584219 1606"></polygon>
    <path d="M1385.43806,1881.5 L1500.38716,2442.5 L1144.45384,2442.5 L1129.2226,2285.5 L926.134253,2285.5 L909.550034,2442.5 L530.605527,2442.5 L638.689653,1881.5 L965.023476,1881.5 L955.448213,1978.5 L1097.55518,1978.5 L1087.38162,1881.5 L1385.43806,1881.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_5_4" stroke="#979797" points="638.27679 1881 589.503906 2137.96132 771 2137.96132 808.78125 1881"></polygon>
    <polygon id="zone_5_2" stroke="#979797" points="771 2138.5 726.574219 2443 910 2443 939.5 2138.5"></polygon>
    <polygon id="zone_5_3" stroke="#979797" points="589.503906 2137.96132 530 2443 726.574219 2443 771 2137.96132"></polygon>
    <polygon id="zone_5_6" stroke="#979797" points="1238.24219 1881 1275 2137.5 1113.53711 2137.96132 1086.82644 1881"></polygon>
    <polygon id="zone_5_7" stroke="#979797" points="1438.53516 2137.96132 1275 2137.96132 1238.24219 1881 1385.84599 1881"></polygon>
    <polygon id="zone_5_9" stroke="#979797" points="1113.53711 2137.96132 1275 2137.96132 1320.10547 2443 1144 2443"></polygon>
    <polygon id="zone_5_8" stroke="#979797" points="1275 2137.96132 1438.53516 2137.73066 1501 2443 1320.10547 2443"></polygon>
    <polygon id="zone_5_5" stroke="#979797" points="808.78125 1881 965.575263 1881 939.5 2138.25 771 2138.5"></polygon>
    <polygon id="zone_5_1" stroke="#979797" points="956 1978 1097 1978 1128.76876 2286 926.584219 2286"></polygon>
    <path d="M965.023476,2561.5 L955.448213,2658.5 L1097.55518,2658.5 L1087.38162,2561.5 L1385.43806,2561.5 L1500.38716,3122.5 L1144.45384,3122.5 L1129.2226,2965.5 L926.134253,2965.5 L909.550034,3122.5 L530.605527,3122.5 L638.689653,2561.5 L965.023476,2561.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_4_4" stroke="#979797" points="638.27679 2561 589.503906 2817.96132 771 2817.96132 808.78125 2561"></polygon>
    <polygon id="zone_4_2" stroke="#979797" points="771 2818.5 726.574219 3123 910 3123 939.5 2818.5"></polygon>
    <polygon id="zone_4_3" stroke="#979797" points="589.503906 2817.96132 530 3123 726.574219 3123 771 2817.96132"></polygon>
    <polygon id="zone_4_6" stroke="#979797" points="1238.24219 2561 1275 2817.5 1113.53711 2817.96132 1086.82644 2561"></polygon>
    <polygon id="zone_4_7" stroke="#979797" points="1438.53516 2817.96132 1275 2817.96132 1238.24219 2561 1385.84599 2561"></polygon>
    <polygon id="zone_4_9" stroke="#979797" points="1113.53711 2817.96132 1275 2817.96132 1320.10547 3123 1144 3123"></polygon>
    <polygon id="zone_4_8" stroke="#979797" points="1275 2817.96132 1438.53516 2817.73066 1501 3123 1320.10547 3123"></polygon>
    <polygon id="zone_4_5" stroke="#979797" points="808.78125 2561 965.575263 2561 939.5 2818.25 771 2818.5"></polygon>
    <polygon id="zone_4_1" stroke="#979797" points="956 2658 1097 2658 1128.76876 2966 926.584219 2966"></polygon>
    <path d="M1087.38162,3241.5 L1385.43806,3241.5 L1500.38716,3802.5 L1144.45384,3802.5 L1129.2226,3645.5 L926.134253,3645.5 L909.550034,3802.5 L530.605527,3802.5 L638.689653,3241.5 L965.023476,3241.5 L955.448213,3338.5 L1097.55518,3338.5 L1087.38162,3241.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_3_4" stroke="#979797" points="638.27679 3241 589.503906 3497.96132 771 3497.96132 808.78125 3241"></polygon>
    <polygon id="zone_3_2" stroke="#979797" points="771 3498.5 726.574219 3803 910 3803 939.5 3498.5"></polygon>
    <polygon id="zone_3_3" stroke="#979797" points="589.503906 3497.96132 530 3803 726.574219 3803 771 3497.96132"></polygon>
    <polygon id="zone_3_6" stroke="#979797" points="1238.24219 3241 1275 3497.5 1113.53711 3497.96132 1086.82644 3241"></polygon>
    <polygon id="zone_3_7" stroke="#979797" points="1438.53516 3497.96132 1275 3497.96132 1238.24219 3241 1385.84599 3241"></polygon>
    <polygon id="zone_3_9" stroke="#979797" points="1113.53711 3497.96132 1275 3497.96132 1320.10547 3803 1144 3803"></polygon>
    <polygon id="zone_3_8" stroke="#979797" points="1275 3497.96132 1438.53516 3497.73066 1501 3803 1320.10547 3803"></polygon>
    <polygon id="zone_3_5" stroke="#979797" points="808.78125 3241 965.575263 3241 939.5 3498.25 771 3498.5"></polygon>
    <polygon id="zone_3_1" stroke="#979797" points="956 3338 1097 3338 1128.76876 3646 926.584219 3646"></polygon>
    <path d="M965.023476,3921.5 L955.448213,4018.5 L1097.55518,4018.5 L1087.38162,3921.5 L1385.43806,3921.5 L1500.38716,4482.5 L1144.45384,4482.5 L1129.2226,4325.5 L926.134253,4325.5 L909.550034,4482.5 L530.605527,4482.5 L638.689653,3921.5 L965.023476,3921.5 Z" id="Combined-Shape-Copy-6" stroke="#979797" fill="url(#linearGradient-1)"></path>
    <polygon id="zone_2_4" stroke="#979797" points="638.27679 3921 589.503906 4177.96132 771 4177.96132 808.78125 3921"></polygon>
    <polygon id="zone_2_2" stroke="#979797" points="771 4178.5 726.574219 4483 910 4483 939.5 4178.5"></polygon>
    <polygon id="zone_2_3" stroke="#979797" points="589.503906 4177.96132 530 4483 726.574219 4483 771 4177.96132"></polygon>
    <polygon id="zone_6" stroke="#979797" points="1238.24219 3921 1275 4177.5 1113.53711 4177.96132 1086.82644 3921"></polygon>
    <polygon id="zone_2_7" stroke="#979797" points="1438.53516 4177.96132 1275 4177.96132 1238.24219 3921 1385.84599 3921"></polygon>
    <polygon id="zone_2_9" stroke="#979797" points="1113.53711 4177.96132 1275 4177.96132 1320.10547 4483 1144 4483"></polygon>
    <polygon id="zone_2_8" stroke="#979797" points="1275 4177.96132 1438.53516 4177.73066 1501 4483 1320.10547 4483"></polygon>
    <polygon id="zone_2_5" stroke="#979797" points="808.78125 3921 965.575263 3921 939.5 4178.25 771 4178.5"></polygon>
    <polygon id="zone_2_1" stroke="#979797" points="956 4018 1097 4018 1128.76876 4326 926.584219 4326"></polygon>
    <text id="Day" font-family="Helvetica-Light, Helvetica" font-size="100" font-weight="300" fill="#000000">
        <tspan x="30" y="119">Day</tspan>
    </text>
    <text id="Building-6" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
        <tspan x="30" y="291">Building 6</tspan>
    </text>
    <text id="123" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
        <tspan x="2197" y="1690">Building 31</tspan>
    </text>
    <rect id="zone_b31" stroke="#979797" x="2135.5" y="1604.5" width="487" height="120"></rect>
    <text id="zone_b31-copy" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
        <tspan x="2266" y="1899">Off site</tspan>
    </text>
    <rect id="offSite" stroke="#979797" x="2135.5" y="1813.5" width="487" height="120"></rect>
    <text id="dayNumber" font-family="Helvetica-Light, Helvetica" font-size="100" font-weight="300" fill="#000000">
        <tspan x="248" y="119">—</tspan>
    </text>
</g>`;


    if (message.topic == 'disableButtons') {
        disableButtons(message.payload, true);
    }

    if (message.topic == 'enableButtons') {
        disableButtons(message.payload, false);
    }

    if (message.topic == 'variablesUpdate' && message.payload[0].svg === 2) {
        console.log(message);
        const svgArea2 = svgDoc2.getElementById(`Days`);
        dayNumber = message.payload[1].phase;
        if (dayNumber >= 2) {
            const newElement = svgDoc2.createElement('g');
            const newDayWithDayNumber = newDay.replace("__DAY_NUMBER__", dayNumber);
            const newDayWithXIncrement = newDayWithDayNumber.replace("__X_INCREMENT__", dayNumber * 3000)
            newElement.innerHTML = newDayWithXIncrement;
            svgArea2.appendChild(newElement);
        }
        const currentDay = svgDoc2.getElementById(`day${dayNumber}`);
        for (item of message.payload) {
            if (item.type === 'variable') {
                const svgObject = currentDay.querySelector(`#${item.id}`);
                console.log(item.id)
                if (svgObject.getElementsByTagName('tspan') !== undefined) {
                    const tspans = svgObject.getElementsByTagName('tspan');
                    tspans[0].textContent = item.value;
                }
                else {
                    svgDoc2.getElementById(item.id).textContent = item.value;
                }
            }
            else {
                for (const zone of item.fromObjects) {
                    const currentDay = svgDoc2.getElementById(`day${dayNumber}`);
                    const svgObject = currentDay.querySelector(`#${zone}`);
                    if (svgObject.style == undefined) {
                        svgObject.style = {};
                    }
                    svgObject.style.fill = item.color;
                    svgObject.style.stroke = item.borderColor;
                }
                if (item.status === 'finished') {
                    for (const zone of item.toObjects) {
                        if (zone !== 'zone_b31' && zone !== 'offSite') {
                            const currentDay = svgDoc2.getElementById(`day${dayNumber}`);
                            const svgObject = currentDay.querySelector(`#${zone}`);
                            if (svgObject.style == undefined) {
                                svgObject.style = {};
                            }
                            svgObject.style.fill = item.color;
                            svgObject.style.stroke = item.borderColor;
                        }


                    }
                }
                let x1;
                let y1;
                let x2;
                let y2;
                const startingPoint = svgDoc2.getElementById(item.arrowStartingPoint);
                console.log(startingPoint);
                if (startingPoint.points !== undefined) {
                    const startingPointCoordinates = [...startingPoint.points];
                    x1 = startingPointCoordinates[0].x;
                    y1 = startingPointCoordinates[0].y;
                }
                else {
                    x1 = startingPoint.x.baseVal.value;
                    y1 = startingPoint.y.baseVal.value;
                }

                const endPoint = svgDoc2.getElementById(item.arrowEndPoint);
                if (endPoint.points !== undefined) {
                    const endPointCoordinates = [...endPoint.points];
                    x2 = endPointCoordinates[0].x;
                    y2 = endPointCoordinates[0].y;
                }
                else {
                    x2 = endPoint.x.baseVal.value;
                    y2 = endPoint.y.baseVal.value;
                }


                svgArea2.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-dasharray="5,17"></line>
                                                            <circle stroke="#000000" stroke-width="3" fill="#FFFFFF" cx="${x1}" cy="${y1}" r="10.5"></circle>
                <path d="M1303,1522 C1321.2254,1522 1336,1536.78434 1336,1555.02174 C1336,1567.18001 1325,1587.17276 1303,1615 C1281,1587.17276 1270,1567.18001 1270,1555.02174 C1270,1536.78434 1284.7746,1522 1303,1522 Z M1303.5,1541 C1295.49187,1541 1289,1547.49187 1289,1555.5 C1289,1563.50813 1295.49187,1570 1303.5,1570 C1311.50813,1570 1318,1563.50813 1318,1555.5 C1318,1547.49187 1311.50813,1541 1303.5,1541 Z" fill="#D64E4E" transform = "translate(${x2 - 1300},${y2 - 1600})"></path>`
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