var commands = {}
var state = {}

commands.help = function() {
	return 'I\'m working on it!';
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

commands.exit = function (args) {
	Terminal.exit();
	console.log('[Process completed]');
}

Terminal.init('screen', {
	commands: commands,
	prompt: '\\u@\\H $ ',
	intro: "<p>Welcome to Steven Collins' website.<br>Please take a look around, but there's not much to see yet.</p>"
});