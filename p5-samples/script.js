const SIZE = 200;
const TEXT = "TEXT";

const textNormal = ($) => {
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.textSize(32);
        $.textAlign($.CENTER, $.CENTER);
        $.textStyle($.BOLD);
        $.text(TEXT, 100, 100);
    };
    $.draw = function () {};
};

const textColored = ($) => {
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.textSize(32);
        $.textStyle($.BOLD);

        $.textAlign($.CENTER, $.BOTTOM);
        $.fill(42, 42, 232, 255);
        $.text(TEXT, 100, 90);

        $.fill(42, 42, 232, 200);
        $.textAlign($.CENTER, $.CENTER);
        $.text(TEXT, 100, 100);

        $.fill(42, 42, 232, 100);
        $.textAlign($.CENTER, $.TOP);
        $.text(TEXT, 100, 110);
    };
    $.draw = function () {};
};

const textStroke = ($) => {
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.noFill();
        $.strokeJoin($.ROUND); // STROKE JOIN TYPES

        $.textSize(64);
        $.textAlign($.RIGHT, $.BOTTOM);
        $.stroke(232, 100, 120); // STROKE FILL
        $.strokeWeight(1);
        $.text(TEXT, 130, 90);

        $.textSize(48);
        $.textAlign($.LEFT, $.TOP); // ALIGN BASED ON X,Y
        $.textStyle($.BOLD);
        $.stroke(80, 232, 232);
        $.strokeWeight(1);
        $.text(TEXT, 70, 70);

        $.textSize(120);
        $.textAlign($.CENTER, $.TOP);
        $.textStyle($.BOLD);
        $.stroke(80, 120, 252);
        $.strokeWeight(1);
        $.text(TEXT, 90, 90);
    };
    $.draw = function () {};
};

const shapeArc = ($) => {
    $.setup = function () {
        //$.noFill();
        $.fill(0);
        $.createCanvas(SIZE, SIZE);

        $.strokeWeight(4);
        $.stroke($.color("mediumpurple"));
        $.arc(100, 100, 100, 100, 1.6 * $.PI, 0, $.PIE);

        $.strokeWeight(2);
        $.stroke($.color("hotpink"));
        $.arc(100, 100, 100, 100, 0.7 * $.PI, 1.485 * $.PI, $.CHORD);

        $.strokeWeight(6);
        $.stroke($.color("lightseagreen"));
        $.arc(100, 100, 100, 100, 0.1 * $.PI, 0.585 * $.PI);
    };
    $.draw = function () {};
};

const sineWave = ($) => {
    let y = 0;
    let yWave = 0;
    let angle = 0;
    let angleWave = 0;
    let angles = [];
    let angularV = 0.05; // angular velocity
    let step = 4;
    let amplitude = 50;
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        for (let i = 0; i < $.width + 1; i += step) {
            angles[i] = $.map(i, 0, $.width, -$.PI, $.PI);
        }
    };
    $.draw = function () {
        $.translate(SIZE / 2, SIZE / 2);
        $.background(255);
        $.noFill();

        $.strokeWeight(2);
        $.stroke($.color("lightskyblue"));
        $.beginShape();
        for (let i = 0; i < $.width; i += step) {
            yWave = $.sin(angles[i]) * amplitude;
            let x = $.map(i, 0, $.width, -$.width / 2, $.width / 2);
            $.vertex(x, yWave);
            angles[i] += angularV;
        }
        $.endShape();

        y = $.map($.sin(angle), -1, 1, -amplitude, amplitude);
        $.strokeWeight(16);
        $.stroke($.color("salmon"));
        $.point(0, y);

        $.noStroke();
        $.textSize(12);
        $.textAlign($.CENTER, $.CENTER);
        $.textStyle($.ITALIC);
        $.fill($.color("tomato"));
        $.text(`(0, ${$.map(y, -50, 50, -1, 1).toFixed(2)})`, 0, y - 20);

        angle += angularV;
    };
};

