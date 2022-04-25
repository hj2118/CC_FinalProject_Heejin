// falling objects

let character;
let colorArray = [];
let jewelries = [];
let rocks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  character = new Human();
  colorArray = [color(0), color(255), color(255, 0, 0), color(0, 0, 255)];
  // slower --> faster
  // lower point --> higher point
}

function draw() {
  // background
  noStroke();
  fill(135, 206, 235);
  rect(0, 0, width, height - 100);
  fill(139, 69, 19);
  rect(0, height - 100, width, 100);

  // jewelries
  if (random(1) < 0.02) {
    jewelries.push(new Jewelry());
  }

  for (let each of jewelries) {
    each.update();
    each.display();
  }

  // rocks
  if (random(1) < 0.015) {
    rocks.push(new Rock());
  }

  for (let each of rocks) {
    each.update();
    each.display();
  }

  // game character
  character.display();
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      character.moveLeft();
    }

    else if (keyCode === RIGHT_ARROW) {
      character.moveRight();
    }
  }
}

class Human {
  constructor() {
    this.x = width / 2;
    this.y = height - 200;
    this.yvelocity = 0;
    this.gravity = 0.3;
  }

  moveRight() {
    if (this.x < width - 50) {
      this.x += 3;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 3;
    }
  }

  display() {
    fill(0);
    noStroke();
    rect(this.x, this.y, 50, 100);
  }
}

class Jewelry {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 20;
    this.colorIndex = int(random(0, 4));
    this.yvelocity = this.colorIndex + 2;
    this.touchGround = false;
    this.opacity = 100;
  }

  update() {
    this.y += this.yvelocity;
    if (this.y > height - 70) {
      this.touchGround = true;
      this.yvelocity = 0;
    }
  }

  display() {
    if (this.touchGround == false) {
      fill(colorArray[this.colorIndex]);
    }

    else if (this.touchGround == true) {
      while (this.opacity > 0) {
        this.opacity -= 10;
      }

      if (this.colorIndex == 0) {
        fill(0, this.opacity);

      }
      else if (this.colorIndex == 1) {
        fill(255, this.opacity);
      }
      else if (this.colorIndex == 2) {
        fill(255, 0, 0, this.opacity);
      }
      else {
        fill(0, 0, 255, this.opacity);
      }
    }

    noStroke();
    circle(this.x, this.y, 50);
  }
}

class Rock {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 20;
    this.velocity = 4;
    this.touchGround = false;
  }

  update() {
    this.y += this.velocity;
    if (this.y > height - 70) {
      this.touchGround = true;
      this.velocity = 0;
    }
  }

  display() {
    if (this.touchGround == false) {
      fill(127);
    }

    else {
      fill(127, 0);
    }

    noStroke();
    triangle(this.x, this.y, this.x - 20, this.y + 40, this.x + 20, this.y + 40);
  }
}
