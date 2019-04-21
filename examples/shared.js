export function createSVGElement(tag){
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

export function createText({point, text, size = 10, offset = {x: 0, y:0}}){

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


export function createStar({size, color, x, y, delay = 0}) {
  const starShape = createSVGElement('circle');
  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);
  starShape.classList.add('twinkle-little-star');
  starShape.style.setProperty('--animation-twinkle-delay', delay + 'ms');

  const star = createSVGElement('g');
  star.setAttribute('transform', `translate(${x} ${y})`);


  star.appendChild(starShape);
  return star;
}

export function getRandomCoordinate() {
  return getRandomPosition({
    width: 960,
    height: 700,
    padding: 10,
    offsetX: -480,
    offsetY: -350
  });
}

export function getRandomPosition({width, height, offsetX = 0, offsetY = 0, padding = 0}){
  const startX = offsetX + padding;
  const startY = offsetY + padding;
  const maxWidth = width - padding *2;
  const maxHeight = height - padding *2;

  return {
    x: startX + maxWidth * Math.random(),
    y: startY + maxHeight * Math.random()
  }
}

export function getRandomColor() {
  const availableColors = ['#B5CDFF', '#FFE4CE', '#FF6C00'];

  const index = Math.round(Math.random() * (availableColors.length -1));
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
  const noop = () => {};

  const playFn = play || noop;
  const stopFn = stop || noop;

  window.addEventListener('message', ({data}) => {
    switch(data) {
      case 'slide:stop': stopFn(); break;
      case 'slide:start': playFn();break;
    }
  });
}
