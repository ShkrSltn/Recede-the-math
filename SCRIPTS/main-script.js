
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


/* function sumOp(min, max, count) {
    let newArray = [];
    container.innerHTML = "";
    let newDiv = document.createElement("div");
    newDiv.className = 'results-div';
    container.appendChild(newDiv);
    let newUl = document.createElement("ul");
    newUl.className = 'list-ul';
    newDiv.appendChild(newUl);

    for (let i = 0; i < count; i++) {
        let a = Math.floor(Math.random() * (max - min + 1)) + min;
        let b = Math.floor(Math.random() * (max - min + 1)) + min;
        let result = a + b;
        let resultStr = `${a} + ${b} = ?`;
        newArray.push(resultStr);
        // newDiv.textContent = `${i + 1}) ${a} + ${b} = ?`; // Set text content
    }
    newArray.forEach((item) => {
        let newLi = document.createElement("li");
        newLi.textContent = item;
        newUl.appendChild(newLi);
    });
    return newArray;
} */

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

    if (operation == "sum") {
        for (let i = 0; i < count; i++) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            let b = Math.floor(Math.random() * (max - min + 1)) + min;
            let result = a + b;
            let resultStr = `${a} + ${b} = ?`;
            newArray.push(resultStr);
            // newDiv.textContent = `${i + 1}) ${a} + ${b} = ?`; // Set text content
        }
        newArray.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.textContent = item;
            newUl.appendChild(newLi);
        });
        return newArray;
    }
    if (operation == "subt") {
        for (let i = 0; i < count; i++) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            let b = Math.floor(Math.random() * (max - min + 1)) + min;
            if (a < b) {
                let temp = a;
                a = b;
                b = temp;
            }
            let result = a - b;
            let resultStr = `${a} - ${b} = ?`;
            newArray.push(resultStr);

        }
        newArray.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.textContent = item;
            newUl.appendChild(newLi);
        });
    }

    if (operation == "div") {
        for (let i = 0; i < count; i++) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            let b = Math.floor(Math.random() * (a - min + 1)) + min;

            let numb2 = Math.floor(a / b);
            let numb1 = numb2 * b;
            let resultStr = `${i + 1}) ${numb1} / ${numb2} = ?`;
            newArray.push(resultStr);
        }
        newArray.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.textContent = item;
            newUl.appendChild(newLi);
        });
    }


    if (operation == "mult") {
        for (let i = 0; i < count; i++) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            let b = Math.floor(Math.random() * (max - min + 1)) + min;
            let result = a * b;
            let resultStr = `${i + 1}) ${a} * ${b} = ?`;
            newArray.push(resultStr);
        }
        newArray.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.textContent = item;
            newUl.appendChild(newLi);
        });
    }

    if (operation == "comp") {
        for (let i = 0; i < count; i++) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            let b = Math.floor(Math.random() * (max - min + 1)) + min;
            let result = (a > b) ? a : (a < b) ? b : "==";
            let resultStr = `${i + 1}) ${a} ? ${b}`;
            newArray.push(resultStr);
        }
        newArray.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.textContent = item;
            newUl.appendChild(newLi);
        });
    }
};





// Compare --------------------------------------------------------------------------------------------




