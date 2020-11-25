import { getRandom, getDOMElement } from './utils.js';

const $logs = getDOMElement('logs');

const getMessage = (person1, person2) => {
    const logs = [
        `[${person1}] вспомнил что-то важное, но неожиданно [${person2}], не помня себя от испуга, ударил в предплечье врага.`,
        `[${person1}] поперхнулся, и за это [${person2}] с испугу приложил прямой удар коленом в лоб врага.`,
        `[${person1}] забылся, но в это время наглый [${person2}], приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `[${person1}] пришел в себя, но неожиданно [${person2}] случайно нанес мощнейший удар.`,
        `[${person1}] поперхнулся, но в это время [${person2}] нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `[${person1}] удивился, а [${person2}] пошатнувшись влепил подлый удар.`,
        `[${person1}] высморкался, но неожиданно [${person2}] провел дробящий удар.`,
        `[${person1}] пошатнулся, и внезапно наглый [${person2}] беспричинно ударил в ногу противника`,
        `[${person1}] расстроился, как вдруг, неожиданно [${person2}] случайно влепил стопой в живот соперника.`,
        `[${person1}] пытался что-то сказать, но вдруг, неожиданно [${person2}] со скуки, разбил бровь сопернику.`
    ];

    return logs[getRandom(logs.length - 1)];
}

export function renderLog(player1, player2, count) {
    const { name, hp: { current } } = player1;
    const { name: enemyName } = player2;

    const logContainer = document.createElement('div');
    const textEl= document.createElement('p');
    const damageEl = document.createElement('p');
    const hpEl = document.createElement('p');

    textEl.innerText = getMessage(name, enemyName);
    damageEl.innerText = `Урон: ${count}`;
    hpEl.innerText = `Оставшиеся жизни: ${current}`;

    logContainer.appendChild(textEl).appendChild(damageEl).appendChild(hpEl);

    $logs.insertBefore(logContainer, $logs.children[0]);
}
