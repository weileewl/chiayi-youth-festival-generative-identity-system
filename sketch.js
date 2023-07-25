//Chiayi Youth Festival 2023
//Generative Identity System
//Beta Version
//Wei Lee

//kinetic type algorithm reference:
//Type:Kinetic Type by Tim Rodenbroeker V1
//https://editor.p5js.org/DAI2020/sketches/uvJX1SM_J

//kinetic type variables
let font, fontZH;
let pg;
let tX,tY,sp,dspx,dspy,fct;

//glitch graphic variables
let canvasWidth = 1800;
let canvasHeight = 2400;
let col = 7;
let row = 70;
let gridWidth = canvasWidth / col;
let gridHeight = canvasHeight / row;
let img;
let images = [];
let currentImageIndex = 0;
let nextPictureButton, saveButton, reloadButton;
let microtest = [];
let information;

function preload() {
  //fonts
  font = loadFont("data/ABCWhyteInktrapEdu-Bold.otf");
  fontZH = loadFont("data/NotoSansTC-Bold.otf");

  //image 1
  images.push(loadImage('images/FountainCircle3.jpg'));
  //image 2
  images.push(loadImage('images/CentralPlaza11.jpg'));
  //image 3
  images.push(loadImage('images/ChengHuangTemple7.jpg'));
  //image 4
  images.push(loadImage('images/RailwayStation6.jpg'));
  //image 5
  images.push(loadImage('images/ArtMuseum6.jpg'));
  //image 6
  images.push(loadImage('images/TofuPudding3.jpg'));
  //image 7
  images.push(loadImage('images/OldPrison5.jpg'));
  //image 8
  images.push(loadImage('images/OldPrison7.jpg'));
  information = loadImage('images/information.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  createSliders();
  pg = createGraphics(width, height);
  graphics = createGraphics(width, height);
  img = images[currentImageIndex];
  imageMode(CENTER);
  graphics.noStroke();
  drawGlitchA();
  drawGlitchB();
  drawGlitchC();
  drawGlitchD();
  drawGlitchE();
  graphics.fill(0,0,0,10);
  graphics.rect(0, 0, width, height);
}

function draw() {
  // image ratio calculation
  let heightRatio = height / img.height;
  let newWidth = img.width * heightRatio;
  let newHeight = img.height * heightRatio;
  if (newWidth < width) {
    newWidth = width;
    newHeight = img.height * (width / img.width);
  }

  // PGraphics
  // currentImageIndex = 0;
  img = images[currentImageIndex];

  // if (img.width > img.height) {
  //   //horizontal image
  //   pg.image(img, -width/2, -400, newWidth, newHeight);
  //  } else {
  //   //vertical image
  //   pg.image(img, 0, -120, newWidth, newHeight);
  // } 

  // FountainCircle
  if (currentImageIndex == 0) {
    pg.image(img, -850, -475, newWidth, newHeight);
   }
  
  // CentralPlaza
  if (currentImageIndex == 1) {
    pg.image(img, 0, -500, newWidth, newHeight);
   }
  
  // ChengHuangTemple
  if (currentImageIndex == 2) {
    pg.image(img, -900, -225, newWidth, newHeight);
   }

  // RailwayStation
  if (currentImageIndex == 3) {
    pg.image(img, -900, -375, newWidth, newHeight);
   }

  // ArtMuseum
   if (currentImageIndex == 4) {
     pg.image(img, -925, -375, newWidth, newHeight);
    }
  
   // TofuPudding
   if (currentImageIndex == 5) {
     pg.image(img, -1300, -375, newWidth, newHeight);
   }

  // OldPrison
    if (currentImageIndex == 6) {
      pg.image(img, 0, -400, newWidth, newHeight); 
     }

  // OldPrison2
    if (currentImageIndex == 7) {
      pg.image(img, -900, -400, newWidth, newHeight); 
     }

  pg.image(graphics, 0, 0, width, height);

  if (random() < 0.05) {
    graphics.clear();
    graphics.fill(0,0,0,10);
    graphics.rect(0, 0, width, height);
    drawGlitchA();
    drawGlitchB();
    drawGlitchC();
    drawGlitchD();
    drawGlitchE();
    }

  pg.fill(237);

  pg.textFont(font);
  pg.textSize(120);

  pg.push();
  pg.translate(width/2, 0);
  pg.textAlign(CENTER, CENTER);

  // // fontEN

  // pg.text("Chiayi,", -345, 585);
  // pg.text("the City", 600, 930);
  // pg.text("Undefined", -510, 1680);

  // fontZH
  pg.textFont(fontZH);
  pg.textSize(420);

  pg.text("實", -150, 90);
  pg.text("驗", 150, 530);
  pg.text("新", -525, 875);
  pg.text("嘉", 525, 1150);
  pg.text("義", 0, 1575);

  pg.pop();

  //linetic type algorithm
  let tilesX = tX.value();
  let tilesY = tY.value();

  let tileW = int(width/tilesX);
  let tileH = int(height/tilesY);

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      
      // WARP
      let waveX = int(sin(frameCount * sp.value() + ( x * y ) * dspx.value()) * fct.value());
      let waveY = int(sin(frameCount * sp.value() + ( x * y ) * dspy.value()) * fct.value());

      if (dspx.value() === 0){
          waveX = 0;
      }

      if (dspy.value() === 0){
          waveY = 0;
      }
            
      // SOURCE
      let sx = x*tileW + waveX;
      let sy = y*tileH + waveY;
      let sw = tileW;
      let sh = tileH;

      // DESTINATION
      let dx = x*tileW;
      let dy = y*tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);

    }
  }

  noStroke();
  image(information, width/2, height/2, 1800, 2400);

}

