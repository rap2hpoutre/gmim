const gmim = require("../index");

(async () => {
  console.log("ready?");
  await gmim(__dirname + "/test.png")
    .resize(320, 200)
    .flip()
    .magnify()
    .rotate("green", 45)
    .blur(7, 3)
    .swirl(200)
    .implode(-1.2)
    .stroke("#ff0000")
    .noise('laplacian')
    .drawCircle(10, 10, 20, 10)
    .fontSize(24)
    .drawText(30, 20, "LOOOOOOL !!")
    .write(__dirname + "/res.png");
  console.log("done!");
})();
