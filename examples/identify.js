const gmim = require("../index");

(async () => {
  const identity = await gmim(__dirname + "/test.png").identify();
  console.log(identity);
})();
