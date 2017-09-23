const Discord = require("discord.js");
const client = new Discord.Client();

const commandPrefix = "/a ";
var settings = {
	regionalGroupingsChannelName: "regional-groupings"
};

client.on('ready', () => {
  	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content.startsWith(commandPrefix)) {
		const command = msg.content.replace(commandPrefix, "");
		switch (command) {
			case "help":
				msg.reply("Don't ask for help, ask for nudes!\n"
					+ "Here is a list of available commands:\n"
						+ commandPrefix + "set-regional-groupings-channel {channelname}\n"
						+ commandPrefix + "show-settings\n");
				break;
			case "show-settings":
				msg.reply("These are the current settings:\n" + JSON.stringify(settings));
				break;
			default:
				msg.reply("Sorry, never heard of the command '" + command + "'! If you're looking for available commands, try '" + commandPrefix + "help'");
		}
	}

	// Regional Groupings Channel
	if (msg.channel.name == settings.regionalGroupingsChannelName) {
		const euwRole = msg.guild.roles.find("name", "EUW");
		const naRole = msg.guild.roles.find("name", "NA");
		const euneRole = msg.guild.roles.find("name", "EUNE");
		var roles = [euwRole, naRole, euneRole];
		switch (msg.content.toUpperCase()) {
			case "EUW":
				removeRolesForMember(msg.member, roles);
				msg.reply("EUW > NA right? ; )").then(function (m) {
					setTimeout(function () {
						m.delete();
					}, 3000);
				});
				msg.member.addRole(euwRole);
				break;
			case "NA":
				removeRolesForMember(msg.member, roles);
				msg.reply("Pfft.. Come join euw already!").then(function (m) {
					setTimeout(function () {
						m.delete();
					}, 3000);
				});
				msg.member.addRole(naRole);
				break;
			case "EUNE":
				removeRolesForMember(msg.member, roles);
				msg.reply("Yes sir! PS Try out EUW sometime, much better :P (Only people like Liv play on that server)").then(function (m) {
					setTimeout(function () {
						m.delete();
					}, 3000);
				});
				msg.member.addRole(euneRole);
				break;
		}
	}
	msg.delete();
});

client.login('MzYxMTk1NDM3NDkyNzk3NDQw.DKglFA.KCD6yftIZ1MwlDXWOQjCZQJZB8Y');

function removeRolesForMember(member, roles) {
	for (var i = 0; i < roles.length; i++) {
		member.removeRole(roles[i]);
	}
}
