import { createSVGElement } from './shared.js';
import { createStar } from './sky.js';

import { orion } from './data/orion.js';
import { gemini } from './data/gemini.js';
import { hercules } from './data/hercules.js';
import { ursaMajor } from './data/ursa-major.js';

const DEBUG = false;

export function createConstellations() {
  console.log('run starConstellations');
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

  if(name) {
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
    if(DEBUG || debug) {
      const star = createConstellationStar({ color: 'yellow', size: 5, ...coordinate, index: index });
      group.appendChild(star);
    } else {
      const star = createStar({ color: 'white', size: 2, ...coordinate, index: index });
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
  generatedPaths.forEach( ({path, length}) => {
    const ratio = length/totalLength;

    const duration = Math.round(ratio * playDuration);
    const delay = Math.round(lengthAccu/totalLength * playDuration);

    path.style.setProperty('--constellation-segment-play-delay', playDelay + 'ms');
    path.style.setProperty('--constellation-segment-delay', delay + 'ms');
    path.style.setProperty('--constellation-segment-duration', duration + 'ms');
    group.appendChild(path);

    lengthAccu+=length;
  });


  function playFn() {
    console.log('playFn')
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
    group.classList.toggle('is-autoplay', true);
  }

  return {
    group,
    controls: {
      play: playFn,
      stop: stopFn,
      toggle: toggleFn,
      autoplay : autoplayFn
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
