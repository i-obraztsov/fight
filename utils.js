export function getRandom(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function getDOMElement(id) {
    return document.getElementById(id);
}

export const initCounterPressingBtn = (count = 0, btn) => {
    const innerText = btn.innerText;
    btn.innerText = `${innerText} (${count})`;
    return () => {
        count--;
        if (count === 0)  btn.disabled = true;

        btn.innerText = `${innerText} (${count})`;
    }
};
