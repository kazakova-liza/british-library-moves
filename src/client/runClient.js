let dataForTable = [];
let dates = [];
let JSONtable;
let svgObject;
let ganttChartContent;
let movesMapContent;
let ganttChart;
let movesMap;
let command;
let dayNumber;

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
    const variables = ganttChartContent.getElementById('variables');
    const tspans = [...variables.getElementsByTagName('tspan')];
    for (const tspan of tspans) {
        tspan.textContent = '-';
    }

    if (ganttChartContent.getElementsByClassName('rectangle').length !== 0) {
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

document.getElementById('ganttChart').addEventListener('load', function () {
    ganttChart = document.getElementById('ganttChart');
    ganttChartContent = ganttChart.contentDocument;
    const panZoom = svgPanZoom(ganttChart, {
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

document.getElementById('movesMap').addEventListener('load', function () {
    movesMap = document.getElementById('movesMap');
    movesMapContent = movesMap.contentDocument;
    var panZoom = svgPanZoom(movesMap, {
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

    const newDay = `<g id="day__DAY_NUMBER__" transform="translate(__X_INCREMENT__, 0)">
        <path d="M1355.43806,499.5 L1470.38716,1060.5 L1114.45384,1060.5 L1099.2226,903.5 L896.134253,903.5 L879.550034,1060.5 L500.605527,1060.5 L608.689653,499.5 L935.023476,499.5 L925.448213,596.5 L1067.55518,596.5 L1057.38162,499.5 L1355.43806,499.5 Z" id="floor_7" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_7_1" stroke="#979797" fill="#D8D8D8" points="926 596 1067 596 1098.76876 904 896.584219 904"></polygon>
        <polygon id="zone_7_2" stroke="#979797" points="741 756.5 696.574219 1061 880 1061 909.5 756.5"></polygon>
        <polygon id="zone_7_3" stroke="#979797" points="559.503906 755.961318 500 1061 696.574219 1061 741 755.961318"></polygon>
        <polygon id="zone_7_6" stroke="#979797" points="1208.24219 499 1245 755.5 1083.53711 755.961318 1056.82644 499"></polygon>
        <polygon id="zone_7_7" stroke="#979797" points="1408.53516 755.961318 1245 755.961318 1208.24219 499 1355.84599 499"></polygon>
        <polygon id="zone_7_9" points="1083.53711 755.961318 1245 755.961318 1290.10547 1061 1114 1061"></polygon>
        <polygon id="zone_7_8" stroke="#979797" points="1245 755.961318 1408.53516 755.730659 1471 1061 1290.10547 1061"></polygon>
        <polygon id="zone_7_4" stroke="#979797" points="608.772883 499 560 755.961318 741.496094 755.961318 779.277344 499"></polygon>
        <polygon id="zone_7_5" stroke="#979797" points="778.78125 499 935.575263 499 909.5 756.25 741 756.5"></polygon>
        <path d="M1057.38162,1179.5 L1355.43806,1179.5 L1470.38716,1740.5 L1114.45384,1740.5 L1099.2226,1583.5 L896.134253,1583.5 L879.550034,1740.5 L500.605527,1740.5 L608.689653,1179.5 L935.023476,1179.5 L925.448213,1276.5 L1067.55518,1276.5 L1057.38162,1179.5 Z" id="floor_6" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_6_4" stroke="#979797" points="608.27679 1179 559.503906 1435.96132 741 1435.96132 778.78125 1179"></polygon>
        <polygon id="zone_6_2" stroke="#979797" points="741 1436.5 696.574219 1741 880 1741 909.5 1436.5"></polygon>
        <polygon id="zone_6_3" stroke="#979797" points="559.503906 1435.96132 500 1741 696.574219 1741 741 1435.96132"></polygon>
        <polygon id="zone_6_6" stroke="#979797" points="1208.24219 1179 1245 1435.5 1083.53711 1435.96132 1056.82644 1179"></polygon>
        <polygon id="zone_6_7" stroke="#979797" points="1408.53516 1435.96132 1245 1435.96132 1208.24219 1179 1355.84599 1179"></polygon>
        <polygon id="zone_6_9" stroke="#979797" points="1083.53711 1435.96132 1245 1435.96132 1290.10547 1741 1114 1741"></polygon>
        <polygon id="zone_6_8" points="1245 1435.96132 1408.53516 1435.73066 1471 1741 1290.10547 1741"></polygon>
        <polygon id="zone_6_5" points="778.78125 1179 935.575263 1179 909.5 1436.25 741 1436.5"></polygon>
        <polygon id="zone_6_1" stroke="#979797" points="926 1276 1067 1276 1098.76876 1584 896.584219 1584"></polygon>
        <path d="M935.023476,1859.5 L925.448213,1956.5 L1067.55518,1956.5 L1057.38162,1859.5 L1355.43806,1859.5 L1470.38716,2420.5 L1114.45384,2420.5 L1099.2226,2263.5 L896.134253,2263.5 L879.550034,2420.5 L500.605527,2420.5 L608.689653,1859.5 L935.023476,1859.5 Z" id="floor_5" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_5_4" stroke="#979797" points="608.27679 1859 559.503906 2115.96132 741 2115.96132 778.78125 1859"></polygon>
        <polygon id="zone_5_2" stroke="#979797" points="741 2116.5 696.574219 2421 880 2421 909.5 2116.5"></polygon>
        <polygon id="zone_5_3" stroke="#979797" points="559.503906 2115.96132 500 2421 696.574219 2421 741 2115.96132"></polygon>
        <polygon id="zone_5_6" stroke="#979797" points="1208.24219 1859 1245 2115.5 1083.53711 2115.96132 1056.82644 1859"></polygon>
        <polygon id="zone_5_7" stroke="#979797" points="1408.53516 2115.96132 1245 2115.96132 1208.24219 1859 1355.84599 1859"></polygon>
        <polygon id="zone_5_9" stroke="#979797" points="1083.53711 2115.96132 1245 2115.96132 1290.10547 2421 1114 2421"></polygon>
        <polygon id="zone_5_8" stroke="#979797" points="1245 2115.96132 1408.53516 2115.73066 1471 2421 1290.10547 2421"></polygon>
        <polygon id="zone_5_5" stroke="#979797" points="778.78125 1859 935.575263 1859 909.5 2116.25 741 2116.5"></polygon>
        <polygon id="zone_5_1" stroke="#979797" points="926 1956 1067 1956 1098.76876 2264 896.584219 2264"></polygon>
        <path d="M608.689653,2539.5 L935.023476,2539.5 L925.448213,2636.5 L1067.55518,2636.5 L1057.38162,2539.5 L1355.43806,2539.5 L1470.38716,3100.5 L1114.45384,3100.5 L1099.2226,2943.5 L896.134253,2943.5 L879.550034,3100.5 L500.605527,3100.5 L608.689653,2539.5 Z" id="floor_4" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_4_4" stroke="#979797" points="608.27679 2539 559.503906 2795.96132 741 2795.96132 778.78125 2539"></polygon>
        <polygon id="zone_4_2" stroke="#979797" points="741 2796.5 696.574219 3101 880 3101 909.5 2796.5"></polygon>
        <polygon id="zone_4_3" stroke="#979797" points="559.503906 2795.96132 500 3101 696.574219 3101 741 2795.96132"></polygon>
        <polygon id="zone_4_6" stroke="#979797" points="1208.24219 2539 1245 2795.5 1083.53711 2795.96132 1056.82644 2539"></polygon>
        <polygon id="zone_4_7" stroke="#979797" points="1408.53516 2795.96132 1245 2795.96132 1208.24219 2539 1355.84599 2539"></polygon>
        <polygon id="zone_4_9" stroke="#979797" points="1083.53711 2795.96132 1245 2795.96132 1290.10547 3101 1114 3101"></polygon>
        <polygon id="zone_4_8" stroke="#979797" points="1245 2795.96132 1408.53516 2795.73066 1471 3101 1290.10547 3101"></polygon>
        <polygon id="zone_4_5" stroke="#979797" points="778.78125 2539 935.575263 2539 909.5 2796.25 741 2796.5"></polygon>
        <polygon id="zone_4_1" stroke="#979797" points="926 2636 1067 2636 1098.76876 2944 896.584219 2944"></polygon>
        <path d="M935.023476,3219.5 L925.448213,3316.5 L1067.55518,3316.5 L1057.38162,3219.5 L1355.43806,3219.5 L1470.38716,3780.5 L1114.45384,3780.5 L1099.2226,3623.5 L896.134253,3623.5 L879.550034,3780.5 L500.605527,3780.5 L608.689653,3219.5 L935.023476,3219.5 Z" id="floor_3" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_3_4" stroke="#979797" points="608.27679 3219 559.503906 3475.96132 741 3475.96132 778.78125 3219"></polygon>
        <polygon id="zone_3_2" stroke="#979797" points="741 3476.5 696.574219 3781 880 3781 909.5 3476.5"></polygon>
        <polygon id="zone_3_3" stroke="#979797" points="559.503906 3475.96132 500 3781 696.574219 3781 741 3475.96132"></polygon>
        <polygon id="zone_3_6" stroke="#979797" points="1208.24219 3219 1245 3475.5 1083.53711 3475.96132 1056.82644 3219"></polygon>
        <polygon id="zone_3_7" stroke="#979797" points="1408.53516 3475.96132 1245 3475.96132 1208.24219 3219 1355.84599 3219"></polygon>
        <polygon id="zone_3_9" stroke="#979797" points="1083.53711 3475.96132 1245 3475.96132 1290.10547 3781 1114 3781"></polygon>
        <polygon id="zone_3_8" stroke="#979797" points="1245 3475.96132 1408.53516 3475.73066 1471 3781 1290.10547 3781"></polygon>
        <polygon id="zone_3_5" stroke="#979797" points="778.78125 3219 935.575263 3219 909.5 3476.25 741 3476.5"></polygon>
        <polygon id="zone_3_1" stroke="#979797" points="926 3316 1067 3316 1098.76876 3624 896.584219 3624"></polygon>
        <path d="M935.023476,3899.5 L925.448213,3996.5 L1067.55518,3996.5 L1057.38162,3899.5 L1355.43806,3899.5 L1470.38716,4460.5 L1114.45384,4460.5 L1099.2226,4303.5 L896.134253,4303.5 L879.550034,4460.5 L500.605527,4460.5 L608.689653,3899.5 L935.023476,3899.5 Z" id="floor_2" stroke="#979797" fill="url(#linearGradient-1)"></path>
        <polygon id="zone_2_4" stroke="#979797" points="608.27679 3899 559.503906 4155.96132 741 4155.96132 778.78125 3899"></polygon>
        <polygon id="zone_2_2" stroke="#979797" points="741 4156.5 696.574219 4461 880 4461 909.5 4156.5"></polygon>
        <polygon id="zone_2_3" stroke="#979797" points="559.503906 4155.96132 500 4461 696.574219 4461 741 4155.96132"></polygon>
        <polygon id="zone_2_6" stroke="#979797" points="1208.24219 3899 1245 4155.5 1083.53711 4155.96132 1056.82644 3899"></polygon>
        <polygon id="zone_2_7" stroke="#979797" points="1408.53516 4155.96132 1245 4155.96132 1208.24219 3899 1355.84599 3899"></polygon>
        <polygon id="zone_2_9" stroke="#979797" points="1083.53711 4155.96132 1245 4155.96132 1290.10547 4461 1114 4461"></polygon>
        <polygon id="zone_2_8" stroke="#979797" points="1245 4155.96132 1408.53516 4155.73066 1471 4461 1290.10547 4461"></polygon>
        <polygon id="zone_2_5" stroke="#979797" points="778.78125 3899 935.575263 3899 909.5 4156.25 741 4156.5"></polygon>
        <polygon id="zone_2_1" stroke="#979797" points="926 3996 1067 3996 1098.76876 4304 896.584219 4304"></polygon>
        <text id="Day" font-family="Helvetica-Light, Helvetica" font-size="100" font-weight="300" fill="#000000">
            <tspan x="0" y="97">Day</tspan>
        </text>
        <text id="Building-6" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
            <tspan x="0" y="269">Building 6</tspan>
        </text>
        <text id="123" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
            <tspan x="2167" y="1668">Building 31</tspan>
        </text>
        <rect id="zone_b31" stroke="#979797" x="2105.5" y="1582.5" width="487" height="120"></rect>
        <text id="zone_b31-copy" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300" fill="#565656">
            <tspan x="2236" y="1877">Off site</tspan>
        </text>
        <rect id="offSite" stroke="#979797" x="2105.5" y="1791.5" width="487" height="120"></rect>
        <g id="building_23" transform="translate(2170.000000, 2011.000000)" fill="#565656" fill-rule="nonzero" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300">
                <text id="Building-23">
                    <tspan x="0" y="69">Building 23</tspan>
                </text>
        </g>
        <g id="building24" transform="translate(2105.000000, 2001.000000)">
                <text id="text" fill="#565656" fill-rule="nonzero" font-family="Helvetica-Light, Helvetica" font-size="72" font-weight="300">
                    <tspan x="62" y="297">Building 24</tspan>
                </text>
                <rect id="zone_b23" stroke="#979797" x="7.5" y="0.5" width="480" height="104"></rect>
                <rect id="zone_b24" stroke="#979797" x="0.5" y="210.5" width="487" height="120"></rect>
        </g>
        <text id="dayNumber" font-family="Helvetica-Light, Helvetica" font-size="100" font-weight="300" fill="#000000">
            <tspan x="218" y="97">—</tspan>
        </text>
    </g>`

    if (message.topic === 'disableButtons') {
        disableButtons(message.payload, true);
    }

    if (message.topic === 'enableButtons') {
        disableButtons(message.payload, false);
    }

    if (message.topic === 'movesUpdate') {
        console.log(message);
        const days = movesMapContent.getElementById(`Days`);
        dayNumber = message.payload[0].phase;
        if (dayNumber >= 2) {
            const newElement = movesMapContent.createElement('g');
            const newDayWithDayNumber = newDay.replace("__DAY_NUMBER__", dayNumber);
            const newDayWithXIncrement = newDayWithDayNumber.replace("__X_INCREMENT__", dayNumber * 3000);
            newElement.innerHTML = newDayWithXIncrement;
            days.innerHTML += newDayWithXIncrement;
        }

        const currentDay = movesMapContent.getElementById(`day${dayNumber}`);
        for (item of message.payload) {
            if (item.type === 'variable') {
                svgObject = currentDay.querySelector(`#${item.id}`);
                if (svgObject.getElementsByTagName('tspan') !== undefined) {
                    const tspans = svgObject.getElementsByTagName('tspan');
                    tspans[0].textContent = item.value;
                }
                else {
                    movesMapContent.getElementById(item.id).textContent = item.value;
                }
            }
            else if (item.type === undefined) {
                const keys = Object.keys(item);
                keys.map((key) => {
                    svgObject = currentDay.querySelector(`#${key}`);
                    if (svgObject.style == undefined) {
                        svgObject.style = {};
                    }
                    if (item[key].color === '') {
                        svgObject.style.fill = 'none';
                    }
                    else {
                        svgObject.style.fill = item[key].color;
                    }
                    svgObject.style.fillOpacity = item[key].fillOpacity;
                    svgObject.style.stroke = item[key].borderColor;

                    if (item[key].arrowStartingPoint !== undefined) {
                        let x1;
                        let y1;
                        let x2;
                        let y2;
                        const startingPoint = movesMapContent.getElementById(item[key].arrowStartingPoint);

                        if (startingPoint.points !== undefined) {
                            const startingPointCoordinates = [...startingPoint.points];
                            x1 = startingPointCoordinates[0].x;
                            y1 = startingPointCoordinates[0].y;
                        }
                        else {
                            x1 = startingPoint.x.baseVal.value;
                            y1 = startingPoint.y.baseVal.value;
                        }
                        const endPoint = movesMapContent.getElementById(item[key].arrowEndPoint);

                        if (endPoint.points !== undefined) {
                            const endPointCoordinates = [...endPoint.points];
                            x2 = endPointCoordinates[0].x;
                            y2 = endPointCoordinates[0].y;
                        }
                        else {
                            x2 = endPoint.x.baseVal.value;
                            y2 = endPoint.y.baseVal.value;
                        }
                        currentDay.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-dasharray="5,17"></line>
                                                                    <circle stroke="#000000" stroke-width="3" fill="#FFFFFF" cx="${x1}" cy="${y1}" r="10.5"></circle>
                        <path d="M1303,1522 C1321.2254,1522 1336,1536.78434 1336,1555.02174 C1336,1567.18001 1325,1587.17276 1303,1615 C1281,1587.17276 1270,1567.18001 1270,1555.02174 C1270,1536.78434 1284.7746,1522 1303,1522 Z M1303.5,1541 C1295.49187,1541 1289,1547.49187 1289,1555.5 C1289,1563.50813 1295.49187,1570 1303.5,1570 C1311.50813,1570 1318,1563.50813 1318,1555.5 C1318,1547.49187 1311.50813,1541 1303.5,1541 Z" fill="#D64E4E" transform = "translate(${x2 - 1300},${y2 - 1600})"></path>`
                    }
                })

            }
        }
    }

    if (message.topic === 'variablesUpdate' && message.payload[0].svg === 1) {
        console.log(message);
        for (element of message.payload) {
            svgObject = ganttChartContent.getElementById(element.id);
            if (svgObject.getElementsByTagName('tspan') !== undefined) {
                const tspans = svgObject.getElementsByTagName('tspan');
                tspans[0].textContent = element.value;
            }
            else {
                ganttChartContent.getElementById(element.id).textContent = element.value;
            }
            const startingPoint = ganttChartContent.getElementById('line_1');
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
            const svgArea = ganttChartContent.getElementById('Page-1');
            if (element.type === 'Move') {
                color = '#73B7D5';
            }
            else if (element.type === 'Construction') {
                color = '#E1D382';
            }
            else {
                color = '#EE8E8E';
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
        const elementToUpdate = ganttChartContent.getElementById(message.payload.id);
        console.log(elementToUpdate);
        elementToUpdate.style.fill = message.payload.color;
    }
};