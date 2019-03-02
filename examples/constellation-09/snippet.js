function createLine(line, index) {
  const path = createSVGElement('path');
  path.classList.add('animated-path');
  path.style.setProperty('--path-length', path.getTotalLength());
  path.style.setProperty('--path-index', index);
  //...
}
