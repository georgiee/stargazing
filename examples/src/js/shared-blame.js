export function createSVGElement(tag){
  return document.createElementNS("http://www.w3.org/2000/svg", tag)
}

export function generateLinePath(...points) {
  const [startPoint, ...segmentPoints] = points;
  const lineSegments = segmentPoints.map(({x, y}) => `L ${x} ${y}`);
  const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`, ...lineSegments
  ];
  return pathParts.join(' ');
}

export function createDot({x, y}) {
  const group = createSVGElement('g');
  const dot = createSVGElement('circle');
  dot.setAttribute('r', 5);
  dot.setAttribute('fill', 'white');
  dot.classList.add('twinkle-little-star');
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