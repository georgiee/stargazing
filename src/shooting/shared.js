export function createSVGElement(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag)
}


export function indicesToPoint(indices, sourceList) {
  return indices.map(index => sourceList[index]);
}

export function generateLinePath(...points) {
  const [startPoint, ...segmentPoints] = points;
  const lineSegments = segmentPoints.map(({x, y}) => `L ${x} ${y}`);
  const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`, ...lineSegments
  ];
  return pathParts.join(' ');
}

export function createText({point, text, size = 10, offset = {x: 0, y: 0}}) {

  const textElement = createSVGElement('text');
  textElement.appendChild(document.createTextNode(text));
  textElement.setAttribute('fill', 'yellow');
  textElement.setAttribute('dx', point.x + offset.x);
  textElement.setAttribute('dy', point.y + offset.y);
  textElement.setAttribute('font-size', size);

  return textElement;
}

export function createDot({x, y, size = 5}) {
  const group = createSVGElement('g');
  const dot = createSVGElement('circle');
  dot.setAttribute('r', size);
  dot.setAttribute('fill', 'white');
  // dot.classList.add('twinkle-little-star');
  group.appendChild(dot);
  group.setAttribute('transform', `translate(${x} ${y})`);

  return group;
}

export function createLine(line, index) {
  const path = createSVGElement('path');
  path.setAttribute('d', generateLinePath(...line));
  path.setAttribute('stroke', 'red');
  path.setAttribute('fill', 'none');
  path.style.setProperty('--path-length', path.getTotalLength());
  path.style.setProperty('--path-index', index);
  path.classList.add('constellation-path');

  return path;
}


export function createSky({count, sizeStar = 1}) {
  const skyGroup = createSVGElement('g');

  for (let i = 0; i < count; i++) {
    const coordinates = getRandomCoordinate() /*{x,y}*/;
    const color = getRandomColor();
    const star = createStar({color, size: sizeStar, ...coordinates, index: i});
    skyGroup.appendChild(star);
  }

  return skyGroup;
}


export function createStar({size, color, x, y, index}) {
  const delay = Math.round(-1 * Math.random() * 4000);

  const starShape = createSVGElement('circle');
  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);

  starShape.classList.add('twinkle-little-star');
  starShape.style.setProperty('--animation-twinkle-delay', delay + 'ms');

  const star = createSVGElement('g');
  star.setAttribute('transform', `translate(${x} ${y})`);


  const parallaxGroup = createSVGElement('g');
  parallaxGroup.appendChild(starShape)
  star.appendChild(parallaxGroup);
  parallaxGroup.classList.add('parallax-effect');
  parallaxGroup.style.setProperty('--star-parallax-depth', index % 5 + 1);

  return star;
}


export function getRandomCoordinate(centered = false) {

  if (centered) {
    return getRandomPosition({
      width: 960,
      height: 700,
      padding: 10,
      offsetX: -480,
      offsetY: -350
    });
  }

  return getRandomPosition({
    width: 960,
    height: 700,
    padding: 10,
    offsetX: 0,
    offsetY: 0
  });
}

export function getRandomPosition({width, height, offsetX = 0, offsetY = 0, padding = 0}) {
  const startX = offsetX + padding;
  const startY = offsetY + padding;
  const maxWidth = width - padding * 2;
  const maxHeight = height - padding * 2;

  return {
    x: startX + maxWidth * Math.random(),
    y: startY + maxHeight * Math.random()
  }
}

export function getRandomColor() {
  const availableColors = ['#B5CDFF', '#FFE4CE', '#FF6C00'];

  const index = Math.round(Math.random() * (availableColors.length - 1));
  return availableColors[index];
}

export function indicesToPoints(indices, source) {
  return indices.map(indexList => (
    indexList.map(index => source[index])
  ))
}

// we need to start and stop iframes emnbed as a background manually
// otherwise we risk to run three instance (2xpreview, 1x live)
// with pull downs fps dramatically dependent of the content.

export function createIframeRunner({play, stop}) {
  console.log('createIframeRunner')
  const noop = () => {
  };

  const playFn = play || noop;
  const stopFn = stop || noop;


  let started = false
  window.addEventListener('message', ({data}) => {
    switch (data) {
      case 'slide:stop':
        if (!started) {
          return
        }
        started = false
        stopFn();
        break;
      case 'slide:start':
        if (started) {
          return
        }
        started = true
        playFn();
        break;
    }
  });
}

export function createShootingStars({debug = false} = {}) {
  const SHOOT_DELAY = 2000;
  const SIZE_STAR = 1;
  const shootingGroup = createSVGElement('g');

  const allShootingStars = [];

  let shootingStar

  shootingStar = createShootingStar({x: 100, y: 100, radius: 100, angle: 45, debug, size: SIZE_STAR});
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  shootingStar = createShootingStar({x: 350, y: 100, radius: 50, angleStart: 270, angle: 90, debug, size: SIZE_STAR});
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  shootingStar = createShootingStar({
    x: 550,
    y: 750,
    radius: 600,
    angleStart: -90,
    angle: -150,
    debug,
    size: SIZE_STAR
  });
  shootingGroup.appendChild(shootingStar);
  allShootingStars.push(shootingStar);

  loopRandomShooting(allShootingStars, (star, previousStar) => {
    star.classList.add('is-shooting');

    if (previousStar) {
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

  if (debug) {
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

  if (maxTimeout > timeout) {
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

function randomEntryGenerator(list) {
  let stars = [...list];
  let lastStar = null;

  return function nextStar() {
    const index = Math.round(Math.random() * (stars.length - 1));
    const star = stars[index];

    if (star === lastStar) {
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
function describeArc(x, y, radius, startAngle, endAngle) {
  startAngle += 90;
  endAngle += 90;

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var sweepFlag = endAngle > startAngle ? 0 : 1;
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  if (endAngle - startAngle < -180) {
    largeArcFlag = "1"
  }

  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
  ].join(" ");

  return d;
}


import {orion} from './data/orion.js';
import {gemini} from './data/gemini.js';
import {hercules} from './data/hercules.js';
import {ursaMajor} from './data/ursa-major.js';

const DEBUG = false;

export function createConstellations() {
  const group = createSVGElement('g');

  const constellationOrion = createConstellation(orion);
  group.appendChild(constellationOrion.group);

  const constellationHercules = createConstellation(hercules);
  group.appendChild(constellationHercules.group);

  const constellationUrsaMajor = createConstellation(ursaMajor);
  group.appendChild(constellationUrsaMajor.group);

  const constellationGemini = createConstellation(gemini);
  group.appendChild(constellationGemini.group);

  return {
    group,
    controls: {
      orion: constellationOrion.controls,
      hercules: constellationHercules.controls,
      ursaMajor: constellationUrsaMajor.controls,
      gemini: constellationGemini.controls
    }
  };
}

function createConstellation({coordinates, lines, scale, position, rotate, debug, name, duration, delay} = null) {
  const group = createSVGElement('g');
  group.setAttribute('transform', `translate(${position.x}, ${position.y})  scale(${scale}) rotate(${rotate}) `);
  group.classList.add('star-constellations');

  if (name) {
    group.classList.add(name);
  }

  const {group: paths, controls} = createPaths({lines, coordinates, duration, playDelay: delay});
  group.appendChild(paths);

  const stars = createStars(coordinates, debug);
  group.appendChild(stars);

  return {
    group, controls
  };
}

function createStars(coordinates, debug) {
  const group = createSVGElement('g');

  coordinates.forEach((coordinate, index) => {
    if (DEBUG || debug) {
      const star = createConstellationStar({color: 'yellow', size: 5, ...coordinate, index: index});
      group.appendChild(star);
    } else {
      const star = createStar({color: 'white', size: 2, ...coordinate, index: index});
      group.appendChild(star);
    }

  });

  return group;
}

function createPaths({lines, coordinates, playDuration = 2500, playDelay = 0}) {
  const group = createSVGElement('g');
  group.classList.add('constellation-pathgroup');

  let totalLength = 0;

  const generatedPaths = lines.map(lineIndices => {
    // lines contains only references to coordinates
    const pathPoints = lineIndices.map(coordinateIndex => coordinates[coordinateIndex]);
    const {path, length} = createConstellationPath(pathPoints);
    path.setAttribute('stroke', '#484B74');
    path.setAttribute('stroke-width', '4');

    totalLength += length;
    return {path, length};
  });

  let lengthAccu = 0;
  generatedPaths.forEach(({path, length}) => {
    const ratio = length / totalLength;

    const duration = Math.round(ratio * playDuration);
    const delay = Math.round(lengthAccu / totalLength * playDuration);

    path.style.setProperty('--constellation-segment-play-delay', playDelay + 'ms');
    path.style.setProperty('--constellation-segment-delay', delay + 'ms');
    path.style.setProperty('--constellation-segment-duration', duration + 'ms');
    group.appendChild(path);

    lengthAccu += length;
  });

  function playFn() {
    group.classList.toggle('is-playing', true);
  }

  function stopFn() {
    group.classList.toggle('is-playing', false);
    group.classList.toggle('is-autoplay', false);
  }

  function toggleFn() {
    group.classList.toggle('is-playing');
  }

  function autoplayFn() {
    console.log('autoplayFn', group.classList)
    group.classList.toggle('is-autoplay', true);
  }

  return {
    group,
    controls: {
      play: playFn,
      stop: stopFn,
      toggle: toggleFn,
      autoplay: autoplayFn
    }
  };
}

function createConstellationStar({size, color, x, y, index}) {
  const starShape = createSVGElement('circle');
  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);

  const star = createSVGElement('g');
  star.setAttribute('transform', `translate(${x} ${y})`);
  star.appendChild(starShape);

  const text = createSVGElement('text');
  text.appendChild(document.createTextNode(index));
  text.setAttribute('stroke', 'red');
  text.setAttribute('dx', '10');
  text.setAttribute('dy', '20');

  star.appendChild(text);
  return star;
}

function pointsToSVGPath(points, close = false) {
  const path = createSVGElement('path');
  const startPoint = points[0];
  const pointsArray = points.slice(1).map(({x, y}) => `L ${x} ${y}`);

  const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`,
    ...pointsArray,
    ...(close ? ['z'] : [])
  ];

  path.setAttribute('d', pathParts.join(' '));
  path.setAttribute('fill', 'none');
  // this will cause paths not to close as the scaled
  // path length is different then the calculated (scaled) one
  // enable as resize and you will see gaps.
  // path.setAttribute('vector-effect', 'non-scaling-stroke');

  return path;
}


function createConstellationPath(pathPoints) {

  const path = pointsToSVGPath(pathPoints);
  const length = path.getTotalLength();

  // save path length for future use in CSS
  path.style.setProperty('--constellation-segment-length', length.toString());
  path.classList.add('constellation__path');
  return {path, length};
}
