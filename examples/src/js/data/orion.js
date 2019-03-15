const COORDINATES = [
  { x: 161, y: 352 },
  { x: 57, y: 365 },
  { x: 80, y: 273 },
  { x: 98, y: 264 },
  { x: 115, y: 255 },
  { x: 131, y: 167 },
  { x: 102, y: 126 },
  { x: 37, y: 157 },
  { x: 19, y: 122 },
  { x: 0, y: 68 },
  { x: 19, y: 59 },
  { x: 47, y: 0 },
  { x:239, y: 163 },
  { x:214, y: 120 },
  { x:239, y: 133 },
  { x:239, y: 180 },
  { x:233, y: 215 },
  { x:214, y: 225 },
  { x:16, y: 0 },
];

const LINES = [
  [7, 6, 5, 4, 3, 2, 7],
  [5, 12],
  [12, 14, 13],
  [12, 15, 16, 17],
  [4, 0],
  [2, 1],
  [7, 8, 9],
  [9, 10, 11],
  [9, 18]
]

export const orion = {
  name: 'orion',
  coordinates: COORDINATES,
  lines: LINES,
  scale: 0.5,
  position: {
    x: 420, y: 140
  },
  rotate: 0,
  debug: false,
  duration: 2500,
  delay: 0
}