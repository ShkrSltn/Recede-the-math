const form = document.getElementById('myForm');
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

    if (count > 50) {
        alert('Count should be less than 50');
        return;
    }
    let newButton = document.createElement("button");
    newButton.type = "button";
    newButton.onclick = generatePDF;
    newButton.className = "form__button";
    newButton.textContent = "Download PDF";

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

    const operations = ["sum", "subt", "mult", "div", "comp"];

    const generateProblem = (op) => {
        let a = Math.floor(Math.random() * (max - min + 1)) + min;
        let b = Math.floor(Math.random() * (max - min + 1)) + min;

        if (op === "sum") {
            /*             newDiv.before(newText);
                        newText.textContent = `ADDITION! What will be the result of the following problems?`; */
            return `${a} + ${b} = ?`;
        } else if (op === "subt") {
            if (a < b) [a, b] = [b, a];
            /*             newDiv.before(newText);
                        newText.textContent = `SUBTRACTION! What will be the result of the following problems?`; */
            return `${a} - ${b} = ?`;
        } else if (op === "mult") {
            /*             newDiv.before(newText);
                        newText.textContent = `MULTIPLICATION! What will be the result of the following problems?`; */
            return `${a} * ${b} = ?`;
        } else if (op === "div") {
            while (b === 0 || a % b !== 0) {
                a = Math.floor(Math.random() * (max - min + 1)) + min;
                b = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            /*  newDiv.before(newText);
             newText.textContent = `DIVIDING! What will be the result of the following problems?`; */
            return `${a} / ${b} = ?`;
        } else if (op === "comp") {
            /*    newDiv.before(newText);
               newText.textContent = `COMPARING! Which number are bigger ? Assign with >, <, or =`; */
            return `${a} ? ${b}`;
        }
    };

    if (operation === "mixed") {
        for (let i = 0; i < count; i++) {
            let randomOp = operations[Math.floor(Math.random() * operations.length)];
            let problemStr = generateProblem(randomOp);
            newArray.push(problemStr);
        }
    } else {
        for (let i = 0; i < count; i++) {
            let problemStr = generateProblem(operation);
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
