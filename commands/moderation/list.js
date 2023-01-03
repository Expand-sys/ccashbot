const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");
const { spawn } = require("child_process");
const rconpass = process.env.RCONPASS;
const host = process.env.MCHOST;

module.exports = {
  name: "list",
  description: "check whos online",
  guildOnly: true,
  permissions: "SEND_MESSAGES",
  async execute(message, args) {
    if (args.length > 1) {
      return message.reply("fuck bro your confusing me with all them words");
    } else {
      console.log(host);
      const rcon = new Rcon({
        host: `${host}`,
        port: `${process.env.RCON_PORT}`,
        password: `${rconpass}`,
      });
      let connected = true
      let error
      try{
        await rcon.connect();
      } catch(e){
        console.log(e)
        connected = false
        error = e
      }
      let res = await rcon.send(`list`);

      message.reply(`${res}`);
      rcon.end();
    }
  },
};
