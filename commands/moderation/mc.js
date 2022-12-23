const fs = require("fs");
const got = require("got");

const { Rcon } = require("rcon-client");
const { spawn } = require("child_process");

const rconpass = process.env.RCONPASS;
const host = process.env.MCHOST;

module.exports = {
  name: "mc",
  description: "send a Minecraft command",
  guildOnly: true,
  permissions: `${process.env.MCACCESS}`,
  async execute(message, args) {
    if (!args) {
      return message.reply("OI you need to specify the command you want");
    } else {
      console.log("host");
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
      

      let content = message.content.substring(message.content.indexOf(" ") + 1);
      console.log(content);
      let speech = content.split("say ");
      if (args[0] == "say") {
        speech = content.split("say ");
        speech[0] = `say ${message.author.username}: ${speech[1]} `;
      }
      if (connected ==  true){
        let res = await rcon.send(`${speech[0]}`);
        message.reply(`Sent Command ${content}: ${res}`);
        rcon.end();
      } else {
        message.reply(`${error}`)
      }
      
      
    }
  },
};
