const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");
const { spawn } = require("child_process");

module.exports = {
  name: "mc",
  description: "send a mc command",
  guildOnly: true,
  permissions: "SEND_MESSAGES",
  async execute(message, args) {
    if (!args) {
      return message.reply("OI you need to specify the command you want");
    } else {
      const rcon = new Rcon({
        host: "mc.expand.gay",
        port: 25575,
        password: "6pnyf2DsCfHV67d3",
      });

      await rcon.connect();
      let content = message.content.substring(message.content.indexOf(" ") + 1);
      console.log(content);
      let fuck = content.split("say ");
      if (args[0] == "say") {
        fuck = content.split("say ");
        fuck[1] = `say ${message.author.username}: ${fuck[1]} `;
      }
      console.log(fuck);
      let res = await rcon.send(`${fuck[0]}`);

      message.reply(`Sent Command ${content}: ${res}`);
      rcon.end();
    }
  },
};
