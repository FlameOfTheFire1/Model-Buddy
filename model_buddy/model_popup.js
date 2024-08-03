chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showPopup") {

        //fix this . . . do not hide and unhide this

        setTimeout(function() {
            controls.classList.add('hidden');
            popup.classList.add('visible');
            popup.classList.add('fade-out');

            setTimeout(function() {
                popup.classList.add('hidden');
                controls.classList.add('visible');
            }, 1000);
        }, 5000);
      
    }
  });