function createSky({count}) {
  for(let i = 0; i < count; i++) {
    const {x, y} = getRandomCoordinate();
    const color = getRandomColor(),
    const star = createStar({ color, size: 1, x, y  });

    svgElement.appendChild(star);
  }
}