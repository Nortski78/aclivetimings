import { publish, subscribe } from "./pubsub.js";
import { search } from "./helperfunctions.js";

export function initLaps() { 
    console.log("laps initialised");
    
}

subscribe('filedropped', parseFile);

function parseFile(data) {
    const lapsJSON = JSON.parse(data);
    let result = lapsJSON["Result"];
    const filteredResult = result.filter(bestLap => {
        if(bestLap["DriverName"] != "") return true;
    });

    let lapsData = [];

    for(const bestLap of filteredResult) {
        let data = {
            "DriverName": bestLap["DriverName"],
            "BestLap": bestLap["BestLap"],
            "DriverGuid": bestLap["DriverGuid"]
        } 
        lapsData.push(data);
    }

    compareData(lapsData);
}

function compareData(submittedData) {
    let updatedLapData = [];
    

    fetch('bestlapsdata.json')
    .then(res => res.json())
    .then(currentData => {

        backupCurrentData(currentData);

        updatedLapData = currentData;

        for(const driver of submittedData) {
            let driverExists = false;

            for(const currDriver of updatedLapData) {
            if(driver["DriverGuid"] === currDriver["DriverGuid"]) {
                driverExists = true;
                if(driver["BestLap"] <= currDriver["BestLap"]) {
                    currDriver["BestLap"] = driver["BestLap"];
                } //else {
                    //updatedLapData.push(currDriver);
                //}
            }
           }
           if(!(driverExists)) updatedLapData.push(driver);
           driverExists = false;
        }

        let sortedLapData = updatedLapData.sort((a, b) => {
            if (a["BestLap"] < b['BestLap']) {
                return -1;
            }
            if (a["BestLap"] > b["BestLap"]) {
                return 1;
            }
            return 0;
        });
        
        saveToLocalFile(sortedLapData);
    });
}


function saveToLocalFile(lapsData) {

    fetch('save.php', {
        "method": 'POST',
        "headers": {
            'Content-Type': 'application/json; charset=utf-8'
        },
        "body": JSON.stringify(lapsData)
    }).then(res => {
        return res.json()
    }).then(data => publish('sessionsubmitted', data));
}

function backupCurrentData(currentData) {

    fetch('backup.php', {
        "method": 'POST',
        "headers": {
            'Content-Type': 'application/json; charset=utf-8'
        },
        "body": JSON.stringify(currentData)
    }).then(res => {
        return res.json()
    }).then(data => console.log("Current data backed up."));
}