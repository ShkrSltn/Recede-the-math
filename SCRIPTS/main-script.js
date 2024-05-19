const form = document.getElementById('myForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const count = document.getElementById('count').value;
    const type = document.getElementById('forType').value;

    if (min && max && count) {
        console.log('Min:', min);
        console.log('Max:', max);
        console.log('Count:', count);
        console.log('Type:', type);
    } else {
        alert('Please fill out all fields.');
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

    problemsBlock.style.display = 'block';
    container.innerHTML = "";
    let newArray = [];
    let newDiv = document.createElement("div");
    newDiv.className = 'results-div';
    container.appendChild(newDiv);
    let newUl = document.createElement("ul");
    newUl.className = 'list-ul';
    newDiv.appendChild(newUl);

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








