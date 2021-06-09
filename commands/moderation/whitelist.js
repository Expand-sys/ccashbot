const fs = require("fs");
const got = require("got");

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

module.exports = {
  name: "whitelist",
  description: "Whitelist a user on the minecraft server",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    if (!args) {
      return message.reply("You need to type the user you want whitelisted");
    } else {
      let file = JSON.parse(fs.readFileSync("../whitelist.json"));
      let player = await got(
        "https://api.mojang.com/users/profiles/minecraft/" + args[0]
      );
      player = JSON.parse(player.body);
      player.id = player.id.splice(8, 0, "-");
      player.id = player.id.splice(13, 0, "-");
      player.id = player.id.splice(18, 0, "-");
      player.id = player.id.splice(23, 0, "-");
      let format = {
        uuid: player.id,
        name: player.name,
      };
      file.push(format);
      fs.writeFileSync("../whitelist.json", JSON.stringify(file));
      return message.reply("Whitelisted user: " + player.name);
    }
  },
};
