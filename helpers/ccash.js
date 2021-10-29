const db = require("quick.db");
const got = require("got");
api = process.env.CCASHAPIURL;
async function link(disc, userpass) {
  let verified = await got.post(process.env.CCASHAPIURL + "BankF/vpass", {
    json: {
      name: user,
      attempt: pass,
    },
    responseType: "json",
  });
  if (verified.body.value == 1) {
    console.log("verified");
    if (db.get("links", { discorduser: disc.id }).ccashuser != user) {
      db.delete("links", {
        discorduser: disc.id,
      });
      db.push("links", {
        discorduser: disc.id,
        ccashuser: user,
        attempt: pass,
      });
      return true;
    } else {
      db.push("links", {
        discorduser: disc.id,
        ccashuser: user,
        attempt: pass,
      });
    }
  }
  return false;
}
async function checkbal(disc, user) {
  if (user != undefined) {
    balance = await got(`${api}/user/balance`, {
      headers: {
        Accept: "application/json",
      },
      searchParams: {
        name: user,
      },
    });
    balance = parseInt(balance.body);
    return balance;
  } else {
    let usernm = db.get("links").filter((a) => a.discorduser == disc.id)[0]
      .ccashuser;
    console.log(usernm);
    balance = await got(`${api}/user/balance`, {
      headers: {
        Accept: "application/json",
      },
      searchParams: {
        name: usernm,
      },
    });
    balance = parseInt(balance.body);
    return balance;
  }

  console.log(balance);
}
module.exports = { link, checkbal };
