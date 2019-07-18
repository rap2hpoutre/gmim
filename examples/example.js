const gmim = require("../index");

(async () => {
  await gmim(__dirname + "/test.png").rawSize()
  console.log("ready?");
  await gmim(__dirname + "/test.png")
    .resize(320, 200)
    .flip()
    .magnify()
    .rotate("green", 45)
    .blur(7, 3)
    .swirl(200)
    .implode(-1.2)
    .write(__dirname + "/res.png");
  console.log("done!");
})();
