const $btnKick = getDOMElement('btn-kick');
const $btnSuperKick = getDOMElement('btn-super-kick');
const $logs = getDOMElement('logs');

const initCounterPressingBtn = (count = 0) => (max) => {
    count += 1;
    if (count > max) return count;

    console.log(`Количество нажатий на кнопку: ${count}`);
    console.log(`Осталось нажатий: ${max - count}`);
    return count;
};

const counterKick = initCounterPressingBtn(0);
const counterSuperKick = initCounterPressingBtn(0);

const onRun = (damage, maxPressBtn, callback) => {
    const count = callback(maxPressBtn);
    if (count > maxPressBtn) return;

    character.changeHP(getRandom(damage), enemy.name);
    enemy.changeHP(getRandom(damage), character.name);
};

$btnKick.addEventListener('click', () => onRun(20, 6, counterKick));
$btnSuperKick.addEventListener('click', () => onRun(60, 2, counterSuperKick));

const Person = function(
    name,
    defaultHP = 100,
    damageHP = 100,
    $elHP,
    $elProgressBar
) {
    this.name = name;
    this.defaultHP = defaultHP;
    this.damageHP = damageHP;
    this.$elHP = $elHP;
    this.$elProgressBar = $elProgressBar;
    this.changeHP = changeHP;
    this.renderHP = renderHP;
    this.renderHPLife = renderHPLife;
    this.renderProgressBarHP = renderProgressBarHP;
}

const character = new Person('Pickachu', 100, 100, getDOMElement('health-character'), getDOMElement('progressbar-character'));
const enemy = new Person('Charmander', 100, 100, getDOMElement('health-enemy'), getDOMElement('progressbar-enemy'))

function init() {
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
}

function renderHPLife() {
    const { $elHP, damageHP, defaultHP } = this;
    $elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressBarHP() {
    const { $elProgressBar, damageHP, defaultHP } = this;
    $elProgressBar.style.width = `${(damageHP * 100) / defaultHP }%`;
}

function changeHP(count, enemyName) {
    this.damageHP -= count;
    if (this.damageHP <= 0) {
        this.damageHP = 0;
        endGame(this.name);
    }

    this.renderHP();
    renderLog(this.name, enemyName, this.damageHP, count);
}

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

function renderLog(name, enemyName, hp, damage) {
    const logContainer = document.createElement('div');
    const textEl= document.createElement('p');
    const damageEl = document.createElement('p');
    const hpEl = document.createElement('p');

    textEl.innerText = getMessage(name, enemyName);
    damageEl.innerText = `Урон: ${damage}`;
    hpEl.innerText = `Оставшиеся жизни: ${hp}`;

    logContainer.appendChild(textEl).appendChild(damageEl).appendChild(hpEl);

    $logs.insertBefore(logContainer, $logs.children[0]);
}

function getRandom(num) {
    const rand = Math.random() * (num + 1);
    return Math.floor(rand);
}

function endGame(name) {
    alert(`Персонаж ${name} проиграл`);
    $btnKick.disabled = true;
    $btnSuperKick.disabled = true;
}

function getDOMElement(id) {
    return document.getElementById(id);
}

init();
