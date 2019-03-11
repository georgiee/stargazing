export function getRandomCoordinate() {
  return getRandomPosition({
    width: 960,
    height: 700,
    padding: 10,
    offsetX: 0,
    offsetY: 0
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

export function getScrollTop() {
  return (document.scrollingElement || document.documentElement).scrollTop
}

export function createSVGElement(tag){
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag)
  return element;
}

export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
