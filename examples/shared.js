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

  return path;
}
