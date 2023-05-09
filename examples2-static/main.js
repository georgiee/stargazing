import {
  createStar
} from '/src/shooting/shared';

const svgElement = document.getElementById('nightsky');

let star;

star = createStar({color: '#B5CDFF', size: 20, x: 50, y: 0});
svgElement.appendChild(star);

star = createStar({color: '#FFE4CE', size: 50, x: 180, y: 0});
svgElement.appendChild(star);
star = createStar({color: '#FF6C00', size: 100, x: 400, y: 0});
svgElement.appendChild(star);
