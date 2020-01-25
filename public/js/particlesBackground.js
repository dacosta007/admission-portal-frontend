const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // dynamically set the numbers of particles to generate
  const particlesLength = Math.floor(window.innerWidth / 8);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background('#1b2685');
  particles.forEach((p, index) => {
    p.update();
    p.drawMethod();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    // @desc: position of the canvas particles
    this.pos = createVector(random(width), random(height));
    // @desc: velocity hence; how the particle is going to transition its move
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    // @desc: size of the canvas drawing
    this.size = 10;
  }

  // update movement with velocity
  update() {
    this.pos.add(this.velocity);
    this.edges();
  }

  // draw a single particle
  drawMethod() {
    noStroke();
    fill('rgba(255, 255, 255, 0.5)');
    // can choose any shape i.e rect
    circle(this.pos.x, this.pos.y, this.size);
  }

  // detects edges of the window
  edges() {
    // detect the sides
    if (this.pos.x < 0 || this.pos.x > width) {
      this.velocity.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.velocity.y *= -1;
    }
  }

  // connects all particles with line
  checkParticles(particles) {
    particles.forEach(particle => {
      // create a distant
      const distant = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      // if particle distance are less than 120, hence; should draw line
      if (distant < 120) {
        stroke('rgba(255, 255, 255, 0.5)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}