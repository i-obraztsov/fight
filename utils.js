export function getRandom(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function getDOMElement(id) {
    return document.getElementById(id);
}
