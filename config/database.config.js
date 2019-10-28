const { dbUser, dbPassword, dbLink } = require("./environments");

module.exports = {
  url: `mongodb://${dbUser}:${dbPassword}@${dbLink}`
};
