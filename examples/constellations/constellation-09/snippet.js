function createLine(line, index) {
  const path = createSVGElement('path');
  path.classList.add('animated-path');

  const pathLength = path.getTotalLength();
  const delay = 0.5 * index;
  path.style.setProperty('--path-length', pathLength);
  path.style.setProperty('--path-delay', delay);
  //...
}
