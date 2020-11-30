import { Pokemon } from './pokemon.js';
import { Api } from './api.js';

import { renderLog } from './log.js';
import { getRandom, initCounterPressingBtn } from './utils.js';

const $control = document.querySelector('.control');
const $logs = document.getElementById('logs');

export class Game {
    constructor() {
        this.pokemons = null;
        this.player1 = null;
        this.player2 = null;
        this.api = new Api();
    }

    startGame = () => {
        this.clearButtons(this.startGame);
        this.createAttacks();
    }

    initGame = async () => {
        this.pokemons = await this.api.fetchPokemons();

        const hero = this.getHero();
        const enemy = await this.api.fetchPokemons({
            random: true,
        })

        const player1 = new Pokemon({
            ...hero,
            selectors: 'player1',
        });

        const player2 = new Pokemon({
            ...enemy,
            selectors: 'player2',
        });

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

    getHero() {
        return this.pokemons[getRandom(0, this.pokemons.length - 1)]
    }

    createAttacks = () => {
        const { player1, player2 } = this;

        player1.attacks.forEach(({ name, maxCount, minDamage, maxDamage, id }) => {
            const btn = this.makeButton(name);

            const counterKick = initCounterPressingBtn(maxCount, btn);
            btn.addEventListener('click', async () => {
                counterKick();

                const { kick } = await this.api.fetchDamage({
                    player1id: player1.id,
                    attackId: id,
                    player2id: player2.id,
                });

                player1.changeHP(kick.player1, (count) => {
                    renderLog(player1, player2, count);
                    return this.endGame;
                });
                player2.changeHP(kick.player1, (count) => {
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
