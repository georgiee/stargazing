const lineBlue = [0, 2];
const lineHotpink = [3, 1, 2];

function indicesToPoint(indices, sourceList) {
  return indices.map(index => sourceList[index]);
}

const bluePoints = indicesToPoint(lineBlue, points);
createLine(bluePoints);

const hotpinkPoints = indicesToPoint(lineHotpink, points);
createLine(hotpinkPoints);