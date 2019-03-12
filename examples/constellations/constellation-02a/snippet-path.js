function createLine(linepoints) {
  const path = createSVGElement('path');

  // generates this string: `M 0 0 L 100 0`
  const pathData = generateLinePath(...linepoints);

  path.setAttribute('d', pathData);
  svg.appendChild(path);
}
