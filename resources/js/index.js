//Hide "no-js" items, since JS is running
var itemsToHide = document.getElementsByClassName("no-js");
for(var i = 0; i < itemsToHide.length; i++){
    itemsToHide[i].style.display = "none";
}

//Initialize our terminal
Terminal.init('screen', {
    commands: commands,
    prompt: '\\u@\\H $ ',
    intro: '<p>Welcome to the website of Steven Collins</p><p>Please use the terminal to explore</p>'
});

//Load our service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

//Utility to handle delayed commands
var delayedCommand = function (url) {
    var uuid = createUUID();
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        var node = document.getElementById(uuid);
        node.innerHTML = text;
        node.removeAttribute('id');
    }).catch(function(error) {
        //We're probably offline
        console.log(error);
        var node = document.getElementById(uuid);
        node.innerHTML = 'An error occurred. You\'re probably offline.';
        node.removeAttribute('id');
    });
    return '<p id="' + uuid + '">Fetching response...</p>';
};

//Create UUIDs - https://gist.github.com/jed/982883
function createUUID(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,createUUID)}