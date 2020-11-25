class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressBar = document.getElementById(`progressbar-${name}`);
    }
}
export class Pokemon extends Selectors {
    constructor({ name, hp, selectors }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        }

        this.renderHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife() {
        const { elHP, hp: { current, total } } = this;
        elHP.innerText = `${current} / ${total}`;
    }

    renderProgressBarHP() {
        const { elProgressBar, hp: { current, total } } = this;
        elProgressBar.style.width = `${(current * 100) / total }%`;
    }

    changeHP(count, cb) {
        this.hp.current -= count;
        if (this.hp.current <= 0) {
            this.hp.current = 0;
            endGame();
        }

        this.renderHP();
        cb(count);
    }
}
