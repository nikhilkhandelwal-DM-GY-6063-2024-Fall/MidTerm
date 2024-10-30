let sunY;           // Sun's vertical position
let simbaSize;    
let stars = [];     // Array for stars

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sunY = height;  // Start the sun at the bottom
  simbaSize = 50; // Initial size for the "cub" state
  
  // Create stars
  for (let i = 0; i < 100; i++) {
    let starX = random(width);
    let starY = random(height / 2);  // Stars in upper half
    let starSize = random(2, 5);
    let brightness = random(100, 255);
    stars.push([starX, starY, starSize, brightness]); // [x, y, size, brightness]
  }
}

function draw() {
  background(0);
  
  drawSun();
  
  drawSimbaShape();
  
  drawStars();
}

// Function to draw the rising sun
function drawSun() {
  // Use a gradient color for the sun
  fill(lerpColor(color(255, 204, 0), color(255, 165, 0), (height - sunY) / height));
  noStroke();
  ellipse(width / 2, sunY, 100);
  
  // Logic to make the sun rise (simplified)
  if (sunY > height / 2) {
    sunY -= 0.5;  // Move the sun upwards gradually
  }
}

// Function to draw Simba's abstract shape
function drawSimbaShape() {
  fill(255, 223, 186); // Initial color for cub state
  noStroke();
  ellipse(width / 2, height / 2, simbaSize); // Draw at the center
}

// Function to draw stars
function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(star[3]);  // Use the brightness value
    noStroke();
    ellipse(star[0], star[1], star[2]); // Draw star at (x, y)
  }
}

// Placeholder for mouse interaction (ripple effect)
function mousePressed() {
  // - Add a new circle to an array
  // - Animate the circles by increasing their size in draw()
  // - Fade out the circles over time
}

// Function to handle keyboard input for changing Simba's size
function keyPressed() {
  if (key === '1') {
    simbaSize = 50; // Cub state
  } else if (key === '2') {
    simbaSize = 100; // Adolescent state
  } else if (key === '3') {
    simbaSize = 150; // Adult state
}
