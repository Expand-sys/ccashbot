const { link } = require("../../helpers/ccash");

module.exports = {
  name: "link",
  description: "link your ccash account",
  async execute(message, args) {
    let result = await link(message.author, args[0], args[1]);
    console.log(result);
    if (result == true) {
      message.reply(
        "Linked your discord account to user " + args[0] + " successfully"
      );
    } else {
      message.reply("Could not verify your CCash user, please check spelling");
    }
  },
};
