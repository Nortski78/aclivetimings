export function Event(name) {
    let handlers = [];

    const getName = () => name;
    const addHandler = (callback) => handlers.push(callback);
    const getHandlers = () => handlers;
    const fireHandlers = (data) => {
        handlers.forEach((handler) => {
            handler(data);
        })
    }

    return { getName, addHandler, getHandlers, fireHandlers };
}