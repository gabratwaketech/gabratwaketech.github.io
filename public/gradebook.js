// Fetch data from the PostgreSQL database
function fetchGradeData() {
  // Function to query PostgreSQL db and return grade data
  console.log("Fetching grade data...");
  // Create new request for HTTP data
  let xhr = new XMLHttpRequest();
  // Local address for data
  let apiRoute = "/api/grades";
  // Run on state change
  xhr.onreadystatechange = function(){
	let results;
	// Check if done
	if(xhr.readyState === xhr.DONE){
	  // Check if successful
		if(xhr.status !== 200){
		  console.error(`Could not get grades.
			Status: ${xhr.status}`);
		}  
	    // call function to update HTML with data
		populateGradebook(JSON.parse(xhr.responseText));
		}
  }.bind(this);
  xhr.open("get", apiRoute, true);
  xhr.send();
}


// Populate the table with grade data
function populateGradebook(data) {

  // Function populates table with fetched grade data
  console.log("Populating gradebook with data:", data);
  let tableElm = document.getElementById("gradebook"); //Get gradebook table Element
    data.forEach(function(assignment){ // For each row of data passed in
	  let row = document.createElement('tr'); // First column's table data is the name
	  let columns = [];
	  columns.name = document.createElement('td'); // First column table data is the name
	  columns.name.appendChild(
	    // Cat full name: "last_name, first_name"
		document.createTextNode(assignment.last_name + ", " + assignment.first_name)
	  );
	  columns.grade = document.createElement('td'); // Second column table value is the grade
	  columns.grade.appendChild(
	    document.createTextNode(assignment.total_grade)
	  );
	  // Add table data columns to table row
	  row.appendChild(columns.name);
	  row.appendChild(columns.grade);
	  // Add the row to the table to make data visible
	  tableElm.appendChild(row);
	});
}
fetchGradeData();
