const form = document.getElementById('myForm');
let minInput = document.getElementById('min');
let maxInput = document.getElementById('max');
let countInput = document.getElementById('count');

//const values
let minValue = 1;
let maxValue = 10;
let countValue = 20;

minInput.value = minValue;
maxInput.value = maxValue;
countInput.value = countValue;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const count = parseInt(document.getElementById('count').value);
    const type = document.getElementById('forType').value;

    if (min && max && count) {
        console.log('Min:', min);
        console.log('Max:', max);
        console.log('Count:', count);
        console.log('Type:', type);
    } else {
        alert('Please fill out all fields.');
        return;
    }

    myOperation(type, min, max, count);
});

let container = document.getElementById("container");
let problemsBlock = document.getElementById("problemsB");
problemsBlock.style.display = 'none';

let myOperation = (operation, min, max, count) => {
    if (min > max) {
        alert('Minimum value should be less than Maximum value');
        return;
    }

    if (count > 80) {
        alert('Count should be less than 80');
        return;
    }
    let newButton = document.createElement("button");
    newButton.type = "button";
    newButton.onclick = generatePDF;
    newButton.className = "form__button";
    newButton.textContent = "Download PDF";

    let enableButton = document.createElement("button");
    enableButton.type = "button";
    enableButton.textContent = 'Enable Quiz Mode';
    enableButton.onclick = function () {
        if (enableButton.dataset.mode === 'quiz') {
            enableQuizMode();
            enableButton.dataset.mode = 'disable';
            enableButton.textContent = 'Disable Quiz Mode';
        } else {
            disableQuizMode();
            enableButton.dataset.mode = 'quiz';
            enableButton.textContent = 'Enable Quiz Mode';
        }
    };
    enableButton.dataset.mode = 'quiz';
    enableButton.className += "form__button";



    let newText = document.createElement("p");
    newText.className = 'results-text';

    problemsBlock.style.display = 'block';
    container.innerHTML = "";
    let newArray = [];
    let newDiv = document.createElement("div");
    newDiv.className = 'results-div';
    container.appendChild(newDiv);
    let newUl = document.createElement("ul");
    newUl.className = 'list-ul';
    newDiv.appendChild(newUl);
    newDiv.appendChild(newButton);
    newDiv.appendChild(enableButton);

    const operations = ["sum", "subt", "mult", "div", "comp"];

    const generateProblem = (op) => {
        let a = Math.floor(Math.random() * (max - min + 1)) + min;
        let b = Math.floor(Math.random() * (max - min + 1)) + min;

        if (op === "sum") {
            return `${a} + ${b} = ?`;
        } else if (op === "subt") {
            if (a < b) [a, b] = [b, a];

            return `${a} - ${b} = ?`;
        } else if (op === "mult") {
            return `${a} * ${b} = ?`;
        } else if (op === "div") {
            minInput.value = 2;
            while (b === 0 || a % b !== 0) {
                a = Math.floor(Math.random() * (max - min + 1)) + min;
                b = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return `${a} / ${b} = ?`;
        } else if (op === "comp") {
            return `${a} ? ${b}`;
        }
    };

    if (operation === "mixed") {
        for (let i = 0; i < count; i++) {
            let randomOp = operations[Math.floor(Math.random() * operations.length)];
            let problemStr = generateProblem(randomOp);
            if (problemStr.includes('-')) {
                problemStr = problemStr.replace(/(-\d+)/g, '($1)');
            }
            newArray.push(problemStr);
        }
    } else {
        for (let i = 0; i < count; i++) {
            let problemStr = generateProblem(operation);
            if (problemStr.includes('-')) {
                problemStr = problemStr.replace(/(-\d+)/g, '($1)');
            }
            newArray.push(problemStr);
        }
    }

    newArray.forEach((item) => {
        let newLi = document.createElement("li");
        newLi.textContent = item;
        newUl.appendChild(newLi);
    });

    return newArray;
};

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const element = document.querySelector('#container');

    let problems = element.innerText.split('\n');
    let y = 30;
    const lineHeight = 14;
    const textMarginLeft = 30;
    const columnWidth = 80;
    const rowHeight = 20;
    const pageHeight = 280;

    let currentDate = new Date().toLocaleDateString() + ' by ShkrSltn';
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(currentDate, 150, 10);


    let problemTitle = '';
    if (problems.length > 0) {
        let firstProblem = problems[0];
        if (firstProblem.includes('+')) {
            problemTitle = "Addition Problems";
        } else if (firstProblem.includes('-')) {
            problemTitle = "Subtraction Problems";
        } else if (firstProblem.includes('*')) {
            problemTitle = "Multiplication Problems";
        } else if (firstProblem.includes('/')) {
            problemTitle = "Division Problems";
        } else {
            problemTitle = "Comparison Problems";
        }
    }

    doc.setFont('courier', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text(problemTitle.toUpperCase(), 105, y - 10, null, null, 'center');
    y += 15;

    for (let i = 0; i < problems.length - 1; i += 2) {

        if (y > pageHeight) {
            doc.addPage();
            y = 30;

            doc.text(problemTitle.toUpperCase() + ' (continued)', 105, 10, null, null, 'center');
        }


        doc.setFontSize(14);
        let problemIndex = i;
        if (problemIndex < problems.length - 1) {
            let problemWithSquares = problems[problemIndex].replace(/\?/g, "_____");
            doc.text(problemWithSquares, textMarginLeft, y);
        }

        problemIndex = i + 1;
        if (problemIndex < problems.length - 1) {
            let problemWithSquares = problems[problemIndex].replace(/\?/g, "_____");
            doc.text(problemWithSquares, textMarginLeft + columnWidth, y);
        }

        y += rowHeight;

        doc.setLineWidth(2);
        doc.setDrawColor(81, 175, 91);
        doc.line(10, y - 10, 200, y - 10);
    }
    doc.save('problems.pdf');
}


function getGeneratedProblemValue(problem) {
    const regex = /(-?\d+|\(-\d+\))\s*([+\-*\/?])\s*(-?\d+|\(-\d+\))/;
    const match = problem.match(regex);
    if (match) {
        const firstValue = parseInt(match[1].replace(/[()]/g, ''));
        const operator = match[2];
        const secondValue = parseInt(match[3].replace(/[()]/g, ''));
        let value;
        switch (operator) {
            case '+':
                value = firstValue + secondValue;
                break;
            case '-':
                value = firstValue - secondValue;
                break;
            case '*':
                value = firstValue * secondValue;
                break;
            case '/':
                value = firstValue / secondValue;
                break;
            case '?':
                value = firstValue > secondValue ? firstValue : secondValue;
                break;
            default:
                value = null;
        }
        return value;
    }
    return null;
}

function enableQuizMode() {
    const problems = document.querySelectorAll('.list-ul li');
    let correctCount = 0;
    let wrongCount = 0;

    problems.forEach((problem) => {
        let ourResult = getGeneratedProblemValue(problem.textContent);
        let input = document.createElement('input');
        input.type = 'number';
        input.className = 'answer-input';

        problem.appendChild(input);
        input.addEventListener('input', function () {
            const answer = parseInt(this.value);
            const correctAnswer = ourResult;
            const difference = Math.abs(answer - correctAnswer);
            if (answer === correctAnswer) {
                this.style.border = '2px solid green';
                this.style.backgroundColor = 'lightgreen';
                correctCount++;
            } else if (difference <= 5) {
                this.style.border = '2px solid yellow';
                this.style.backgroundColor = 'lightyellow';
                wrongCount++;
            } else {
                this.style.border = '2px solid red';
                this.style.backgroundColor = 'lightcoral';
                wrongCount++;
            }
        });
        /* 
                input.addEventListener('change', function () {
                    this.disabled = true;
                }); */
    });

    console.log('Correct Answers:', correctCount);
    console.log('Wrong Answers:', wrongCount);
}

function disableQuizMode() {
    const inputs = document.querySelectorAll('.answer-input');
    inputs.forEach((input) => {
        input.remove();
    });
}
