function createStar({size, color, x, y}) {
  const starShape = document.createElementNS(
    "http://www.w3.org/2000/svg", 'circle');
  const star = createSVGElement('g');

  star.appendChild(starShape);

  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);
  star.setAttribute('transform', 'translate(' + x + ' ' + y + ')');

  mySVG.appendChild(star);
}
