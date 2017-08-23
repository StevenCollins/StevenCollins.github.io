var commands = {};

commands.help = function() {
    return 'Welcome to my interactive resume! Use the following commands to get around. There are also a few surprises hidden...<br>' +
    '<ul>' +
    '<li><strong>open</strong> - Opens external items, such as a pdf copy of my <i>resume</i> or my <i>LinkedIn</i> profile</li>' +
    '<li><strong>link</strong> - Generates links to external items, if <i>open</i> is blocked</li>' +
    '</ul>' +
    'A few standard linux commands work about as expected, too. Try them out!';
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
    return 'test command please ignore';
}

commands.open = function (args) {
    var ret = '';
    if (args.length > 1) {
        var item = args[1].toLowerCase();
        if (item === 'resume') {
            window.open("./resources/Steven Collins' Resume.pdf");
            ret = 'Opening resume...';
        } else if (item === 'linkedin') {
            window.open('https://www.linkedin.com/in/steven-e-collins');
            ret = 'Opening LinkedIn profile...';
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
            ret = '<a href="./resources/Steven Collins\' Resume.pdf" target="_blank">Click here to open <i>resume</i></a>';
        } else if (item === 'linkedin') {
            ret = '<a href="https://www.linkedin.com/in/steven-e-collins" target="_blank">Click here to open <i>LinkedIn</i></a>';
        }
    } else {
        ret = "usage: link &lt;item&gt;<br>Examples of items which can be linked to are 'resume' and 'LinkedIn'<br>Items will open in a new tab";
    }
    return ret;
}

commands.exit = function (args) {
    Terminal.exit();
}

Terminal.init('screen', {
    commands: commands,
    prompt: '\\u@\\H $ ',
    intro: '<p>Welcome to the website of Steven Collins<br>Please use the terminal to explore</p>'
});