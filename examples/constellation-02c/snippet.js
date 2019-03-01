const points = [ {x: 0, y: 0}, {x: 100, y: 0}, {x: 50, y: 50}];
const lineIndices = [ [0, 1], [1,2], [2,0] ];

createConstellation(points, lineIndices);

function createConstellation(points, lineIndices) {
  points.forEach(point => {
    svg.appendChild(createDot(point));
  });

  lineIndices.forEach(indices => {
    const linePoints = indices.map(index => points[index]);
    svg.appendChild(createLine(linePoints));
  })
}