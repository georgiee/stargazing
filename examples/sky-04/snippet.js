function createStar({size, color, x, y}) {
  const starShape = createSVGElement('circle');
  const delay = Math.round(-1 * Math.random() * 4000);

  starShape.classList.add('twinkle-little-star');
  starShape.style.setProperty('--animation-twinkle-delay', delay + 'ms');
  /**...*/
}