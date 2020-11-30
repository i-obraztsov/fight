class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressBar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}
export class Pokemon extends Selectors {
    constructor({ name, hp, selectors, type, img, attacks, id }) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.img = img;
        this.attacks = attacks;
        this.id = id;
        this.hp = {
            current: hp,
            total: hp,
        };

        this.renderPokemon();
    }

    renderPokemon() {
        this.elName.innerText = this.name;
        this.elImg.src = this.img;

        this.renderHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife() {
        const {
            elHP,
            hp: { current, total },
        } = this;
        elHP.innerText = `${current} / ${total}`;
    }

    renderProgressBarHP() {
        const {
            elProgressBar,
            hp: { current, total },
        } = this;

        const hp = (current * 100) / total;

        if (hp < 60 && hp > 20) {
            this.elProgressBar.classList.add('low');
        } else if (hp < 20) {
            this.elProgressBar.classList.remove('low');
            this.elProgressBar.classList.add('critical');
        } else {
            this.elProgressBar.classList.remove('critical');
            this.elProgressBar.classList.remove('low');
        }

        elProgressBar.style.width = `${hp}%`;
    }

    changeHP(count, cb) {
        const endGame = cb(count);
        this.hp.current -= count;
        if (this.hp.current <= 0) {
            this.hp.current = 0;
            endGame();
        }

        this.renderHP();
    }
}
