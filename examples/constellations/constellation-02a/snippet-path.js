const points = [ {x: 0, y: 0}, {x: 100, y: 0}];

createDots(points); //easy, we did this plenty of times
createLine(points);

function createLine(line) {
  const path = createSVGElement('path');
  path.setAttribute('d', generateLinePath(...line));
  svg.appendChild(path);
}

// generates this string: `M 0 0 L 100 0`
function generateLinePath(...points) {
  const [startPoint, ...segmentPoints] = points;
  const lineSegments = segmentPoints.map(({x, y}) => `L ${x} ${y}`);
  const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`, ...lineSegments
  ];
  return pathParts.join(' ');
}