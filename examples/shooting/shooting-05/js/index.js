var currentRadius, currentAngle;
var orbitRadiusInput = document.querySelector('.debug-panel__orbit-radius');
var orbitAngleInput = document.querySelector('.debug-panel__orbit-angle');
var orbitAngleStartInput = document.querySelector('.debug-panel__orbit-angle-start');
var shootingStar = document.querySelector('.shooting-star');
var debug = document.querySelector('.debug');
var debugArc = document.querySelector('.debug__arc');

currentRadius = 65;
// currentRadius = parseInt(orbitRadiusInput.value, 10);
currentAngle = parseInt(orbitAngleInput.value, 10);
currentAngleStart = parseInt(orbitAngleStartInput.value, 10);

update();

// orbitRadiusInput.addEventListener('input', function (event) {
//     var value = parseInt(orbitRadiusInput.value, 10);
//     currentRadius = value;
//     update();
// });
orbitAngleInput.addEventListener('input', function (event) {
    var value = parseInt(orbitAngleInput.value, 10);
    currentAngle = value;
    update();
    clearInterval(intervalAutoChange);
});
orbitAngleStartInput.addEventListener('input', function (event) {
    var value = parseInt(orbitAngleStartInput.value, 10);
    currentAngleStart = value;
    update();
    clearInterval(intervalAutoChange);
});


let angleStart = currentAngleStart;
let angleEnd = currentAngle;
let direction = 1;
const intervalAutoChange = setInterval(() => {

    if(direction === 1) {
        if(angleStart < 90) {
            angleStart += 10;
        }else if(angleEnd < 270) {
            angleEnd += 10;
        }else {
            direction = 0;
        }
    }else {
        if(angleEnd > 180) {
            angleEnd -= 10;
        }else if(angleStart > 0) {
            angleStart -= 10;
        }else {
            direction = 1;
        }
    }


    currentAngleStart = angleStart;
    currentAngle = angleEnd;

    orbitAngleStartInput.value = angleStart;
    orbitAngleInput.value = angleEnd;
    update();
}, 250);


function update() {
    updateShootingStar({
        radius: currentRadius,
        angle: currentAngle,
        angleStart: currentAngleStart
    });
    debugArc.setAttribute("d", describeArc(0, 0, currentRadius, currentAngleStart, currentAngle));
}
function updateShootingStar(_a) {
    var angle = _a.angle, radius = _a.radius, angleStart = _a.angleStart;
    shootingStar.style.setProperty('--shooting-orbit-radius', radius + 'px');
    shootingStar.style.setProperty('--shooting-orbit-angle', angle + 'deg');
    shootingStar.style.setProperty('--shooting-orbit-angle-start', angleStart + 'deg');
    debug.style.setProperty('--shooting-orbit-radius-unitless', radius);
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
// Works for +360 and a total delta of -180
// via https://stackoverflow.com/questions/52056486/draw-reversed-circle-arc-changes-circle-center-coordinates
function describeArc(x, y, radius, startAngle, endAngle) {
    startAngle += 90;
    endAngle += 90;
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var sweepFlag = endAngle > startAngle ? 0 : 1;
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    if (endAngle - startAngle < -180) {
        largeArcFlag = "1";
    }
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
    ].join(" ");
    return d;
}