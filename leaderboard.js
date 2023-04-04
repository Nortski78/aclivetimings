import { subscribe } from "./pubsub.js";
import { getFlag } from "./flags.js";

export function initLeaderboard() {
    console.log("Leaderboard initialised");
    subscribe('sessionsubmitted', loadLeaderboard);
    loadLeaderboard();
}

function loadLeaderboard(lapData) {

    if(lapData) {
        renderSession(lapData);
        return
    }
    
    fetch('bestlapsdata.json')
    .then(res => res.json())
    .then(data => renderSession(data))
    .catch(error => console.log(error));
}

function renderSession(data) {

    console.log(data);
    const table = document.querySelector('table');
    const tBody = document.querySelector('tbody');
    tBody.innerHTML = "";

    let newRow = table.insertRow(-1);
    let posCell = newRow.insertCell(0);
    let flagCell = newRow.insertCell(1);
    let driverCell = newRow.insertCell(2);
    let bestLapCell = newRow.insertCell(3);
    let gapCell = newRow.insertCell(4);
    let posText = document.createTextNode("POS");
    let driverText = document.createTextNode("DRIVER");
    let lapText = document.createTextNode("LAP TIME");
    let gapText = document.createTextNode("GAP");
   
    posCell.classList.add('table-head', 'center-text', 'auto-width', 'td-pos-padding');
    driverCell.classList.add('table-head', 'td-driver-padding');
    bestLapCell.classList.add('table-head', 'center-text');
    flagCell.classList.add('flag-icon');
    gapCell.classList.add('table-head', 'td-gap-padding');
    posCell.appendChild(posText);
    driverCell.appendChild(driverText);
    bestLapCell.appendChild(lapText);
    gapCell.appendChild(gapText);

    table.insertRow(-1);
    table.insertRow(-1);

    let pos = 1;
    for(const record of data) {
        let newRow = table.insertRow(-1);
        let posCell = newRow.insertCell(0);
        posCell.classList.add('center-text', 'auto-width', 'td-pos-padding');
        let flagCell = newRow.insertCell(1)
        flagCell.classList.add('flag-icon');
        let flagImg = document.createElement('img');
        flagImg.setAttribute('src', `./flags/${getFlag(record['Nation'])}`)
        flagImg.setAttribute('width', '15');
        flagImg.setAttribute('height', '10');
        flagCell.appendChild(flagImg);
        let driverCell = newRow.insertCell(2);
        driverCell.classList.add('td-driver-padding');
        let bestLapCell = newRow.insertCell(3);
        bestLapCell.classList.add('round-border', 'center-text');
        let gapCell = newRow.insertCell(4);
        let gapText = document.createTextNode(milliSecToTime(record["Gap"]));
        let posText = document.createTextNode(pos);
        let driverText = document.createTextNode(record["DriverName"]);
        let lapText = document.createTextNode(milliSecToTime(record["BestLap"]));
        gapCell.classList.add('td-gap-padding');
        posCell.appendChild(posText);
        driverCell.appendChild(driverText);
        bestLapCell.appendChild(lapText);
        gapCell.appendChild(gapText);
        table.insertRow(-1);

        pos += 1;
    }
}

function milliSecToTime(milliseconds) {

    if(milliseconds === 0) return '';

    let a = Math.floor(milliseconds/60000);
    let y = milliseconds % 60000;

    let b = Math.floor(y/1000).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    let c = (y % 1000).toLocaleString('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
      });

    let lapTime = `${a}:${b}:${c}`;

    return lapTime;
}