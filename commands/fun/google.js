const googleIt = require("google-it");
const Discord = require('discord.js');

module.exports = {
	name: 'google',
	description: 'Google shit or something',
	execute(message, args) {
    let query = ''
    for(i in args){
      query += args[i]+' '
    }
    console.log(query)

    googleIt({'limit': 1, 'query': query, 'disableConsole':'true'}).then(results => {
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(results[0].title)
        .setURL(results[0].link)
        .setDescription(results[0].snippet)
      message.reply(embed)
    }).catch(e => {
      // any possible errors that might have occurred (like no Internet connection)
    })
	},
};
