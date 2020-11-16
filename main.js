const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function countChar(str, char = 'А') {
    let count = 0;
    const newStr = str.toUpperCase();
    const newChar = char.toUpperCase();
    for (let i = 0; i < newStr.length; i++) {
        if(newStr.charAt(i) === newChar) count++
    }

    return count;
}

function getRow(firstRow = '', secondRow = '') {
    const char = prompt('Какой символ посчитать?');
    const countCharFirstRow = countChar(firstRow, char);
    const countCharSecondRow = countChar(secondRow, char);

    return countCharFirstRow > countCharSecondRow ? firstRow : secondRow;
}

alert(getRow(firstRow, secondRow))
