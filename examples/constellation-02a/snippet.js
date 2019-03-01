const points = [ {x: 0, y: 0}, {x: 100, y: 0}];

const path = createLine(points);
svg.appendChild(path);

function createLine(line) {
  const path = createSVGElement('path');
  path.setAttribute('d', generateLinePath(...line));
  return path;
}

function generateLinePath(...points) {
  const [startPoint, ...segmentPoints] = points;
  const lineSegments = segmentPoints.map(({x, y}) => `L ${x} ${y}`);
  const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`, ...lineSegments
  ];
  return pathParts.join(' ');
}