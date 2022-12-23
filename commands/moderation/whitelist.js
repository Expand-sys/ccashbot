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
      return message.reply("OI you need to specify your username you want to whitelist");
    } else {
      console.log(host);
      const rcon = new Rcon({
        host: `${host}`,
        port: `${process.env.RCONPASS}`,
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
