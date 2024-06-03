let isExtensionEnabled = true;
let isCleanUpEnabled = false;
//Am I too dependent on these vars up here?, I keep updating them even after I pull vals
//from local storage

//chrome.runtime.onInstalled.addListener(() => { });

function getExtensionState(callback){
    chrome.storage.local.get('extensionState', (result) => {
        callback(result.extensionState);
    });
}
function getCleanUpState(callback){
    chrome.storage.local.get('cleanUpState', (result) => {
        callback(result.cleanUpState);
    });
}
function setExtensionState(value, callback){
    chrome.storage.local.set({extensionState: value}, callback);
}
function setCleanUpState(value, callback)
{
    chrome.storage.local.set({cleanUpState: value}, callback);
}

//function ensures needed values are in local storage
function initializeLocalStorage(){
    getCleanUpState((state) => {
        if(state === undefined)
        {
            setCleanUpState(isCleanUpEnabled, () => {
                console.log("clean up state initialized");
            });
        }
    });
    getExtensionState((state) => {
        if(state === undefined)
        {
            setExtensionState(isExtensionEnabled, () =>{
                console.log("extension state initialized");
            });
        }
    });

    //chrome.storage.local.get(['extensionState', 'cleanUpState'], function (result) {
    //    if(!result.extensionState)
    //    {
    //        chrome.storage.local.set({extensionState: isExtensionEnabled}, () => {
    //            console.log("extension state initialized");
    //        });
    //    }
    //    if(!result.cleanUpState)
    //    {
    //        chrome.storage.local.set({cleanUpState: isCleanUpEnabled}, () => {
    //            console.log("clean up state initialized");
    //        });
    //    }
    //});
}
initializeLocalStorage();


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleExtensionState"){
        console.log("hey");
        isExtensionEnabled = !isExtensionEnabled;
        setExtensionState(isExtensionEnabled, () => {
            getExtensionState((state) => {
                sendResponse({
                    response:"successfully toggled extension state.",
                    status: "success",
                    extensionState: state
                });
            });
        });
        return true;
    }
    else if (message.action === "toggleCleanUp"){
        console.log("Hi");
        isCleanUpEnabled = !isCleanUpEnabled;
        setCleanUpState(isCleanUpEnabled, () => {
            getCleanUpState((state) => {
                sendResponse({
                    response: "successfully toggled clean up state.", 
                    status: "success",
                    cleanUpState: state
                });
            });
        });
        return true;
    }
    else if (message.action == "loadButtonStates"){
        console.log("konnichiwa");
        initializeLocalStorage();
        getCleanUpState((state) => {
            getExtensionState((state2) => {
                sendResponse({ 
                    extensionState: state2.extensionState, 
                    cleanUpState: state.cleanUpState,
                    status: "success",
                    response: "Button states loaded"
                  });
            });
        });
        
        //chrome.storage.local.get(['ExtensionState', 'cleanUpState'], (result) => {
        //    sendResponse({ 
        //        extensionState: result.extensionState, 
         //       cleanUpState: result.cleanUpState,
         ///       status: "success"
         //     });
        //});
        return true;
    }  
    console.log("visited");
});

chrome.downloads.onChanged.addListener((delta) => {
    getExtensionState((state) => {
        if(state && delta.state && delta.state.current == 'complete') //extension enabled
            {
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
            });
            }
    });
    //if (delta.state && delta.state.current == 'complete') { //downloaded file is completed
        //get the download item associated with the delta object
        //chrome.downloads.search({id: delta.id}, (results) => {
        //    if (results.length == 1){
         //       const itemExtension = results[0].filename.slice(downloadedItem.filename.lastIndexOf('.'))

                //single file case
        //        const modelExtensions = ['.3mf', '.obj', '.stl'];
        //        if (itemExtension in modelExtensions)
        //            {
                        //prompt user for permission to send file to Model Scout app
                        //'3d printing model detected, send to Model Scout?'
        //            }

                //zip file case
        //        if (itemExtension == '.zip')
         //           {
                        //prompt user 'zip file may contain 3d model, send to Model Scout?'
        //            }
        //    }
        //})

    //}
});

function sendToModelScout(file) {
    //to be implemented later - logic that sends the file to Model Scout App
}