// function createSliders(){
//   tX = createSlider(1, 80, 30, 1);
//   tX.position(20, height + 40);
//   createP('Tiles X').position(20, height);

//   tY = createSlider(1, 80, 22, 1);
//   tY.position(20, height + 100);
//   createP('Tiles Y').position(20, height+60);

//   sp = createSlider(0, 1, 0.05, 0.01);
//   sp.position(20, height + 160);
//   createP('Speed').position(20, height+120);

//   dspx = createSlider(0, 0.1, 0.03, 0.01);
//   dspx.position(180, height + 40);
//   createP('Displacement X').position(180, height);

//   dspy = createSlider(0, 0.2, 0, 0.01);
//   dspy.position(180, height + 100);
//   createP('Displacement Y').position(180, height+60);

//   fct = createSlider(0, 300, 80, 1);
//   fct.position(180, height + 160);
//   createP('Offset').position(180, height+120);

//   nextPictureButton = createButton("Change");
//   nextPictureButton.position(373, height + 44);
//   nextPictureButton.mousePressed(changeImage);
//   createP('Change Image').position(350, height);

//   saveButton = createButton("Save");
//   saveButton.position(514, height + 44);
//   saveButton.mousePressed(saveAsJpg);
//   createP('Save JPG').position(500, height);

//   createP('Chiayi Youth Festival 2023<br>Generative Identity System<br>Beta Version').position(370, height + 105);
// }

function createSliders(){
  tX = createSlider(1, 80, 40, 1);
  tX.position(20, height + 40);
  createP('Tiles X').position(20, height);

  tY = createSlider(1, 80, 22, 1);
  tY.position(20, height + 100);
  createP('Tiles Y').position(20, height+60);

  sp = createSlider(0, 1, 0.03, 0.01);
  sp.position(20, height + 160);
  createP('Speed').position(20, height+120);

  dspx = createSlider(0, 0.1, 0.05, 0.01);
  dspx.position(180, height + 40);
  createP('Displacement X').position(180, height);

  dspy = createSlider(0, 0.2, 0, 0.005);
  dspy.position(180, height + 100);
  createP('Displacement Y').position(180, height+60);

  fct = createSlider(0, 300, 25, 1);
  fct.position(180, height + 160);
  createP('Offset').position(180, height+120);

  nextPictureButton = createButton("Change");
  nextPictureButton.position(373, height + 44);
  nextPictureButton.mousePressed(changeImage);
  createP('Change Image').position(350, height);

  saveButton = createButton("Save");
  saveButton.position(514, height + 44);
  saveButton.mousePressed(saveAsJpg);
  createP('Save JPG').position(500, height);

  createP('Chiayi Youth Festival 2023<br>Generative Identity System<br>Beta Version').position(370, height + 105);
}

function changeImage() {
  if (currentImageIndex >= images.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  // drawGlitchA();
  // drawGlitchB();
  // drawGlitchC();
  // drawGlitchD();
  // drawGlitchE();
}

function saveAsJpg() {
  saveCanvas("myArtwork", "jpg");
}

function drawGlitchA() { // glitch square
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (random() < 0.3) {
        const x = i * gridWidth;
        const y = j * gridHeight;
        const pixelColor = img.get(x, y);
        const c = color(pixelColor);
        const r = red(c);
        const g = green(c);
        const b = blue(c);
        const a = alpha(c);
        graphics.fill(r, g, b, a);
        graphics.rect(x, y, gridWidth * random(-2.5, 2.5), gridHeight * random(-1.5, 1.5));
      }
     }
  }
}

function drawGlitchB() { // glitch square random high contrast color
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {    
      if (random() < 0.03) {
        const x = i * gridWidth;
        const y = j * gridHeight;
        let r = random() > 0.5 ? 255 : 0;
        let g = random() > 0.5 ? 255 : 0;
        let b = random() > 0.5 ? 255 : 0;
        graphics.fill(r, g, b, 255);
        graphics.rect(x, y, gridWidth * random(-1.5, 1.5), gridHeight * random(-1, 1));
        }
      }
    } 
  }

function drawGlitchC() { // mosaic glitch
  for (let i = 0; i < canvasWidth; i += gridHeight/2) {
    for (let j = 0; j < canvasHeight; j += gridHeight/2) {
          if (random() < 0.015) {
        const pixelColor = img.get(i, j);
        graphics.fill(pixelColor);  
        graphics.rect(i, j, Math.floor(random(9, 60)), Math.floor(random(9, 60)));
          }
        }
      } 
    }

  function drawGlitchD() { // glitch cubes
    for (let i = 0; i < canvasWidth; i += gridHeight) {
      for (let j = 0; j < canvasHeight; j += gridHeight) {
        if (random() < 0.008) {
          const pixelColor = img.get(i, j);
          graphics.fill(pixelColor);
          graphics.rect(i, j, random(30, 60), random(30, 40));
        }
      }
    }
  }

function drawGlitchE() { // mini dots pattern
  for (let i = 0; i < canvasWidth; i += gridHeight) {
    for (let j = 0; j < canvasHeight; j += gridHeight) {
          if (random() < 0.03) {
        const pixelColor = img.get(i, j);
        graphics.fill(pixelColor);  
        graphics.rect(i, j, 12, 12);
          }
        }
      } 
    }