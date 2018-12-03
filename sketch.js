/**
 * @name Frequency Spectrum
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */


var mic, fft;
var cnv;


var font,fontsize = 32;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function setup() {
   cnv = createCanvas(600,400);
   centerCanvas();

   noFill();

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
}

function windowResized() {
  centerCanvas();
}

function draw() {
   background(40,40,40);

   // --------------------- GRID ------------------

   var rms = mic.getLevel();
   rms=int(rms*100);

   text("RMS: " + rms, 250, 50);
   text("Georges Hart", 500, 375);
   stroke(250,250,0);
   var spectrum = fft.analyze();

   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
   }
   endShape();
}
