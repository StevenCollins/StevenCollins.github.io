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

commands.online = function () {
    return delayedCommand('online.html');
}

commands.exit = function (args) {
    Terminal.exit();
}