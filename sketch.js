let stars = [];
let groupA = [];
let groupB = [];
let FrameCount = 12;
let invert = 0;

function preload() {
  for (let i = 0; i < FrameCount; i++) {
    let num = nf(i + 1, 2);
    groupA[i] = loadImage("assets/a/a_" + num + ".PNG");
    groupB[i] = loadImage("assets/b/b_" + num + ".PNG");
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {

  clear();
  let target = keyIsDown(32) ? 1 : 0;

  invert += (target - invert) * 0.08;

  if (abs(target - invert) < 0.002) {
    invert = target;
  }
  let bg = 255 - invert * 255;

  document.getElementById("bg").style.background =
    "rgb(" + bg + "," + bg + "," + bg + ")";

  if (invert > 0.5 && random() < 0.06) {
    stars.push(
      new Star(
        random(width),
        random(height)
      )
    );
  }

  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    s.update();
    s.show();
    if (s.done) {
      stars.splice(i, 1);
    }
  }
}

class Star {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = random(140, 320);
    if (random(1) < 0.5) {
      this.frames = groupA;
    }
    else {
      this.frames = groupB;
    }
    this.birth = millis();
    this.currentFrame = 0;
    this.frameDuration = 60;
    this.done = false;
  }

  update() {
    let t = millis() - this.birth;
    this.currentFrame =
      floor(t / this.frameDuration);
    if (this.currentFrame >= FrameCount) {
      this.done = true;
    }
  }
  show() {
    imageMode(CENTER);
    let frameIndex =
      constrain(
        this.currentFrame,
        0,
        FrameCount - 1
      );
    let starImg =
      this.frames[frameIndex];
    image(
      starImg,
      this.pos.x,
      this.pos.y,
      this.size,
      this.size
    );
  }
}