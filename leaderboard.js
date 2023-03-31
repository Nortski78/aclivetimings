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
    let driverCell = newRow.insertCell(1);
    let bestLapCell = newRow.insertCell(2);
    let posText = document.createTextNode("POS");
    let driverText = document.createTextNode("DRIVER");
    let lapText = document.createTextNode("LAP TIME");
   
    posCell.classList.add('table-head', 'center-text', 'auto-width', 'td-pos-padding');
    driverCell.classList.add('table-head', 'td-driver-padding');
    bestLapCell.classList.add('table-head', 'center-text');
    posCell.appendChild(posText);
    driverCell.appendChild(driverText);
    bestLapCell.appendChild(lapText);

    table.insertRow(-1);
    table.insertRow(-1);

    //newRow.classList.add('bold');

    let pos = 1;
    for(const record of data) {
        let newRow = table.insertRow(-1);
        let posCell = newRow.insertCell(0);
        posCell.classList.add('center-text', 'auto-width', 'td-pos-padding');
        let flagCell = newRow.insertCell(1)
        flagCell.classList.add('flag-icon', 'flag-icon-us');
        let driverCell = newRow.insertCell(2);
        driverCell.classList.add('td-driver-padding');
        let bestLapCell = newRow.insertCell(3);
        bestLapCell.classList.add('round-border', 'center-text');
        let posText = document.createTextNode(pos);
        let flagSvg = document.createTextNode(getFlag(record["Nation"]));
        let driverText = document.createTextNode(record["DriverName"]);
        let lapText = document.createTextNode(milliSecToTime(record["BestLap"]));
        posCell.appendChild(posText);
        flagCell.appendChild(flagSvg);
        driverCell.appendChild(driverText);
        bestLapCell.appendChild(lapText);
        table.insertRow(-1);

        pos += 1;
    }
}

function milliSecToTime(milliseconds) {

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