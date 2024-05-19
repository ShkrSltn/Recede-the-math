function generateMultiplicationTable(rows, columns) {
    const multBlock = document.getElementById('multipltaction-table');
    for (let i = 1; i <= rows; i++) {
        let ul = document.createElement('ul');
        ul.className = 'mult-ul';
        for (let j = 1; j <= columns; j++) {
            let li = document.createElement('li');
            li.className = 'mult-li';
            li.innerText = (i * j);
            ul.appendChild(li);
            if (i === 1 && j === 1) {
                ul.id = 'firstUl';
            }
        }
        multBlock.appendChild(ul);
    }

}



// Генерация таблицы умножения 10x10
generateMultiplicationTable(10, 10);