const leet = require("../../helpers/leetspeak");



module.exports = {
	name: 'leet',
	description: 'leet speak translator',
	async execute(message, args) {
    var text = ''
    for(i in args){
      text += args[i]+' '
    }
    text = text.slice(0, text.length-1)
    console.log(text)
    let output = await leet.convertInput(text)
    message.reply(output)
	},
};
