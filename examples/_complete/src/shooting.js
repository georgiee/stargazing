import { polarToCartesian, createSVGElement } from './shared.js';

export function createShootingStars({debug = false} = {}) {
  const SHOOT_DELAY = 2000;
  const SIZE_STAR = 1;
  const shootingGroup = createSVGElement('g');

  const allShootingStars = [];

  let shootingStar

  shootingStar = createShootingStar({ x: 100, y: 100, radius: 100, angle: 45, debug, size: SIZE_STAR});
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  shootingStar = createShootingStar({ x: 350, y: 100, radius: 50, angleStart: 270, angle: 90, debug, size: SIZE_STAR});
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  shootingStar = createShootingStar({ x: 550, y: 750, radius: 600, angleStart: -90, angle: -150, debug, size: SIZE_STAR});
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  loopRandomShooting(allShootingStars, (star, previousStar) => {
    star.classList.add('is-shooting');

    if(previousStar) {
      previousStar.classList.remove('is-shooting');
    }
  }, SHOOT_DELAY, SHOOT_DELAY);

  return shootingGroup;
}

function createShootingStar({x, y, radius, angle, angleStart = 0, debug = false, size = 1}) {
  const shootingStarShape = createSVGElement('circle');
  shootingStarShape.classList.add('shooting-star__shape');

  const shootingStar = createSVGElement('g');
  shootingStar.classList.add('shooting-star');
  shootingStar.setAttribute('transform', `translate(${x} ${y})`);

  shootingStarShape.style.setProperty('--shooting-orbit-radius', radius + 'px');
  shootingStarShape.style.setProperty('--shooting-orbit-angle', angle + 'deg');
  shootingStarShape.style.setProperty('--shooting-orbit-angle-start', angleStart + 'deg');
  shootingStarShape.setAttribute('r', size);
  shootingStarShape.setAttribute('fill', 'white');

  if(debug) {
    debugShootingStar(shootingStar, radius, angleStart, angle);
  }

  shootingStar.appendChild(shootingStarShape);
  return shootingStar;
}


function loopRandomShooting(shootingStars, cb, timeout = 5000, maxTimeout = 5000) {
  let previousStar = null;

  const getNextStar = randomEntryGenerator(shootingStars);
  const shootDuration = 5000;
  let delayBetweenShoots = timeout;

  if(maxTimeout > timeout) {
    const dTime = maxTimeout - timeout;
    delayBetweenShoots = timeout + Math.random() * dTime;
  }

  function shootNext() {
    const star = getNextStar();
    cb(star, previousStar);
    previousStar = star;

    setTimeout(shootNext, delayBetweenShoots);
  }

  shootNext();
}




function randomEntryGenerator(list){
  let stars = [...list];
  let lastStar = null;

  return function nextStar(){
    const index = Math.round(Math.random() * (stars.length - 1));
    const star =  stars[index];

    if(star === lastStar) {
      // another try
      return nextStar();
    }

    lastStar = star;

    return star;
  }
}

function debugShootingStar(star, radius, angleStart, angle) {
  const debugOrbit = createSVGElement('circle');
  debugOrbit.setAttribute('r', radius.toString());
  debugOrbit.setAttribute('fill', `yellow`);
  debugOrbit.style.opacity = (0.3).toString();

  const markCenter = createSVGElement('circle');
  markCenter.setAttribute('r', 5);
  markCenter.setAttribute('fill', 'yellow');
    // create arc to visualize the travelling path

  const arc = createSVGElement('path');
  arc.setAttribute('fill', 'none');
  arc.setAttribute('stroke', 'red');
  arc.setAttribute('stroke-width', 'yellow');
  arc.classList.add('debug__arc');

  arc.setAttribute("d", describeArc(0, 0, radius, angleStart, angle));

  const starDebug = createSVGElement('g');
  starDebug.classList.add('shooting-star__debug');

  starDebug.appendChild(markCenter);
  starDebug.appendChild(debugOrbit);
  starDebug.appendChild(arc);

  star.appendChild(starDebug);
}

// Works for +360 and a total delta of -180
// via https://stackoverflow.com/questions/52056486/draw-reversed-circle-arc-changes-circle-center-coordinates
function describeArc(x, y, radius, startAngle, endAngle){
    startAngle+=90;
    endAngle+=90;

    var start = polarToCartesian(x, y, radius, endAngle );
    var end = polarToCartesian(x, y, radius, startAngle);

    var sweepFlag = endAngle > startAngle ? 0 : 1;
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    if(endAngle - startAngle < -180) {
      largeArcFlag = "1"
    }

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
    ].join(" ");

    return d;
}
