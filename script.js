let intervalIds = [];
let numbers = [];
let csvData = [];
const prizes = ['A', 'B', 'C', 'D', 'E', 'F'];

function loadCSVData() {
    fetch('data.csv')
        .then(response => response.text())
        .then(text => {
            const rows = text.trim().split('\n');
            csvData = rows.map(row => row.split(','));
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

function startRandomNumbers() {
    loadCSVData();
    resetNumbers();

    intervalIds = [
        setInterval(() => updateNumber(0), 100),
        setInterval(() => updateNumber(1), 100),
        setInterval(() => updateNumber(2), 100),
        setInterval(() => updateNumber(3), 100),
        setInterval(() => updateNumber(4), 100),
        setInterval(() => updateNumber(5), 100),
    ];
}

function stopRandomNumbers() {
    intervalIds.forEach(id => clearInterval(id));

    const tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    numbers.forEach((number, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = intervalIds[index];  // Número de div
        cell2.innerHTML = prizes[index];  // Premio correspondiente
    });
}

function resetNumbers() {
    numbers = [0, 0, 0, 0, 0, 0];
    const numberBoxes = document.querySelectorAll('.numberBox');
    numberBoxes.forEach((box, index) => {
        box.innerHTML = numbers[index];
    });
}

function updateNumber(index) {
    numbers[index] = Math.floor(Math.random() * csvData.length);
    document.querySelectorAll('.numberBox')[index].innerHTML = numbers[index];
}

document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
});
