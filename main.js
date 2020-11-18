const btnKick = document.getElementById('btn-kick');
const btnSuperKick = document.getElementById('btn-super-kick');

const character = {
    name: 'Pickachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
}

function init() {
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person){
    renderHPLife(person);
    renderProgressBarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgressBarHP(person) {
    person.elProgressBar.style.width = `${person.damageHP}%`;
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        endGame(person);
    } else {
        person.damageHP -= count;
    }

    renderHP(person);
}

function getRandom(num) {
    const rand = Math.random() * (num + 1);
    return Math.floor(rand);
}

function endGame(person) {
    alert(`Персонаж ${person.name} проиграл`);
    btnKick.disabled = true;
    btnSuperKick.disabled = true;
}

function run(maxDamage) {
    changeHP(getRandom(maxDamage), character);
    changeHP(getRandom(maxDamage), enemy);
}

btnKick.addEventListener('click', function() {
    run(20);
});

btnSuperKick.addEventListener('click', function() {
    run(60);
});

init();
