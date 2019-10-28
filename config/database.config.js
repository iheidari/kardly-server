const { dbProtocol, dbUser, dbPassword, dbLink } = require("./environments");

module.exports = {
  url: `${dbProtocol}://${dbUser}:${dbPassword}@${dbLink}`
};
