import { getRandom } from './utils.js';
import { renderLog } from './log.js';
import { Pokemon } from './pokemon.js';

const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

const initCounterPressingBtn = (count = 0, btn) => {
    const innerText = btn.innerText;
    btn.innerText = `${innerText} (${count})`;
    return () => {
        count--;
        if (count === 0)  btn.disabled = true;

        btn.innerText = `${innerText} (${count})`;
    }
};

const counterKick = initCounterPressingBtn(6, $btnKick);
$btnKick.addEventListener('click', function() {
    counterKick();
    character.changeHP(getRandom(20), count => {
        renderLog(character, enemy, count)
    });
    enemy.changeHP(getRandom(20), count => {
        renderLog(enemy, character, count)
    });
});

const counterSuperKick = initCounterPressingBtn(2, $btnSuperKick);
$btnSuperKick.addEventListener('click', function() {
    counterSuperKick();
    character.changeHP(getRandom(60), count => {
        renderLog(character, enemy, count)
    });
    enemy.changeHP(getRandom(60), count => {
        renderLog(enemy, character, count)
    });
});

const character = new Pokemon({
    name: 'Pickachu',
    hp: 100,
    selectors: 'character',
});

const enemy = new Pokemon({
    name: 'Charmander',
    hp: 100,
    selectors: 'enemy',
});
