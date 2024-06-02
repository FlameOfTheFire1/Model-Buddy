let isExtensionEnabled = true;
let isCleanUpEnabled = false;

//chrome.runtime.onInstalled.addListener(() => {
//    chrome.storage.local.set({extensionState: isExtensionEnabled});
//    chrome.storage.local.set({cleanUpState: isCleanUpEnabled});
//});

//function ensures needed values are in local storage
function initializeLocalStorage(){
    if (!(chrome.storage.local.get(["extensionState"]))){
        chrome.storage.local.set({extensionState: isExtensionEnabled});
    }
    
    if (!(chrome.storage.local.get(["cleanUpState"]))){
        chrome.storage.local.set({cleanUpState: isCleanUpEnabled});
    }
}
initializeLocalStorage();

chrome.runtime.onMessage.addListener((message, sendResponse) => {
    if (message.action === "toggleExtensionState"){
        isExtensionEnabled = !isExtensionEnabled;
        chrome.storage.local.set({extensionState: isExtensionEnabled});
        sendResponse({response: "successfully toggled extenstion state."});
    }
    else if (message.action === "toggleCleanUp"){
        isCleanUpEnabled = !isCleanUpEnabled;
        chrome.storage.local.set({cleanUpState: isCleanUpEnabled});
        sendResponse({response: "succsessfully toggled clean up state."});
    }
    else if (message.action == "loadButtonStates"){
        initializeLocalStorage();
        sendResponse({extensionState: chrome.storage.local.get(["extensionState"]), cleanUpState: chrome.storage.local.get(["cleanUpState"])});
    }  
});


chrome.downloads.onChanged.addListener((delta) => {
    if (delta.state && delta.state.current == 'complete') { //downloaded file is completed
        //get the download item associated with the delta object
        chrome.downloads.search({id: delta.id}, (results) => {
            if (results.length == 1){
                const itemExtension = results[0].filename.slice(downloadedItem.filename.lastIndexOf('.'))

                //single file case
                const modelExtensions = ['.3mf', '.obj', '.stl'];
                if (itemExtension in modelExtensions)
                    {
                        //prompt user for permission to send file to Model Scout app
                        //'3d printing model detected, send to Model Scout?'
                    }

                //zip file case
                if (itemExtension == '.zip')
                    {
                        //prompt user 'zip file may contain 3d model, send to Model Scout?'
                    }
            }
        })

    }
})

function sendToModelScout(file) {
    //to be implemented later - logic that sends the file to Model Scout App
}