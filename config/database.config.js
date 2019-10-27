const { dbUser, dbPassword, dbLink } = require("./environments");

module.exports = {
  url: `mongodb+srv://${dbUser}:${dbPassword}@${dbLink}`
};
