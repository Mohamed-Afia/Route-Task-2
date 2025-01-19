// Attach event listener to the Submit button
document.getElementById("submitBtn").addEventListener("click", function () {


    // 1. Select inputs and validation message element
    const siteNameField = document.getElementById("bookmarkName");
    const siteURLField = document.getElementById("bookmarkURL");
    const validationPopup = document.getElementById("validationPopup");

    // 2. Get input values
    const siteName = siteNameField.value.trim();
    const siteURL = siteURLField.value.trim();

    // 3. Define the URL validation regex
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;


    // 4. Perform validation
    const isSiteNameValid = siteName.length >= 3; // Site name must have at least 3 characters
    const isSiteURLValid = urlRegex.test(siteURL); // Site URL must match the regex

    // 5. Show or hide the validation popup based on validation results
    if (!isSiteNameValid || !isSiteURLValid) {
        validationPopup.classList.remove("d-none"); // Show popup
    }
    else {
        validationPopup.classList.add("d-none"); // Hide popup if valid

        // Add the data to the table if valid
        addRowToTable(siteName, siteURL);

        // Optionally clear the input fields after submission
        siteNameField.value = "";
        siteURLField.value = "";

    }




});





// Function to add a row to the table
function addRowToTable(siteName, siteURL) {
    // 1. Select the table body
    const tableContent = document.getElementById("tableContent");

    // 2. Determine the new index (row count + 1)
    const newRowIndex = tableContent.rows.length + 1;

    // 3. Create a new row
    const newRow = document.createElement("tr");

    // 4. Populate the row with data
    newRow.innerHTML = `
      <td>${newRowIndex}</td>
      <td>${siteName}</td>
      <td><a href="${siteURL}"  class="btn btn-primary btn-sm">Visit</a></td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button></td>
    `;

    // 5. Append the row to the table body
    tableContent.appendChild(newRow);

    saveBookmarks();

}

// Function to delete a row from the table
function deleteRow(button) {
    // Find the row containing the button and remove it
    const row = button.closest("tr");
    row.remove();

    // Re-index the remaining rows
    reindexTable();

    saveBookmarks();

}

// Function to reindex the table rows
function reindexTable() {
    const rows = document.querySelectorAll("#tableContent tr");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1; // Update the index column
    });
}



// Close button functionality for the popup
document.getElementById("closeBtn").addEventListener("click", function () {
    const validationPopup = document.getElementById("validationPopup");
    validationPopup.classList.add("d-none"); // Hide the popup

});


// Function to save the bookmarks to localStorage
function saveBookmarks() {
    const tableContent = document.getElementById("tableContent");
    const bookmarks = [];

    // Loop through each row in the table
    tableContent.querySelectorAll("tr").forEach(row => {
        const siteName = row.cells[1].textContent;
        const siteURL = row.cells[2].querySelector("a").href;
        bookmarks.push({ siteName, siteURL });
    });

    // Save the bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}


function loadBookmarks() {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    if (savedBookmarks && savedBookmarks.length > 0) {
        savedBookmarks.forEach(bookmark => {
            addRowToTable(bookmark.siteName, bookmark.siteURL);
        });
    }
}


loadBookmarks();