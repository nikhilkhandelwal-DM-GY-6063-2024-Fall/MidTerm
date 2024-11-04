let sunY;
let simbaStage = 0;
let stars = [];
let ripples = [];
let bgImage;

function preload() {
  bgImage = loadImage("background.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sunY = (height / 2) - 150;
  
  for (let i = 0; i < 100; i++) {  // Increase to 100 stars
    let star = {
      x: random(width),
      y: random(height / 4), // Limit stars to the top quarter of the canvas
      size: random(1, 3),
      brightness: random(150, 255)
    };
    stars.push(star);
  }
}

function draw() {
  // Display the background image
  background(bgImage); // Set the background to the image

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(star.brightness);
    ellipse(star.x, star.y, star.size);
    // Make stars twinkle by randomly adjusting brightness
    star.brightness += random(-5, 5);
    star.brightness = constrain(star.brightness, 150, 255);
  }

  // Draw and animate the sun rising
  drawSun();

  // Draw Simba's abstract growth stage based on `simbaStage`
  drawSimbaGrowth(simbaStage);

  // Draw ripple effects
  for (let i = ripples.length - 1; i >= 0; i--) {
    drawRipple(ripples[i]);
    if (ripples[i].alpha <= 0) {
      ripples.splice(i, 1); // Remove ripple when fully faded
    }
  }
}

// Draw the sun and make it rise from middle-left to top-left in a loop
function drawSun() {
  fill(255, 150, 0);
  noStroke();
  ellipse((width / 4) - 25, sunY, 100, 100);  // Position sun on the left (1/4 of the screen width)
  
  // Move the sun up until it reaches the top, then reset to middle
  if (sunY > 0) {
    sunY -= 0.2;
  } else {
    sunY = (height / 2) - 150; // Reset to middle for continuous rising loop
  }
}

// Draw Simba's growth stage based on the value of `simbaStage`
function drawSimbaGrowth(stage) {
  push();
  translate(width / 2, height - 150); // Position Simba near the bottom

  if (stage === 0) {
    fill(255, 204, 0);
    ellipse(0, 0, 50, 50); // Small circle for cub
  } else if (stage === 1) {
    fill(255, 170, 0);
    ellipse(0, 0, 70, 70); // Medium circle for young Simba
  } else if (stage === 2) {
    fill(255, 130, 0);
    ellipse(0, 0, 90, 90); // Large circle for adult Simba
  }

  pop();
}

// Draw a ripple effect and make it expand and fade
function drawRipple(ripple) {
  noFill();
  stroke(255, ripple.alpha);
  ellipse(ripple.x, ripple.y, ripple.radius * 2);
  ripple.radius += 1.5;  // Expand radius
  ripple.alpha -= 3;     // Fade out
}

// Mouse interaction to create ripple effects
function mousePressed() {
  let ripple = {
    x: mouseX,
    y: mouseY,
    radius: 10,
    alpha: 200
  };
  ripples.push(ripple);
}

// Keyboard interaction to change Simba's stage
function keyPressed() {
  if (key === '1') {
    simbaStage = 1;
  } else if (key === '2') {
    simbaStage = 2;
  } else {
    simbaStage = 0;  // Default to cub stage
  }
}
