// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM




var _3 = function (sketch) {

  const flock = [];

  let doneLoading = false;



  sketch.setup = function () {

    let css_class = 'sketch-holder-3';

    //let w = Math.min(window.innerWidth, 1200);
    //let h = Math.floor(window.innerHeight * 0.8);

    let w = Math.min(window.innerWidth/1.5, 1000);
    let h = 500;

    //canvas = createCanvas(windowWidth-40, (windowWidth-40)/3);
    let canvas = sketch.createCanvas(w, h);
    //canvas.position(20, 50);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent(css_class);


    for (let i = 0; i < 100; i++) {
      flock.push(new Boid(sketch));
    }
    //p.noFill();
    doneLoading = true;

  };

  sketch.draw = function () {
    sketch.background(50);

    for (let boid of flock) {
      boid.edges();
      boid.flock(flock, 0, 0, 2);
      boid.update();
      boid.render();
    }
  };

};

var _2 = function (sketch) {

  const flock = [];

  let doneLoading = false;



  sketch.setup = function () {

    let css_class = 'sketch-holder-2';

    //let w = Math.min(window.innerWidth, 1200);
    //let h = Math.floor(window.innerHeight * 0.8);

    let w = Math.min(window.innerWidth/1.5, 1000);
    let h = 500;

    //canvas = createCanvas(windowWidth-40, (windowWidth-40)/3);
    let canvas = sketch.createCanvas(w, h);
    //canvas.position(20, 50);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent(css_class);


    for (let i = 0; i < 100; i++) {
      flock.push(new Boid(sketch));
    }
    //p.noFill();
    doneLoading = true;

  };

  sketch.draw = function () {
    sketch.background(50);

    for (let boid of flock) {
      boid.edges();
      boid.flock(flock, 0, 0.2, 0);
      boid.update();
      boid.render();
    }
  };

};


var _1 = function (sketch) {

  const flock = [];

  let doneLoading = false;



  sketch.setup = function () {

    let css_class = 'sketch-holder-1';

    //let w = Math.min(window.innerWidth, 1200);
    //let h = Math.floor(window.innerHeight * 0.8);

    let w = Math.min(window.innerWidth/1.5, 1000);
    let h = 500;

    //canvas = createCanvas(windowWidth-40, (windowWidth-40)/3);
    let canvas = sketch.createCanvas(w, h);
    //canvas.position(20, 50);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent(css_class);


    for (let i = 0; i < 100; i++) {
      flock.push(new Boid(sketch));
    }
    //p.noFill();
    doneLoading = true;

  };

  sketch.draw = function () {
    sketch.background(50);

    for (let boid of flock) {
      boid.edges();
      boid.flock(flock, 1.5, 0, 0.25);
      boid.update();
      boid.render();
    }
  };

};

var _4 = function (sketch) {

  const flock = [];

  let doneLoading = false;

  let lastState = false;

  let alignSlider, cohesionSlider, separationSlider;

  sketch.setup = function () {

    let css_class = 'sketch-holder-4';

    //let w = Math.min(window.innerWidth, 1200);
    //let h = Math.floor(window.innerHeight * 0.8);

    let w = Math.min(window.innerWidth/1.5, 1000);
    let h = 500;

    //canvas = createCanvas(windowWidth-40, (windowWidth-40)/3);
    let canvas = sketch.createCanvas(w, h);
    //canvas.position(20, 50);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent(css_class);

    //alignSlider = sketch.createSlider(0, 2, 1.5, 0.1);
    alignSlider = sketch.createSlider(0, 2, 0, 0.1);
    alignSliderTxt = sketch.createDiv('Alignment');


    //cohesionSlider = sketch.createSlider(0, 2, 1, 0.1);
    cohesionSlider = sketch.createSlider(0, 2, 0, 0.1);
    cohesionSliderTxt = sketch.createDiv('Cohesion');


    //separationSlider = sketch.createSlider(0, 2, 2, 0.1);
    separationSlider = sketch.createSlider(0, 2, 0, 0.1);
    separationSliderTxt = sketch.createDiv('Separation');

    let sepSlider = 20;

    const sliders = [alignSlider, cohesionSlider, separationSlider];

    for (index = 0; index < sliders.length; ++index) {
      sliders[index].position(20, (index * sepSlider) + 20);
      sliders[index].parent(css_class);
    }


    const slidersTxt = [alignSliderTxt, cohesionSliderTxt, separationSliderTxt];

    for (index = 0; index < slidersTxt.length; ++index) {
      slidersTxt[index].position(sliders[index].x * 2 + 2 + sliders[index].width, (index * sepSlider) + 20 - 5);
      slidersTxt[index].style("font-family", "monospace");
      slidersTxt[index].parent(css_class);
      slidersTxt[index].style("color", "#fff");

    }

    for (let i = 0; i < 100; i++) {
      flock.push(new Boid(sketch));
    }
    //p.noFill();
    doneLoading = true;
    lastState = false;

  };

  sketch.draw = function () {
    sketch.background(50);

    for (let boid of flock) {
      boid.edges();
      boid.flock(flock, alignSlider.value(), cohesionSlider.value(), separationSlider.value());
      boid.update();
      boid.render();
    }
  };

};

//var myp5 = new p5(s);

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  let isVisible = (elemTop >= -window.innerHeight * 0.5) && (elemBottom <= 1.5 * window.innerHeight);
  // Partially visible elements return true:
  //let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}
//myp5.noLoop();


function runAnimations(instances, css_classes) {


  document.onscroll = (e) => {

    for (let i = 0; i < instances.length; i++) {



      //console.log("scrolling");
      let canvas = document.getElementById(css_classes[i]);
      let visible = isScrolledIntoView(canvas);
      //console.log(css_classes[i] + " visible " + visible);

      //if (instance.last_state == false && instance.doneLoading) {

      if (!visible) {
        instances[i].noLoop();

      } else {
        instances[i].loop();

      }
    }
    // instance.last_state = visible;
    //}
  }

}






// // Cohesion only
var _2_css = 'sketch-holder-2';
var _2_sketch = new p5(_2, _2_css);




// // Separation only

var _3_css = 'sketch-holder-3';
var _3_sketch = new p5(_3, _3_css);

// // Alignment only
var _1_css = 'sketch-holder-1';
var _1_sketch = new p5(_1, _1_css);

// With sliders
var _4_css = 'sketch-holder-4';
var _4_sketch = new p5(_4, _4_css);



let css_classes = [_1_css, _2_css, _3_css, _4_css]
let instances = [_1_sketch, _2_sketch, _3_sketch, _4_sketch]

runAnimations(instances, css_classes)