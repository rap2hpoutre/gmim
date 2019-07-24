const { spawn } = require("child_process");
class Gmim {
  args = {
    in: [],
    src: "",
    out: []
  };
  options = {
    imageMagick: true
  };
  constructor(src, options) {
    this.args.src = src;
    this.options = { ...this.options, ...options };
  }
  out(a) {
    this.args.out = [...this.args.out, ...a];
    return this;
  }
  in(a) {
    this.args.in = [...this.args.in, ...a];
    return this;
  }
  write(output) {
    return new Promise(async (resolve, reject) => {
      const child = spawn(this.options.imageMagick ? "convert" : "gm convert", [
        ...this.args.in,
        this.args.src,
        ...this.args.out,
        output
      ]);
      child.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
      });
      child.stderr.on("data", data => {
        throw new Error(data);
      });
      child.on("close", code => {
        resolve();
      });
    });
  }
  identify(format = "%m %q %b %wx%h %k %[orientation]") {
    return new Promise(async (resolve, reject) => {
      const child = spawn(
        this.options.imageMagick ? "identify" : "gm identify",
        ["-format", format, this.args.src]
      );
      let result = "";
      child.stdout.on("data", data => {
        result = data;
      });
      child.stderr.on("data", data => {
        throw new Error(data);
      });
      child.on("close", () => {
        const [
          format,
          depth,
          filesize,
          size,
          colors,
          orientation
        ] = result.toString("utf8").split(" ");
        resolve({
          format: format && format.split(" ")[0],
          depth: depth && parseInt(depth, 10),
          filesize,
          size,
          colors: colors && parseInt(colors, 10),
          orientation
        });
      });
    });
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-authenticate
  authenticate(string) {
    return this.out(["-authenticate", string]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-average
  average() {
    return this.out(["-average"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-backdrop
  backdrop() {
    return this.out(["-backdrop"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-black-threshold
  blackThreshold(red, green, blue, opacity) {
    return this.out([
      "-black-threshold",
      [red, green, blue, opacity].filter(e => e !== undefined).join(",")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blue-primary
  bluePrimary(x, y) {
    return this.out([
      "-blue-primary",
      [x, y].filter(e => e !== undefined).join(",")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-border
  border(width, height) {
    return this.out(["-border", width + "x" + height]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-bordercolor
  borderColor(color) {
    return this.out(["-bordercolor", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-box
  box(color) {
    return this.out(["-box", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-channel
  channel(type) {
    return this.out(["-channel", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
  chop(w, h, x, y) {
    return this.in(["-chop", w + "x" + h + "+" + (x || 0) + "+" + (y || 0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-clip
  clip() {
    return this.out(["-clip"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-coalesce
  coalesce() {
    return this.out(["-coalesce"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  colorize(r, g, b) {
    return this.out(["-colorize", [r, g, b].join(",")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colormap
  colorMap(type) {
    return this.out(["-colormap", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-compose
  compose(operator) {
    return this.out(["-compose", operator]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
  compress(type) {
    return this.out(["-compress", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-kernel
  convolve(kernel) {
    return this.out(["-convolve", kernel]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-create-directories
  createDirectories() {
    return this.out(["-create-directories"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-deconstruct
  deconstruct() {
    return this.out(["-deconstruct"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-define
  define(value) {
    return this.out(["-define", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-delay
  delay(value) {
    return this.out(["-delay", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-displace
  displace(horizontalScale, verticalScale) {
    return this.out(["-displace", horizontalScale + "x" + verticalScale]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-display
  display(value) {
    return this.out(["-display", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dispose
  dispose(method) {
    return this.out(["-dispose", method]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dissolve
  dissolve(percent) {
    return this.out(["-dissolve", percent + "%"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-encoding
  encoding(type) {
    return this.out(["-encoding", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-endian
  endian(type) {
    return this.out(["-endian", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-file
  file(filename) {
    return this.out(["-file", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
  flatten() {
    return this.out(["-flatten"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-foreground
  foreground(color) {
    return this.out(["-foreground", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-frame
  frame(width, height, outerBevelWidth, innerBevelWidth) {
    if (arguments.length == 0) return this.out(["-frame"]);
    return this.out([
      "-frame",
      width + "x" + height + "+" + outerBevelWidth + "+" + innerBevelWidth
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fuzz
  fuzz(distance, percent) {
    return this.out(["-fuzz", distance + (percent ? "%" : "")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gaussian
  gaussian(radius, sigma) {
    return this.out([
      "-gaussian",
      [radius, sigma].filter(e => e !== undefined).join("x")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-geometry
  geometry(width, height, arg) {
    // If the first argument is a string, and there is only one argument, this is a custom geometry command.
    if (arguments.length == 1 && typeof arguments[0] === "string")
      return this.out(["-geometry", arguments[0]]);

    // Otherwise, return a resizing geometry command with an option alrgument.
    return this.out(["-geometry", width + "x" + height + (arg || "")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-green-primary
  greenPrimary(x, y) {
    return this.out(["-green-primary", x + "," + y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-highlight-color
  highlightColor(color) {
    return this.out(["-highlight-color", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-highlight-style
  highlightStyle(style) {
    return this.out(["-highlight-style", style]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-iconGeometry
  iconGeometry(geometry) {
    return this.out(["-iconGeometry", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-intent
  intent(type) {
    return this.out(["-intent", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-lat
  lat(width, height, offset, percent) {
    return this.out([
      "-lat",
      width + "x" + height + offset + (percent ? "%" : "")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-level
  level(blackPoint, gamma, whitePoint, percent) {
    return this.out([
      "-level",
      [blackPoint, gamma, whitePoint].filter(e => e !== undefined).join(",") +
        (percent ? "%" : "")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-list
  list(type) {
    return this.out(["-list", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-log
  log(string) {
    return this.out(["-log", string]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-loop
  loop(iterations) {
    return this.out(["-loop", iterations]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-map
  map(filename) {
    return this.out(["-map", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mask
  mask(filename) {
    return this.out(["-mask", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-matte
  matte() {
    return this.out(["-matte"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mattecolor
  matteColor(color) {
    return this.out(["-mattecolor", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-maximum-error
  maximumError(limit) {
    return this.out(["-maximum-error", limit]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mode
  mode(value) {
    return this.out(["-mode", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-monitor
  monitor() {
    return this.out(["-monitor"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-mosaic
  mosaic() {
    return this.out(["-mosaic"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-motion-blur
  motionBlur(radius, sigma, angle) {
    var arg = radius;
    if (typeof sigma != "undefined") arg += "x" + sigma;
    if (typeof angle != "undefined") arg += "+" + angle;
    return this.out(["-motion-blur", arg]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-name
  name() {
    return this.out(["-name"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noop
  noop() {
    return this.out(["-noop"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-normalize
  normalize() {
    return this.out(["-normalize"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-opaque
  opaque(color) {
    return this.out(["-opaque", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-operator
  operator(channel, operator, rvalue, percent) {
    return this.out([
      "-operator",
      channel,
      operator,
      rvalue + (percent ? "%" : "")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-ordered-dither
  orderedDither(channeltype, NxN) {
    return this.out(["-ordered-dither", channeltype, NxN]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-output-directory
  outputDirectory(directory) {
    return this.out(["-output-directory", directory]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-page
  page(width, height, arg) {
    return this.out(["-page", width + "x" + height + (arg || "")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pause
  pause(seconds) {
    return this.out(["-pause", seconds]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pen
  pen(color) {
    return this.out(["-pen", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-ping
  ping() {
    return this.out(["-ping"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-pointsize
  pointSize(value) {
    return this.out(["-pointsize", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-preview
  preview(type) {
    return this.out(["-preview", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-process
  process(command) {
    return this.out(["-process", command]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  profile(filename) {
    return this.out(["-profile", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-progress
  progress() {
    return this.out(["+progress"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-random-threshold
  randomThreshold(channeltype, LOWxHIGH) {
    return this.out(["-random-threshold", channeltype, LOWxHIGH]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-recolor
  recolor(matrix) {
    return this.out(["-recolor", matrix]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-red-primary
  redPrimary(x, y) {
    return this.out(["-red-primary", x, y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-remote
  remote() {
    return this.out(["-remote"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-render
  render() {
    return this.out(["-render"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-repage
  repage(width, height, xoff, yoff, arg) {
    if (arguments[0] === "+") return this.out(["+repage"]);
    return this.out([
      "-repage",
      width + "x" + height + "+" + xoff + "+" + yoff + (arg || "")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sample
  sample(geometry) {
    return this.out(["-sample", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sampling-factor
  samplingFactor(horizontalFactor, verticalFactor) {
    return this.out([
      "-sampling-factor",
      horizontalFactor + "x" + verticalFactor
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scene
  scene(value) {
    return this.out(["-scene", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scenes
  scenes(start, end) {
    return this.out(["-scenes", start + "-" + end]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-screen
  screen() {
    return this.out(["-screen"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-set
  set(attribute, value) {
    return this.out(["-set", attribute, value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-segment
  segment(clusterThreshold, smoothingThreshold) {
    return this.out(["-segment", clusterThreshold + "x" + smoothingThreshold]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shade
  shade(azimuth, elevation) {
    return this.out(["-shade", azimuth + "x" + elevation]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shadow
  shadow(radius, sigma) {
    return this.out([
      "-shadow",
      [radius, sigma].filter(e => e !== undefined).join("x")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shared-memory
  sharedMemory() {
    return this.out(["-shared-memory"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shave
  shave(width, height, percent) {
    return this.out(["-shave", width + "x" + height + (percent ? "%" : "")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-shear
  shear(xDegrees, yDegreees) {
    return this.out(["-shear", xDegrees + "x" + yDegreees]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-silent
  silent(color) {
    return this.out(["-silent"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-size
  rawSize(width, height, offset) {
    var off = "undefined" != typeof offset ? "+" + offset : "";
    return this.out(["-size", width + "x" + height + off]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-snaps
  snaps(value) {
    return this.out(["-snaps", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stegano
  stegano(offset) {
    return this.out(["-stegano", offset]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stereo
  stereo() {
    return this.out(["-stereo"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-text-font
  textFont(name) {
    return this.out(["-text-font", name]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-texture
  texture(filename) {
    return this.out(["-texture", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-threshold
  threshold(value, percent) {
    return this.out(["-threshold", value + (percent ? "%" : "")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-thumbnail
  thumbnail(w, h, options) {
    options = options || "";
    var geometry,
      wIsValid = Boolean(w || w === 0),
      hIsValid = Boolean(h || h === 0);

    if (wIsValid && hIsValid) {
      geometry = w + "x" + h + options;
    } else if (wIsValid) {
      // GraphicsMagick requires <width>x<options>, ImageMagick requires <width><options>
      geometry = this.options.imageMagick ? w + options : w + "x" + options;
    } else if (hIsValid) {
      geometry = "x" + h + options;
    } else {
      return this;
    }

    return this.out(["-thumbnail", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-tile
  tile(filename) {
    return this.out(["-tile", filename]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-title
  title(string) {
    return this.out(["-title", string]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-transform
  transform(color) {
    return this.out(["-transform", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-transparent
  transparent(color) {
    return this.out(["-transparent", color]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-treedepth
  treeDepth(value) {
    return this.out(["-treedepth", value]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-update
  update(seconds) {
    return this.out(["-update", seconds]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-units
  units(type) {
    return this.out(["-units", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-unsharp
  unsharp(radius, sigma, amount, threshold) {
    var arg = radius;
    if (typeof sigma != "undefined") arg += "x" + sigma;
    if (typeof amount != "undefined") arg += "+" + amount;
    if (typeof threshold != "undefined") arg += "+" + threshold;
    return this.out(["-unsharp", arg]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-use-pixmap
  usePixmap() {
    return this.out(["-use-pixmap"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-view
  view(string) {
    return this.out(["-view", string]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-virtual-pixel
  virtualPixel(method) {
    return this.out(["-virtual-pixel", method]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-visual
  visual(type) {
    return this.out(["-visual", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-watermark
  watermark(brightness, saturation) {
    return this.out(["-watermark", brightness + "x" + saturation]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-wave
  wave(amplitude, wavelength) {
    return this.out(["-wave", amplitude + "x" + wavelength]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-white-point
  whitePoint(x, y) {
    return this.out(["-white-point", x + "x" + y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-white-threshold
  whiteThreshold(red, green, blue, opacity) {
    return this.out([
      "-white-threshold",
      [red, green, blue, opacity].filter(e => e !== undefined).join(",")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-window
  window(id) {
    return this.out(["-window", id]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-window-group
  windowGroup() {
    return this.out(["-window-group"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strip (graphicsMagick >= 1.3.15)
  strip() {
    if (this.options.imageMagick) return this.out(["-strip"]);
    return this.noProfile().out("+comment"); //Equivalent to "-strip" for all versions of graphicsMagick
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace
  interlace(type) {
    return this.out(["-interlace", type || "None"]);
  }

  // force output format
  setFormat(format) {
    if (format) this._outputFormat = format;
    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
  resize(w, h, options) {
    options = options || "";
    var geometry,
      wIsValid = Boolean(w || w === 0),
      hIsValid = Boolean(h || h === 0);

    if (wIsValid && hIsValid) {
      geometry = w + "x" + h + options;
    } else if (wIsValid) {
      // GraphicsMagick requires <width>x<options>, ImageMagick requires <width><options>
      geometry = this.options.imageMagick ? w + options : w + "x" + options;
    } else if (hIsValid) {
      geometry = "x" + h + options;
    } else {
      return this;
    }

    return this.out(["-resize", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
  scale(w, h, options) {
    options = options || "";
    var geometry;
    if (w && h) {
      geometry = w + "x" + h + options;
    } else if (w && !h) {
      geometry = this.options.imageMagick ? w + options : w + "x" + options;
    } else if (!w && h) {
      geometry = "x" + h + options;
    }

    return this.out(["-scale", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-filter
  filter(val) {
    return this.out(["-filter", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-density
  density(w, h) {
    if (w && !h && this.options.imageMagick) {
      // GraphicsMagick requires <width>x<height>y, ImageMagick may take dpi<resolution>
      // recommended 300dpi for higher quality
      return this.in(["-density", w]);
    }
    return this.in(["-density", w + "x" + h]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  noProfile() {
    this.out(["+profile", '"*"']);
    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
  resample(w, h) {
    return this.out(["-resample", w + "x" + h]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
  rotate(color, deg) {
    return this.out(["-background", color, "-rotate", String(deg || 0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
  flip() {
    return this.out(["-flip"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
  flop() {
    return this.out(["-flop"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
  crop(w, h, x, y, percent) {
    if (this.args.src.match(/\.jpe?g$/i)) {
      // avoid error "geometry does not contain image (unable to crop image)" - gh-17
      var index = this._in.indexOf("-size");
      if (~index) {
        this._in.splice(index, 2);
      }
    }

    return this.out([
      "-crop",
      w + "x" + h + "+" + (x || 0) + "+" + (y || 0) + (percent ? "%" : "")
    ]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-magnify
  magnify(factor) {
    return this.in(["-magnify"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  minify() {
    return this.in(["-minify"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  quality(val) {
    return this.in(["-quality", val || 75]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  blur(radius, sigma) {
    return this.out(["-blur", radius + (sigma ? "x" + sigma : "")]);
  }

  // http://www.graphicsmagick.org/convert.html
  charcoal(factor) {
    return this.out(["-charcoal", factor || 2]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  modulate(b, s, h) {
    return this.out(["-modulate", [b, s, h].join(",")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
  // note: antialiasing is enabled by default
  antialias(disable) {
    return false === disable ? this.out(["+antialias"]) : this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  bitdepth(val) {
    return this.out(["-depth", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  colors(val) {
    return this.out(["-colors", val || 128]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
  colorspace(val) {
    return this.out(["-colorspace", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  // TODO

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
  contrast(mult) {
    var arg = (parseInt(mult, 10) || 0) > 0 ? "+contrast" : "-contrast";

    mult = Math.abs(mult) || 1;

    while (mult--) {
      this.out([arg]);
    }

    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
  cycle(amount) {
    return this.out(["-cycle", amount || 2]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  despeckle() {
    return this.out(["-despeckle"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
  // note: either colors() or monochrome() must be used for this
  // to take effect.
  dither(on) {
    var sign = false === on ? "+" : "-";

    return this.out([sign + "dither"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  monochrome() {
    return this.out(["-monochrome"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  edge(radius) {
    return this.out(["-edge", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  emboss(radius) {
    return this.out(["-emboss", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  enhance() {
    return this.out(["-enhance"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  equalize() {
    return this.out(["-equalize"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
  gamma(r, g, b) {
    return this.out(["-gamma", [r, g, b].join()]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  implode(factor) {
    return this.out(["-implode", factor || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  // TODO

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
  limit(type, val) {
    var limits = ["disk", "file", "map", "memory", "pixels", "threads"];
    type = type.toLowerCase();

    if (!~limits.indexOf(type)) {
      return this;
    }

    return this.out(["-limit", type, val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  median(radius) {
    return this.out(["-median", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-negate
  negative(grayscale) {
    var sign = grayscale ? "+" : "-";
    return this.out([sign + "negate"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
  noise(radius) {
    var noises = [
      "uniform",
      "gaussian",
      "multiplicative",
      "impulse",
      "laplacian",
      "poisson"
    ];
    radius = String(radius).toLowerCase();

    var sign = ~noises.indexOf(radius) ? "+" : "-";

    return this.out([sign + "noise", radius]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
  paint(radius) {
    return this.out(["-paint", radius]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  raise(w, h) {
    return this.out(["-raise", (w || 0) + "x" + (h || 0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  lower(w, h) {
    return this.out(["+raise", (w || 0) + "x" + (h || 0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-region
  region(w, h, x, y) {
    w = w || 0;
    h = h || 0;
    x = x || 0;
    y = y || 0;
    return this.out(["-region", w + "x" + h + "+" + x + "+" + y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
  roll(x, y) {
    x = ((x = parseInt(x, 10) || 0) >= 0 ? "+" : "") + x;
    y = ((y = parseInt(y, 10) || 0) >= 0 ? "+" : "") + y;
    return this.out(["-roll", x + y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
  sharpen(radius, sigma) {
    sigma = sigma ? "x" + sigma : "";

    return this.out(["-sharpen", radius + sigma]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
  solarize(factor) {
    return this.out(["-solarize", (factor || 1) + "%"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
  spread(amount) {
    return this.out(["-spread", amount || 5]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
  swirl(degrees) {
    return this.out(["-swirl", degrees || 180]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-type
  type(type) {
    return this.in(["-type", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-trim
  trim() {
    return this.out(["-trim"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-extent
  extent(w, h, options) {
    options = options || "";
    var geometry;
    if (w && h) {
      geometry = w + "x" + h + options;
    } else if (w && !h) {
      geometry = this.options.imageMagick ? w + options : w + "x" + options;
    } else if (!w && h) {
      geometry = "x" + h + options;
    }

    return this.out(["-extent", geometry]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity
  // Be sure to use gravity BEFORE extent
  gravity(type) {
    const types = [
      "NorthWest",
      "North",
      "NorthEast",
      "West",
      "Center",
      "East",
      "SouthWest",
      "South",
      "SouthEast"
    ];
    if (!type || !~gravity.types.indexOf(type)) {
      type = "NorthWest"; // Documented default.
    }

    return this.out(["-gravity", type]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
  flatten() {
    return this.out(["-flatten"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-background
  background(color) {
    return this.in(["-background", color]);
  }

  // DRAWINGS

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fill
  fill(color) {
    return this.out(["-fill", color || "none"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stroke
  stroke(color, width) {
    if (width) {
      this.strokeWidth(width);
    }

    return this.out(["-stroke", color || "none"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strokewidth
  strokeWidth(width) {
    return this.out(["-strokewidth", width]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-font
  font(font, size) {
    if (size) {
      this.fontSize(size);
    }

    return this.out(["-font", font]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  fontSize(size) {
    return this.out(["-pointsize", size]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  draw(args) {
    return this.out(["-draw", [].slice.call(arguments).join(" ")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawPoint(x, y) {
    return this.draw("point", x + "," + y);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawLine(x0, y0, x1, y1) {
    return this.draw("line", x0 + "," + y0, x1 + "," + y1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawRectangle(x0, y0, x1, y1, wc, hc) {
    var shape = "rectangle",
      lastarg;

    if ("undefined" !== typeof wc) {
      shape = "roundRectangle";

      if ("undefined" === typeof hc) {
        hc = wc;
      }

      lastarg = wc + "," + hc;
    }

    return this.draw(shape, x0 + "," + y0, x1 + "," + y1, lastarg);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawArc(x0, y0, x1, y1, a0, a1) {
    return this.draw("arc", x0 + "," + y0, x1 + "," + y1, a0 + "," + a1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawEllipse(x0, y0, rx, ry, a0, a1) {
    if (a0 == undefined) a0 = 0;
    if (a1 == undefined) a1 = 360;
    return this.draw("ellipse", x0 + "," + y0, rx + "," + ry, a0 + "," + a1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawCircle(x0, y0, x1, y1) {
    return this.draw("circle", x0 + "," + y0, x1 + "," + y1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawPolyline() {
    return this.draw("polyline", formatPoints(arguments));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawPolygon() {
    return this.draw("polygon", formatPoints(arguments));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawBezier() {
    return this.draw("bezier", formatPoints(arguments));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  drawText(x0, y0, text, gravity) {
    var gravity = String(gravity || "").toLowerCase(),
      arg = ["text " + x0 + "," + y0 + " " + escape(text)];

    const gravities = [
      "northwest",
      "north",
      "northeast",
      "west",
      "center",
      "east",
      "southwest",
      "south",
      "southeast"
    ];
    if (~gravities.indexOf(gravity)) {
      arg.unshift("gravity", gravity);
    }

    return this.draw.apply(this, arg);
  }
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  setDraw(prop, x, y, method) {
    prop = String(prop || "").toLowerCase();
    const drawProps = ["color", "matte"];
    if (!~drawProps.indexOf(prop)) {
      return this;
    }

    return this.draw(prop, x + "," + y, method);
  }
}

function formatPoints(points) {
  var len = points.length,
    result = [],
    i = 0;

  for (; i < len; ++i) {
    result.push(points[i].join(","));
  }

  return result;
}

function escape(arg) {
  return (
    '"' +
    String(arg)
      .trim()
      .replace(/"/g, '\\"') +
    '"'
  );
}

module.exports = Gmim;
