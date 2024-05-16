// Define arrays to store parsed values
const hours = [];
const minutes = [];
const programNames = [];
const speakerNames = [];

// Function to fetch data from a text file
function fetchData(callback) {
    fetch('schedule.txt')
    .then(response => response.text())
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Call fetchData and handle the data
fetchData(function(data) {
    // Split the file content into lines
    const lines = data.split('\n');
    
    // Loop through each line and extract values
    lines.forEach(line => {
        const [time, program, speaker] = line.split('  '); // Assuming 2 spaces between each value
        const [hour, minute] = time.split(':');
        hours.push(hour);
        minutes.push(minute);
        programNames.push(program);
        speakerNames.push(speaker);
    });

    // Get the table body element
    const scheduleBody = document.getElementById('scheduleBody');

    // Populate the table with the program schedule
    for (let i = 0; i < hours.length; i++) {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const programCell = document.createElement('td');
        const speakerCell = document.createElement('td');

        timeCell.textContent = hours[i] + ':' + minutes[i];
        programCell.textContent = programNames[i];
        speakerCell.textContent = speakerNames[i];

        row.appendChild(timeCell);
        row.appendChild(programCell);
        row.appendChild(speakerCell);

        scheduleBody.appendChild(row);
    }
});