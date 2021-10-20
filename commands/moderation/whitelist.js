const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");
const { spawn } = require("child_process");
const rconpass = process.env.RCONPASS;
const host = process.env.MCHOST;

module.exports = {
  name: "whitelist",
  description: "Whitelist yourself",
  guildOnly: true,
  permissions: "SEND_MESSAGES",
  async execute(message, args) {
    if (!args) {
      return message.reply("OI you need to specify the command you want");
    } else {
      console.log(host);
      const rcon = new Rcon({
        host: `${host}`,
        port: 25575,
        password: `${rconpass}`,
      });

      await rcon.connect();
      let content = message.content.split("!whitelist ")[1];
      console.log(content);
      let res = await rcon.send(`whitelist add ${content}`);

      message.reply(`whitelisted ${content}`);
      rcon.end();
    }
  },
};
