const baseURL = "https://api.steampowered.com/"
const token = '6CF857296B7A47108E148C40164822B2'
var http = require("http");
const superagent = require("superagent")



async function createRequest(interfaceName, method, version) {
    let url = `${baseURL}/${interfaceName}/${method}/v${version}/?key=${token}&format=json`;
    return url;
}

async function ownedGames(steamID) {
  return new Promise((resolve, reject) => {
    let req = http.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${token}&steamid=${steamID}&format=json`, function(res){
      var body = ""
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        let json
        try{
          json = JSON.parse(body)
        } catch(error){
          console.log(error)
        }
        resolve(json);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  })
}
async function getSteamID(vanityUrl) {
  return new Promise((resolve, reject) => {
    let req = http.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${vanityUrl}&format=json`, function(res){
      var body = ""
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        let json
        try{
          json = JSON.parse(body)
        } catch(error){
          console.log(error)
        }
        resolve(json);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  })
}

async function recentGames(steamID) {
  return new Promise((resolve, reject) => {
    let req = http.get(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${token}&steamid=${steamID}&format=json`, function(res){
      var body = ""
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        let json
        try{
          json = JSON.parse(body)
        } catch(error){
          console.log(error)
        }
        resolve(json);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  })
}

async function user(steamID) {
  return new Promise((resolve, reject) => {
    let req = http.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steamID}`, function(res){
      var body = ""
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        let json
        try{
          json = JSON.parse(body)
        } catch(error){
          console.log(error)
        }
        resolve(json);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  })
}

async function gameNews(appID) {
  return new Promise((resolve, reject) => {
    let req = http.get(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appID}&count=1&maxlength=300&format=json`, function(res){
      var body = ""
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        let json
        try{
          json = JSON.parse(body)
        } catch(error){
          console.log(error)
        }
        resolve(json);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  })
}

async function game(appID) {
  return new Promise((resolve, reject) => {
    let req = http.request(`https://store.steampowered.com/api/appdetails?appids=${appID}`, function(res){
      var body = [];
      res.on('data', function(chunk) {
          body.push(chunk);
      });
      res.on('end', function() {
          try {
              body = JSON.parse(Buffer.concat(body).toString());
          } catch(e) {
              reject(e);
          }
          resolve(body);
      });
    });
    req.on('error', (e) => {
    reject(e.message);
    });
    // send the request
    req.end();
  })
}
module.exports = {
  getSteamID,
  game,
  gameNews,
  user,
  createRequest,
  ownedGames,
  recentGames,
}
