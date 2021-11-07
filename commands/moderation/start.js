const fs = require("fs");
const got = require("got");

const { spawn } = require("child_process");
let minecraftin;
module.exports = {
  name: "start",
  description: "start mc server",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    let channel = message.guild.channels.cache.get(process.env.CONSOLECHAN);
    spawnMC(channel);
  },
};

function spawnMC(channel) {
  let options = {
    shell: true,
    cwd: "/CCash/minecraft/",
  };
  const minecraft = spawn(
    "java",
    ["-Xmx24G", "-Xms1024M", "-jar", "server.jar", "-nogui"],
    options
  );
  minecraft.stdout.on("data", (data) => {
    try {
      channel.send(`${data}`);
    } catch (err) {
      console.log(err);
    }
  });

  minecraft.stderr.on("data", (data) => {
    try {
      channel.send(`${data}`);
    } catch (err) {
      console.log(err);
    }
  });

  minecraft.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
