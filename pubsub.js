
import { Event } from "./event.js";

let events = [];

const publish = (eventName, data) => {

    if(!(eventName in events)) {
        events[eventName] = Event(eventName);
    }
    events[eventName].fireHandlers(data);
}

const subscribe = (eventName, callback) => {
    
    if(!(eventName in events)) {
        events[eventName] = Event(eventName);
    }

    events[eventName].addHandler(callback);
}

const getEvents = () => events;

export {publish, subscribe, getEvents};