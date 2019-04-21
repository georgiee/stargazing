import { createSky } from './sky.js';
import { createShootingStars } from './shooting.js';
import { createConstellations } from './constellation.js';

const svg = document.querySelector('#nightsky');

const sky = createSky({ count: 350 });
svg.appendChild(sky);

const shootingStars = createShootingStars();
svg.appendChild(shootingStars);

const constellation = createConstellations();
svg.appendChild(constellation);

// svg.classList.add('debug');