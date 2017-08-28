var commands = {};

commands.help = function() {
    return delayedCommand('help.html');
}

commands.echo = function (args) {
    args.shift();
    return args.join(' ');
}

commands.su = function (args) {
    if (args.length > 1) {
        Terminal.user = args[1];
    }
    return '';
}

commands.test = function () {
    return '<p>test command please ignore</p>';
}

commands.open = function (args) {
    var ret = '';
    if (args.length > 1) {
        var item = args[1].toLowerCase();
        if (item === 'resume') {
            window.open("/resources/files/Steven Collins' Resume.pdf");
            ret = 'Opening resume...';
        } else if (item === 'linkedin') {
            window.open('https://www.linkedin.com/in/steven-e-collins');
            ret = 'Opening LinkedIn profile...';
        } else {
            ret = '<i>' + item + '</i> not found';
        }
    } else {
        ret = "usage: open &lt;item&gt;<br>Examples of items to open are 'resume' and 'LinkedIn'<br>Items will open in a new tab";
    }
    return ret;
}

commands.link = function (args) {
    var ret = '';
    if (args.length > 1) {
        var item = args[1].toLowerCase();
        if (item === 'resume') {
            ret = '<a href="/resources/files/Steven Collins\' Resume.pdf" target="_blank">Click here to open <i>resume</i></a>';
        } else if (item === 'linkedin') {
            ret = '<a href="https://www.linkedin.com/in/steven-e-collins" target="_blank">Click here to open <i>LinkedIn</i></a>';
        } else {
            ret = '<i>' + item + '</i> not found';
        }
    } else {
        ret = "usage: link &lt;item&gt;<br>Examples of items which can be linked to are 'resume' and 'LinkedIn'<br>Items will open in a new tab";
    }
    return ret;
}

commands.ls = function () {
    return '<p>AboutMe.html' +
        '<br>Skills.html' +
        //'<br>Education.html' +
        //'<br>Experience.html' +
        //'<br>Projects.html' +
        //'<br>Associations.html' +
    '</p>';
}

commands.less = function (args) {
    return filePrinter(args);
}
commands.more = function (args) {
    return filePrinter(args);
}
commands.cat = function (args) {
    return filePrinter(args);
}
commands.view = function (args) {
    return filePrinter(args);
}
commands.tail = function (args) {
    return filePrinter(args);
}
function filePrinter(args) {
    var ret = '';
    if (args.length > 1) {
        ret = delayedCommand('/resources/info/' + args[1]);
    } else {
        ret = "usage: " + args[0] + " &lt;filename&gt;<br>Displays the contents of the specified file";
    }
    return ret;
}

commands.online = function () {
    return delayedCommand('online.html');
}

commands.exit = function (args) {
    Terminal.exit();
}

//Utility to handle delayed commands
var delayedCommand = function (url) {
    var uuid = createUUID();
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        var node = document.getElementById(uuid);
        if (text != '') {
            node.innerHTML = text;
        } else {
            node.innerHTML = 'error retrieving data';
        }
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