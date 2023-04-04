export function search(nameKey, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

export function lapTimeToMilliseconds(lapTime) {
    
}