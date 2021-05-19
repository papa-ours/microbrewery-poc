let capture;
let cans;
let showDetections = true;
let beerP;

const CONF_THRESHOLD = 0.7;

function setup() {

    beerP = createP('En attente');
    createCanvas(1170, 720);
    capture = createCapture(VIDEO);
    capture.size(1170, 720);
    capture.hide();
    cans = [];


    // let button = createButton('SHOW/HIDE');
    // button.mousePressed(changeShowDetections);

    let button2 = createButton('Quelle est ma biere?');
    button2.mousePressed(getRecognition);
}

function changeShowDetections() {
    showDetections = false;
}

function draw() {
    // capture.loadPixels();
    image(capture, 0, 0, width, height);
    if (showDetections) {
        getCanDetections();
        cans.forEach(showDetection);
    }
}

function showDetection(detection) {
    if (detection.confidence > CONF_THRESHOLD) {
        fill(211, 211, 30);
        noStroke();
        textSize(32);
        text(detection.class, detection.x1, detection.y1 - 15);

        noFill();
        stroke(211, 211, 30);
        strokeWeight(2);
        rect(detection.x1, detection.y1, detection.x2 - detection.x1, detection.y2 - detection.y1)
    }
}

async function getCanDetections() {
    capture.loadPixels();
    const imageUrl = capture.canvas.toDataURL();
    const data = {
        'image': imageUrl,
    };

    const response = await fetch(
        'http://localhost/api/can/detect',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
    );

    cans = await response.json();
}

async function getRecognition() {
    capture.loadPixels();
    const imageUrl = capture.canvas.toDataURL();
    const data = {
        'image': imageUrl,
    };

    const response = await fetch(
        'http://localhost/api/can/recognize',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
    );

    recognition = await response.json();
    beerP.html('La biere est ' + recognition.Name + '. Une biere de type ' + recognition.Type.toUpperCase() + '. Alcool: ' + recognition.Alcool);
}