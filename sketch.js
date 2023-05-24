//CYF Poster Generator v2
//Wei Lee

//linetic type variables
let font, fontZH;
let pg;
let tX,tY,sp,dspx,dspy,fct;

//glitch graphic variables
let canvasWidth = 600;
let canvasHeight = 800;
let col = 7;
let row = 70;
let gridWidth = canvasWidth / col;
let gridHeight = canvasHeight / row;
let img;
let images = [];
let currentImageIndex = 0;
let nextPictureButton, saveButton, reloadButton;
let microtest = [];

function preload() {
  //fonts
  font = loadFont("data/ABCWhyteInktrapEdu-Bold.otf");
  fontZH = loadFont("data/NotoSansTC-Bold.otf");

  //images
  images.push(loadImage('images/CentralPlaza11.jpg'));
  images.push(loadImage('images/CentralPlaza12.jpg'));
  images.push(loadImage('images/CentralPlaza13.jpg'));
  images.push(loadImage('images/ChengHuangTemple1.jpg'));
  images.push(loadImage('images/ChengHuangTemple3.jpg'));
  images.push(loadImage('images/ChengHuangTemple7.jpg'));
  images.push(loadImage('images/ArtMuseum3.jpg'));
  images.push(loadImage('images/ArtMuseum4.jpg'));
  images.push(loadImage('images/ArtMuseum5.jpg'));
  images.push(loadImage('images/ArtMuseum6.jpg'));
  images.push(loadImage('images/VisionStation1.jpg'));
  images.push(loadImage('images/VisionStation4.jpg'));
  images.push(loadImage('images/VisionStation5.jpg'));
  images.push(loadImage('images/OldPrison1.jpg'));
  images.push(loadImage('images/OldPrison5.jpg'));
  images.push(loadImage('images/OldPrison7.jpg'));
  images.push(loadImage('images/TofuPudding1.jpg'));
  images.push(loadImage('images/TofuPudding2.jpg'));
  images.push(loadImage('images/FountainCircle3.jpg'));
  images.push(loadImage('images/FountainCircle4.jpg'));
  images.push(loadImage('images/FountainCircle5.jpg'));
  images.push(loadImage('images/FountainCircle7.jpg'));
  images.push(loadImage('images/Tower2.jpg'));
  images.push(loadImage('images/Tower3.jpg'));
  images.push(loadImage('images/Tower4.jpg'));
  images.push(loadImage('images/Tower5.jpg'));
  images.push(loadImage('images/Tower6.jpg'));
  images.push(loadImage('images/RailwayStation1.jpg'));
  images.push(loadImage('images/RailwayStation4.jpg'));
  images.push(loadImage('images/RailwayStation6.jpg'));
}

function setup() {
  createCanvas(600, 800);
  frameRate(60);
  createSliders();
  pg = createGraphics(600, 800);
  graphics = createGraphics(600, 800);
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
  img = images[currentImageIndex];
  pg.image(img, 0, 0, newWidth, newHeight);
  pg.image(graphics, 0, 0, width, height);


  // if (random() < 0.05) {
  //   let r = random() > 0.5 ? 255 : 0;
  //   let g = random() > 0.5 ? 255 : 0;
  //   let b = random() > 0.5 ? 255 : 0;
  //   pg.fill(r, g, b, 255);
  // }



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

  pg.fill(255);

  pg.textFont(font);
  pg.textSize(90);

  pg.push();
  pg.translate(width/2, 0);
  pg.textAlign(CENTER, CENTER);

  // fontEN
  pg.text("Chiayi,", 0, height / 2 - 180);
  pg.text("the", 0, height / 2 - 90);
  pg.text("City", 0, height / 2);
  pg.text("Undefined", 0, height / 2 + 90);

  pg.textSize(20);
  // pg.text("Chiayi Youth Festival 2023", 0, height - 170);
  pg.text("10.21 – 10.22", 0, height - 20);

  // fontZH
  pg.textFont(fontZH);
  pg.textSize(50);
  pg.text("實驗新嘉義", 0, 25);
  pg.text("第三屆", 0, height - 130);
  pg.text("有事青年節", 0, height - 70);

  // pg.textSize(20);
  // pg.text("中央實驗場．嘉城市集——中央廣場", 0, height - 130);
  // pg.text("文化廟口——嘉邑城隍廟", 0, height - 130);
  // pg.text("靈感沙龍——嘉義市立美術館．嘉義願景館．嘉義舊監獄．桃城豆花－光華店", 0, height - 130);

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
}

function createSliders(){
  tX = createSlider(1, 80, 30, 1);
  tX.position(20, height + 40);
  createP('Tiles X').position(20, height);

  tY = createSlider(1, 80, 16, 1);
  tY.position(20, height + 100);
  createP('Tiles Y').position(20, height+60);

  sp = createSlider(0, 1, 0.05, 0.01);
  sp.position(20, height + 160);
  createP('Speed').position(20, height+120);

  dspx = createSlider(0, 0.1, 0.05, 0.01);
  dspx.position(180, height + 40);
  createP('Displacement X').position(180, height);

  dspy = createSlider(0, 0.2, 0, 0.01);
  dspy.position(180, height + 100);
  createP('Displacement Y').position(180, height+60);

  fct = createSlider(0, 300, 10, 1);
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
  drawGlitchA();
  drawGlitchB();
  drawGlitchC();
  drawGlitchD();
  drawGlitchE();
}

function saveAsJpg() {
  saveCanvas("myArtwork", "jpg");
}

function drawGlitchA() { // glitch square
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (random() < 0.25) {
        const x = i * gridWidth;
        const y = j * gridHeight;
        const pixelColor = img.get(x, y);
        const c = color(pixelColor);
        const r = red(c);
        const g = green(c);
        const b = blue(c);
        const a = alpha(c);
        graphics.fill(r, g, b, a);
        graphics.rect(x, y, gridWidth * random(-3, 3), gridHeight * random(-2, 2));
      }
     }
  }
}

function drawGlitchB() { // glitch square random high contrast color
  // graphics.clear();
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {    
      if (random() < 0.085) {
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
  // graphics.clear();
  for (let i = 0; i < canvasWidth; i += gridHeight/2) {
    for (let j = 0; j < canvasHeight; j += gridHeight/2) {
          if (random() < 0.03) {
        const pixelColor = img.get(i, j);
        graphics.fill(pixelColor);  
        graphics.rect(i, j, Math.floor(random(3, 20)), Math.floor(random(3, 20)));

          }
        }
      } 
    }

  function drawGlitchD() { // glitch cubes
    // graphics.clear();
    for (let i = 0; i < canvasWidth; i += gridHeight) {
      for (let j = 0; j < canvasHeight; j += gridHeight) {
        if (random() < 0.015) {
          const pixelColor = img.get(i, j);
          graphics.fill(pixelColor);
          graphics.rect(i, j, random(10, 20), random(10, 20));
        }
      }
    }
  }


function drawGlitchE() { // mini dots pattern
  // graphics.clear();
  for (let i = 0; i < canvasWidth; i += gridHeight) {
    for (let j = 0; j < canvasHeight; j += gridHeight) {
          if (random() < 0.17) {
        const pixelColor = img.get(i, j);
        graphics.fill(pixelColor);  
        graphics.rect(i, j, 3, 3);
          }
        }
      } 
    }