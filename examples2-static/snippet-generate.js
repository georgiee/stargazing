function generateLinePath(...points) {
  const [startPoint, ...segmentPoints] = points;
  const lineSegments = segmentPoints
    .map(({x, y}) => (`L ${x} ${y}`));

    const pathParts = [
    `M ${startPoint.x} ${startPoint.y}`, // M 0 0
    ...lineSegments // L 100 0
  ];
  return pathParts.join(' ');
}