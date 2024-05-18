// Read files, error if missing or bad file
function fetchData(filename, callback) {
    fetch(filename)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text();
      })
      .then((data) => {
        callback(null, data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }
  
    // split data and put in arrays
    function parseData(data) {
        try {
        const lines = data.split("\n");
    
        const hours = [];
        const minutes = [];
        const programNames = [];
        const speakerNames = [];
    
        lines.forEach((line) => {
            const [time, program, speaker] = line.split("  ");
            const [hour, minute] = time.split(":");
            hours.push(hour);
            minutes.push(minute);
            programNames.push(program);
            speakerNames.push(speaker);
        });
    
        return { hours, minutes, programNames, speakerNames, error: null };
        } catch (error) {
        return { hours: [], minutes: [], programNames: [], speakerNames: [], error: "Error Reading Schedule File, Please Contact Website Administrator" };
        }
    }
  
  // Function to populate a table with schedule data
  function populateTable(
    scheduleBodyId,
    { hours, minutes, programNames, speakerNames, error }
  ) {
    const scheduleBody = document.getElementById(scheduleBodyId);
  
    scheduleBody.innerHTML = '';
  
    if (error) {
      // Display error message in the table
      const tableHead = document.getElementById("tableHead") 
      const errorRow = document.createElement("tr");
      const errorCell = document.createElement("td");
      tableHead.remove();
      errorCell.colSpan = 3;
      errorCell.textContent = error;
      errorRow.appendChild(errorCell);
      scheduleBody.appendChild(errorRow);
    } else {
      // no error, put data into html table
      for (let i = 0; i < hours.length; i++) {
        if (programNames[i] === "xx" || speakerNames === "xx") { // used to filter out the half hour row for programs that are 1 hour long
            continue;
        }
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        const programCell = document.createElement("td");
        const speakerCell = document.createElement("td");
  
        timeCell.textContent = hours[i] + ":" + minutes[i];
        programCell.textContent = programNames[i];
        speakerCell.textContent = speakerNames[i];
  
        row.appendChild(timeCell);
        row.appendChild(programCell);
        row.appendChild(speakerCell);
  
        scheduleBody.appendChild(row);
      }
    }
  }
  
  //make the 3 tables, TODO: stop being lazy and learn if you can use varibles here, array for filenames/html IDs? can you read the directory for .txt files and put their names in arrays? i literally know nothing.
  fetchData("schedule.txt", function (error, data) {
    const parsedData = parseData(data);
    populateTable("scheduleBody1", parsedData);
  });
  
  fetchData("scheduleSat.txt", function (error, data) {
    const parsedData = parseData(data);
    populateTable("scheduleBody2", parsedData);
  });
  
  fetchData("scheduleSun.txt", function (error, data) {
    const parsedData = parseData(data);
    populateTable("scheduleBody3", parsedData);
  });




