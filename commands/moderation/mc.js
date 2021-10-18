const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");
const { spawn } = require("child_process");

module.exports = {
  name: "mc",
  description: "send a Minecraft command",
  guildOnly: true,
  permissions: `${process.env.MCACCESS}`,
  async execute(message, args) {
    if (!args) {
      return message.reply("OI you need to specify the command you want");
    } else {
      const rcon = new Rcon({
        host: `${host}`,
        port: 25575,
        password: `${rconpass}`,
      });

      await rcon.connect();
      let content = message.content.substring(message.content.indexOf(" ") + 1);
      console.log(content);
      let speech = content.split("say ");
      if (args[0] == "say") {
        speech = content.split("say ");
        speech[0] = `say ${message.author.username}: ${speech[1]} `;
      }
      let res = await rcon.send(`${speech[0]}`);

      message.reply(`Sent Command ${content}: ${res}`);
      rcon.end();
    }
  },
};
