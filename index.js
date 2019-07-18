const Gmim = require("./src/Gmim");

function gmim(src, options) {
  return new Gmim(src, options);
}

module.exports = gmim;
