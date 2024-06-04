activationButton = document.getElementById("activation");
cleanUpButton = document.getElementById("cleanUp");

chrome.runtime.sendMessage({action: "loadButtonStates"}, (response) => {
    if(response.status == "success"){
        activationButton.textContent = response.extensionState ? "Enable" : "Disable";
        cleanUpButton.textContent = response.cleanUpState ? "Don't Clean Up Send Files" : "Clean Up Sent Files";
        console.log("updating button states in action script");
    }
});

activationButton.addEventListener("click", function() {
    console.log("extension state button clicked.")
    chrome.runtime.sendMessage({action: "toggleExtensionState"}, (response) => {
        if (response.status == "success"){
            console.log("extension state change success");
            console.log(response.extensionState);
            activationButton.textContent = response.extensionState ? "Disable" : "Enable";
        }
    })
  });

cleanUpButton.addEventListener("click", function() {
    console.log("clean up button clicked.")
    chrome.runtime.sendMessage({action: "toggleCleanUp"}, (response) => {
        if (response.status == "success"){
            console.log("clean up state change success");
            console.log(response.cleanUpState);
            cleanUpButton.textContent = response.cleanUpState ? "Don't Clean Up Sent Files" : "Clean Up Sent Files";
        }
    })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showPopup") {
      document.getElementById("popup").style.display = "block";
      document.getElementById("controls").style.display = "none";
    }
    else if(request.action == "showControls"){
      document.getElementById("popup").style.display = "none";
      document.getElementById("controls").style.display = "block";
    }
  });