const pacMan = ($) => {
    let angle = 0;
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.angleMode($.DEGREES);
        $.stroke($.color("gold"));
    };
    $.draw = function () {
        $.background(255);
        $.strokeWeight(4);
        angle = Math.abs($.sin($.millis() / 5)) * 50;
        $.arc(100, 100, 100, 100, angle, 350 - angle, $.PIE);
        $.strokeWeight(8);
        $.point(100, 80);
    };
};

const circle = ($) => {
    let radius = 100;
    let r = 0,
        g = 0,
        b = 0;
    let k = 0;
    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.strokeWeight(4);
    };
    $.draw = function () {
        $.translate(100, 100);
        $.background(255);
        let t = $.sin($.millis() / 200);
        k += $.deltaTime;
        if (k > 800) {
            r = $.random(255);
            g = $.random(100, 200);
            b = $.random(100);
            $.stroke($.color(r, g, b));
            k = 0;
        }
        radius = $.map(t, -1, 1, 0, 100);
        $.circle(0, 0, radius);
    };
};

const rectangle = ($) => {
    let inc = 0;

    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.strokeWeight(2);
        $.stroke($.color("lightslategray"));
    };
    $.draw = function () {
        $.translate(100, 100);
        $.background(255);
        $.rectMode($.CENTER);
        $.rotate(inc);
        console.log($.mouseX);
        $.rect(0, 0, $.map($.mouseX, -200, 200, 0, 100), $.map($.mouseY, -200, 200, 0, 75));
        inc += 0.05;
    };
};

const triangleRadian = ($) => {
    let r = 50;
    let diff = (2 * $.PI) / 3;
    let angle = (2 * $.PI) / 3;

    $.setup = function () {
        $.createCanvas(SIZE, SIZE);
        $.noFill();
        $.strokeWeight(2);
        $.stroke($.color("slateblue"));
        $.translate(100, 100);
    };
    $.draw = function () {
        $.translate(100, 100);
        $.background(255);
        // $.circle(0,0,r*2);
        $.triangle(
            r * $.cos(angle),
            r * $.sin(angle),
            r * $.cos(angle + diff),
            r * $.sin(angle + diff),
            r * $.cos(angle + 2 * diff),
            r * $.sin(angle + 2 * diff)
        );
        angle += 0.05;
    };
};

const dots = ($) => {
    let radius = 5;
    let radii = [];
    let k = 0;
    $.setup = function () {
        $.noFill();
        $.createCanvas(SIZE, SIZE);
        $.strokeWeight(2);
        for (let i = 0; i < $.width + 1; i += 10) {
            radii[i] = $.map(i, 0, $.width, -$.PI, $.PI);
        }
    };
    $.draw = function () {
        $.translate(100, 100);
        $.background(255);
        for (let i = 0; i < 200; i += 5) {
            for (let j = 0; j < 200; j += 5) {
                //let t = $.sin(radii[i])*10;;
                //radius = $.map(t, -1, 1, 0, 100);
                if ($.mouseX < i + 5 && $.mouseX > i - 5 && $.mouseY < j + 5 && $.mouseY > j - 5) {
                    $.circle($.map(i, 0, 200, -200, 200), $.map(j, 0, 200, -200, 200), radius + 10);
                } else {
                    $.circle($.map(i, 0, 200, -200, 200), $.map(j, 0, 200, -200, 200), radius);
                }
                // radii[i] += 0.01;
            }
        }
    };
};

new p5(textNormal, "canvases");
new p5(textColored, "canvases");
new p5(textStroke, "canvases");
new p5(shapeArc, "canvases");
new p5(sineWave, "canvases");
new p5(pacMan, "canvases");
new p5(circle, "canvases");
new p5(triangleRadian, "canvases");
new p5(rectangle, "canvases");
// new p5(dots, 'canvases');

