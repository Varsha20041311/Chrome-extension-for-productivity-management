// Wait for the DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve stored history from Chrome local storage
  chrome.storage.local.get(["history"], (data) => {
    // Get the <ul> or <ol> element with id="history" to display the list
    const list = document.getElementById("history");

    // If no history exists, use an empty array
    const history = data.history || [];

    // Loop through each history record
    history.forEach((item) => {
      // Create a new list item element for each record
      const li = document.createElement("li");

      // Set the text content as "URL - Timestamp"
      li.textContent = `${item.url} - ${item.timestamp}`;

      // Append the list item to the history list
      list.appendChild(li);
    });
  });
});
