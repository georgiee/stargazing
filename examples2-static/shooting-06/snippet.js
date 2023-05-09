function createShootingStar({x, y, radius, angle, angleStart}) {
  const shootingStarShape = createSVGElement('circle');
  const shootingStar = createSVGElement('g');
  shootingStar.appendChild(shootingStarShape);

  shootingStar.classList.add('shooting-star');
  shootingStar.setAttribute('transform', 'translate('+ x + '' + y + ')');

  shootingStarShape.style.setProperty('--shooting-orbit-radius', radius + 'px');
  shootingStarShape.style.setProperty('--shooting-orbit-angle', angle + 'deg');
  shootingStarShape.style.setProperty('--shooting-orbit-angle-start', angleStart + 'deg');
  shootingStarShape.setAttribute('r', size);
  shootingStarShape.setAttribute('fill', 'white');

  mySVG.appendChild(shootingStar);
}