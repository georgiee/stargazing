import { createSVGElement, getRandomColor, getRandomCoordinate } from './shared.js';

export function createSky({count, sizeStar = 1}) {
  const skyGroup = createSVGElement('g');

  for(let i = 0; i < count; i++) {
    const coordinates = getRandomCoordinate() /*{x,y}*/;
    const color = getRandomColor();
    const star = createStar({ color, size: sizeStar, ...coordinates, index: i  });
    skyGroup.appendChild(star);
  }

  return skyGroup;
}

export function createStar({size, color, x, y, index}) {
  const delay = Math.round(-1 * Math.random() * 4000);

  const starShape = createSVGElement('circle');
  starShape.setAttribute('r', size + '');
  starShape.setAttribute('fill', color);

  starShape.classList.add('twinkle-little-star');
  starShape.style.setProperty('--animation-twinkle-delay', delay + 'ms');

  const star = createSVGElement('g');
  star.setAttribute('transform', `translate(${x} ${y})`);


  const parallaxGroup = createSVGElement('g');
  parallaxGroup.appendChild(starShape)
  star.appendChild(parallaxGroup);
  parallaxGroup.classList.add('parallax-effect');
  parallaxGroup.style.setProperty('--star-parallax-depth', index%5 + 1);

  return star;
}