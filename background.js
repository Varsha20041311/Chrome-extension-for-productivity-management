// Listen for updates to any tab in Chrome
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab finished loading and the URL starts with "http"
  if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    // Create a record with the current tab URL and timestamp
    const record = {
      url: tab.url,
      timestamp: new Date().toISOString(),  // Current time in ISO format
    };

    // Store the record in local Chrome storage (for offline/local tracking)
    chrome.storage.local.get(["history"], (data) => {
      const history = data.history || [];  // Get existing history or initialize an empty array
      history.push(record);                // Add new record to history array
      chrome.storage.local.set({ history });  // Save updated history back to local storage
    });

    // Send the record to the backend server for permanent storage
    fetch("http://localhost:5002/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Specify JSON content type
      },
      body: JSON.stringify(record),         // Convert record object to JSON string
    })
      .then((res) => res.json())            // Parse JSON response from server
      .then((data) => {
        console.log("Sent to backend:", record);  // Log success
      })
      .catch((err) => {
        console.error("Error sending to backend:", err);  // Log any error
      });
  }
});
