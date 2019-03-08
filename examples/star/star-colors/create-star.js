import { createSVGElement } from '../../shared.js';

export function createStar({size, color, x, y}) {
  const starShape = createSVGElement('circle');
  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);

  const star = createSVGElement('g');
  star.setAttribute('transform', `translate(${x} ${y})`);

  star.appendChild(starShape);
  return star;
}
