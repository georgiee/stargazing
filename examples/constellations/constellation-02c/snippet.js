const points = [ {x: 0, y: 0}, {x: 100, y: 0}, {x: 50, y: 50}];
const lineIndices = [ [0, 1], [1, 2, 0] ];
const linePoints = indicesToPoints(lineIndices, points);

createConstellation(points, linePoints);

function createConstellation(points, lineIndices) {
  createDots(points);

  linePoints.forEach(line => {
    createLine(line)
  })
}

function indicesToPoints(indices, source) {
  return indices.map(indexList => (
    indexList.map(index => source[index])
  ))
}