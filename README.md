# gmim

> [WIP] Could be an alternative to (dying) [gm](https://github.com/aheckmann/gm). It tries to have the same API but modernized.

## Getting started

First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

    brew install imagemagick
    brew install graphicsmagick

If you want WebP support with ImageMagick, you must add the WebP option:

    brew install imagemagick --with-webp

then either use npm:

    npm install gmim

or yarn:

    yarn add gmim

## Basic Usage

```js
const gmim = require("gmim");

(async () => {
  await gmim("/test.png")
    .resize(320, 200)
    .flip()
    .magnify()
    .rotate("green", 45)
    .blur(7, 3)
    .swirl(200)
    .implode(-1.2)
    .stroke("#ff0000")
    .noise("laplacian")
    .drawCircle(10, 10, 20, 10)
    .fontSize(24)
    .drawText(30, 20, "LOOOOOOL !!")
    .write("/res.png");
})();
```

## Advanced usage

### Use `GraphicsMagick` instead of `ImageMagick`

```js
gmim("/test.png", { imageMagick: false })
  .flip()
  .write("/res.png")
  .then(() => {
    console.log("done!");
  });
```

### Get info

```js 
async function getInfo() {
  const identity = await gmim(__dirname + "/test.png").identify();
  return identity;
}
/*
{
  format: 'PNG',
  depth: 16,
  filesize: '343977B',
  size: '884x816',
  colors: 35156,
  // ...
}
*/
```

With custom format:
```js
async function getInfo() {
  return await gmim(__dirname + "/test.png").identify("%a %b %c");
}
```

### Using `in` and `out`

If `gmim` does not supply you with a method you need or does not work as you'd like, 
you can simply use `gmim().in()` or `gmim().out()` to set your own arguments.

## Todo

 - [ ] stream buffer
 - [ ] custom identify
