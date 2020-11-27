export function getRandom(num) {
    const rand = Math.random() * (num + 1);
    return Math.floor(rand);
}

export function getDOMElement(id) {
    return document.getElementById(id);
}
