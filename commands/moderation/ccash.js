const fs = require("fs");
const got = require("got");

const { spawn } = require("child_process");
let minecraftin;
module.exports = {
  name: "ccash",
  description: "start mc server",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    let channel = message.guild.channels.cache.get(process.env.CCASHCHAN);
    spawnMC(channel);
  },
};

function spawnMC(channel) {
  let options = {
    shell: true,
    cwd: "/CCash/CCash/build",
  };
  let arguments = message.content.split("!ccash ");
  const ccash = spawn("./bank", [`${arguments[0]}`], options);
  ccash.stdout.on("data", (data) => {
    try {
      channel.send(`${data}`);
    } catch (err) {
      console.log(err);
    }
  });

  ccash.stderr.on("data", (data) => {
    try {
      channel.send(`${data}`);
    } catch (err) {
      console.log(err);
    }
  });

  ccash.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
