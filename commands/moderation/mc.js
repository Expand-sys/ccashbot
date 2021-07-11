const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");

module.exports = {
  name: "mc",
  description: "send a mc command",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    if (!args) {
      return message.reply("OI you need to specify the command you want");
    } else {
      const rcon = new Rcon({
        host: "twix.aosync.me",
        port: 25575,
        password: "6pnyf2DsCfHV67d3",
      });

      await rcon.connect();
      let content = message.content.split("!mc ");
      let res = await rcon.send(`${content[1]}`);

      message.reply(`Sent Command ${content}: ${res}`);
      rcon.end();
    }
  },
};