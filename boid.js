// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
  constructor(sketch) {
    this.p = sketch;


    this.position = sketch.createVector(sketch.width / 2, sketch.height / 2);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(sketch.random(0.5, 7));
    this.acceleration = sketch.createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 2;
    this.r = 2;
  }

  edges() {
    if (this.position.x > this.p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.p.width;
    }
    if (this.position.y > this.p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.p.height;
    }
  }

  align(boids) {
    let perceptionRadius = 25;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = 24;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        if (d > 0) {
          diff.div(d * d);
        }
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids, alignSlider, cohesionSlider, separationSlider) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignSlider);
    cohesion.mult(cohesionSlider);
    separation.mult(separationSlider);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  render() {
    this.p.push();
    this.p.fill(127);
    this.p.stroke(200);
    let theta = this.velocity.heading() + this.p.radians(90);
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(theta);
    this.p.beginShape();
    this.p.vertex(0, -this.r * 2);
    this.p.vertex(-this.r, this.r * 2);
    this.p.vertex(this.r, this.r * 2);
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  }
}