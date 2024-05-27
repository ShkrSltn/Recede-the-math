let multResult = document.querySelector('.mult-result');
let pResult = document.createElement('p');
pResult.className = 'pResult';


function generateMultiplicationTable(rows, columns) {
    const multBlock = document.getElementById('multipltaction-table');
    for (let i = 1; i <= rows; i++) {
        let ul = document.createElement('ul');
        ul.className = 'mult-ul';
        for (let j = 1; j <= columns; j++) {
            let li = document.createElement('li');
            li.className = 'mult-li';
            li.style.cursor = 'pointer';
            li.innerText = (i * j);
            ul.appendChild(li);
            if (j === 1) {
                ul.id = 'ul' + i;

            }

        }
        multBlock.appendChild(ul);
        multResult.appendChild(pResult);
        highlight('#' + ul.id);

    }

}

function highlight(ulId) {
    const firstUlItems = document.querySelectorAll('#ul1 .mult-li');
    const ul = document.querySelectorAll(ulId + ' .mult-li');
    const ulArray = Array.from(ul);
    ulArray.slice(1).forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            if (firstUlItems[index + 1]) {
                firstUlItems[index + 1].classList.add('highlight');
                const firstNumber = item.parentNode.firstChild.innerText;
                const secondNumber = firstUlItems[index + 1].innerText;
                const result = parseInt(firstNumber) * parseInt(secondNumber);
                pResult.innerText = `${firstNumber} * ${secondNumber} = ${result}`;
            }
        });

        item.addEventListener('mouseout', () => {
            if (firstUlItems[index + 1]) {
                firstUlItems[index + 1].classList.remove('highlight');
                pResult.innerText = '';
            }
        });
    });

}


generateMultiplicationTable(10, 10);