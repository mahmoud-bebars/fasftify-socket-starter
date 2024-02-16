const { error } = require("console");
const crypto = require("crypto");

const PASS_SECRET = process.env.PASS_SECRET;
const HAMC = process.env.HAMC;
const SALT = process.env.SALT;

module.exports.authentication = (password) => {
  return crypto
    .createHmac(HAMC, [SALT, password].join("/"))
    .update(PASS_SECRET)
    .digest("hex");
};

module.exports.compareHashs = (password, hash) => {
  const hashed = crypto
    .createHmac(HAMC, [SALT, password].join("/"))
    .update(PASS_SECRET)
    .digest("hex");

  if (hashed === hash) {
    return true;
  } else {
    return false;
  }
};

module.exports.testPassword = (password) => {
  let regex = /^[a-zA-Z0-9_-]+$/;
  let result = regex.test(password);
  if (!result) {
    return {
      error: true,
      message:
        "The password must only contain letters, numbers, dashes and underscores.",
    };
  }

  if (password.length < 6) {
    return {
      error: true,
      message: "The password must be at least 6 characters.",
    };
  }
  return true;
};
