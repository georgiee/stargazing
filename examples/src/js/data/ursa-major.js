


const COORDINATES = [
  { x: 0, y: 181 },
  { x: 80, y: 132 },
  { x: 144, y: 138 },
  { x: 220, y: 144 },
  { x: 254, y: 194 },
  { x: 358, y: 154 },
  { x: 345, y: 79 },
  { x: 484, y: 24 },
  { x: 586, y: 0 },
  { x: 478, y: 92 },
  { x: 548, y: 167 },
  { x: 478, y: 345 },
  { x: 352, y: 320 },
  { x: 267, y: 276 },
  { x: 339, y: 480 },
  { x: 339, y: 503 },
  { x: 634, y: 200 }
];

const LINES = [
  [3, 4, 5, 6, 3],
  [3, 2, 1, 0],
  [6, 7, 8, 9, 5],
  [9, 10, 16],
  [4, 13],
  [13, 12, 11],
  [13, 14, 15]
]

export const ursaMajor = {
  name: 'ursa-major',
  coordinates: COORDINATES,
  lines: LINES,
  scale: 0.3,
  position: {
    x: 450, y: 50
  },
  rotate: 45,
  debug: false,
  duration: 2500,
  delay: 3500
}