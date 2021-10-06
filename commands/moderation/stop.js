const fs = require("fs");
const got = require("got");
const { Rcon } = require("rcon-client");

const { spawn } = require("child_process");
let minecraftin;
module.exports = {
  name: "stop",
  description: "stop mc server",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    const rcon = new Rcon({
      host: "mc.expand.gay",
      port: 25575,
      password: "6pnyf2DsCfHV67d3",
    });
    await rcon.connect();
    let res = await rcon.send(`/stop`);
    message.reply(`Server stopped Safely`);
  },
};

function spawnMC(channel) {
  let options = {
    detached: true,
    shell: true,
    cwd: "/home/harrison/Desktop/minecraft/",
  };
}
