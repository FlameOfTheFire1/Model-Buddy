activationButton = document.getElementById("activation");
cleanUpButton = document.getElementById("cleanUp");

chrome.runtime.sendMessage({action: "loadButtonStates"}, (response) => {
    activationButton.textContent = response.isExtensionEnabled ? "Enable" : "Disable";
    cleanUpButton.textContent = response.isCleanUpEnabled ? "Clean Up Send Files" : "Don't Clean Up Sent Files";
    console.log("updating button states in action script");
});

activationButton.addEventListener("click", function() {
    console.log("extension state button clicked.")
    chrome.runtime.sendMessage({action: "toggleExtensionState"}, (response) => {
        if (response.status == "success"){
            activationButton.textContent = response.isExtensionEnabled ? "Disable" : "Enable";
        }
    })
  });

cleanUpButton.addEventListener("click", function() {
    console.log("clean up button clicked.")
    chrome.runtime.sendMessage({action: "toggleCleanUp"}, (response) => {
        if (response.status == "success"){
            cleanUpButton.textContent = response.isCleanUpEnabled ? "Don't Clean Up Sent Files" : "Clean Up Sent Files";
        }
    })
});