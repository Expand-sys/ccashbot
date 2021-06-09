const steamer = require('../../helpers/steamer.js')
const Discord = require('discord.js');
const appid = require('appid')
const request = require("request-promise-cache");
const fs = require("fs")
function getID(input){
  return new Promise (async (resolve, reject) => {
  let result = await appid(input)
  resolve(result)
  })
}



const api = "https://api.steampowered.com/ISteamApps/GetAppList/v0002/";
let options = {
    url: api,
    cacheKey: api,
    cacheTLL: 1000*60*60
};
function name_exact(name) {
  return new Promise((resolve, reject) => {
    request(options).then(data => {
      data = JSON.parse(data);
      resolve(data.applist.apps.filter(a => a.name === name)[0]);
    }).catch(e => reject(e));
  })
}
module.exports = {
	name: 'steam',
	description: 'steam getter!',
	async execute(message, args) {
    if(args[0] == 'game'){
      let input = "";
      for(i=1; i<args.length;i++){
        input += args[i]+' '
      }
      input = input.slice(0, input.length-1)
      console.log(input)
      let appID
      try{
        appID = await name_exact(input)
      } catch(error){
        console.log(error)
        message.reply('Couldnt find game')
      }
      if (!appID){
        message.reply('oi couldnt find game')
      }else {
        let game
        try{
          game = await steamer.game(appID.appid)
        } catch(error){
            console.log(error);
            message.reply('Couldnt find game')
        }

        console.log(game)

        if (game[appID.appid] == undefined){
          message.reply('ahhh fuck cant find shit with these eyes')
        }else{
          const embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Game: '+game[appID.appid].data.name)
          .setURL(game[appID.appid].data.website)
          .setDescription(game[appID.appid].data.short_description)
          .addFields(
            { name: 'Steam app ID', value: game[appID.appid].data.steam_appid },
          )
          .setTimestamp()
          .setFooter('heh nice');
          message.reply(embed)
        }
      }
    }

    if(args[0] == "ownedGames"){
      let steamID = args[1]
      if(args[1] = 'url'){
        let response = await steamer.getSteamID(args[2])
        steamID = response.response.steamid
      }

      if (!steamID) {
			     return res.status(500).send("SteamID parameter required.");
		  }
      let games
      try{
        games = await steamer.ownedGames(steamID)
      } catch(error){
        console.log(error)
      }
      if(games == null){
        message.reply("could not find player "+ args[1] )
      }else{
        message.reply(steamID+" Owns "+games.response.game_count+" games on steam")
      }

    }

    if(args[0] == "recentgames"){
      let steamID = args[1]
      if(args[1] = 'url'){
        let response = await steamer.getSteamID(args[2])
        steamID = response.response.steamid
      }
      if (!steamID) {
           return res.status(500).send("SteamID parameter required.");
      }
      let games
      try{
        games = await steamer.recentGames(steamID)
      } catch(error){
        console.log(error)
      }
      if (games.response.total_count == 0){
        message.reply('Sad bois, no games played in the last 2 weeks')
      }else{
        let gameslist = games.response.games
        let description = '';
        for(games in gameslist){
          description += gameslist[games].name+'\n'
        }
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(args[2]+'\'s recent games')
        .setDescription(description)
        .setTimestamp()
        .setFooter('heh nice');
        message.reply(embed)

      }
    }
    if (args[0] == 'user'){
      let steamID = args[1]
      if(args[1] = 'url'){
        let response = await steamer.getSteamID(args[2])
        steamID = response.response.steamid
      }
      if (!steamID) {
           return res.status(500).send("SteamID parameter required.");
      }
      let user
      try{
        user = await steamer.user(steamID)
      } catch(error){
        console.log(error)
      }
      console.log(user.response.players[0])
      player = user.response.players[0]
      let created = new Date(player.timecreated * 1000).toLocaleDateString('en-au')
      let online = new Date(player.lastlogoff * 1000).toLocaleDateString('en-au')
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(player.profileurl)
        .setURL(player.profileurl)
        .setAuthor(player.personaname)
        .setThumbnail(player.avatarfull)
        .addFields(
          { name: 'Date Created', value: created },
          { name: 'Last online', value: online}
        )
        .setTimestamp()
        .setFooter('heh made by expand#0001');
      message.reply(embed)
    }
    if(args[0] == 'gamenews'){
      let input = "";
      for(i=1; i<args.length;i++){
        input += args[i]+' '
      }
      input = input.slice(0, input.length-1)
      console.log(input)
      let appID
      try{
        appID = await name_exact(input)
      } catch(error){
        console.log(error)
        message.reply('Couldnt find game')
      }
      let news = await steamer.gameNews(appID.appid)
      console.log(news.appnews.newsitems[0])
      time = new Date(news.appnews.newsitems[0].date*1000).toLocaleDateString('en-au')
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(news.appnews.newsitems[0].title)
        .setURL(news.appnews.newsitems[0].url)
        .setTimestamp(time)
        .setFooter(news.appnews.newsitems[0].feedlabel);
      message.reply(embed)
    }

	},
};

//gameNews,
