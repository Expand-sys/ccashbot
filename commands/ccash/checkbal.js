const { checkbal } = require("../../helpers/ccash");

module.exports = {
  name: "checkbal",
  description: "check your ccash balance",
  async execute(message, args) {
    let bal = await checkbal(message.author, args[0]);
    if (bal == -1) {
      message.reply("User not found fucko");
    } else {
      message.reply(bal.toString() + " piss points");
    }
  },
};
