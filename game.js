import { Pokemon } from './pokemon.js';
import { pokemons } from './pokemons.js';

import { renderLog } from './log.js';
import { getRandom } from './utils.js';

const $control = document.querySelector('.control');
const $logs = document.getElementById('logs');

const initCounterPressingBtn = (count = 0, btn) => {
    const innerText = btn.innerText;
    btn.innerText = `${innerText} (${count})`;
    return () => {
        count--;
        if (count === 0)  btn.disabled = true;

        btn.innerText = `${innerText} (${count})`;
    }
};

export class Game {
    constructor() {
        this.initGame();
    }

    startGame = () => {
        this.clearButtons(this.startGame);
        this.createAttacks();
    }

    initGame = () => {
        const { pokemon1, pokemon2, } = this.getPokemons(pokemons.length);

        const player1 = new Pokemon({
            ...pokemon1,
            selectors: 'player1',
        })

        const player2 = new Pokemon({
            ...pokemon2,
            selectors: 'player2',
        })

        this.player1 = player1;
        this.player2 = player2;

        const btnStart = this.makeButton('Start game');
        btnStart.addEventListener('click', this.startGame);

        $control.append(btnStart);
    }

    clearButtons(handler) {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => {
            $item.removeEventListener('click', handler);
            $item.remove()
        });
    }

    makeButton(name) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.type = 'button';
        btn.innerText = name;

        return btn;
    }

    getPokemons(len) {
        let random = [];
        for(let i = 0; i < len; i++) {
            if (random.length === 2) break;

            const rand = getRandom(0, len - 1);
            if (random[0] !== rand) {
                random.push(rand);
            }
        }

        return {
            pokemon1: pokemons[random[0]],
            pokemon2: pokemons[random[1]]
        }
    }

    createAttacks = () => {
        const { player1, player2 } = this;

        player1.attacks.forEach(({ name, maxCount, minDamage, maxDamage }) => {
            const btn = this.makeButton(name);

            const counterKick = initCounterPressingBtn(maxCount, btn);
            btn.addEventListener('click', () => {
                // player1.changeHP(getRandom(minDamage, maxDamage), (count) => {
                //     renderLog(player1, player2, count);
                //     return this.endGame;
                // });
                counterKick();
                player2.changeHP(getRandom(minDamage, maxDamage), (count) => {
                    renderLog(player2, player1, count);
                    return this.endGame;
                });
            })

            $control.appendChild(btn);
        });
    }

    endGame = () => {
        this.clearButtons();

        const gameOver = document.createElement('div');
        gameOver.classList.add('game_over');
        gameOver.innerText = 'Game Over';
        const restartGame = this.makeButton('Restart');

        restartGame.addEventListener('click', this.resetGame);

        $control.append(gameOver);
        $control.append(restartGame);
    }

    resetGame = () => {
        this.clearButtons();
        document.querySelector('.game_over').remove();
        $logs.innerHTML = '';

        this.initGame();
    }
}
