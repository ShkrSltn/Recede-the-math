function generateMultiplicationTable(rows, columns) {
    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= columns; j++) {
            row += (i * j) + '\t';
        }
        console.log(row);
    }
}

// Example usage:
generateMultiplicationTable(10, 10);