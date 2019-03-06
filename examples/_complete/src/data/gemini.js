



const COORDINATES = [
  { x: 50, y: 28 },
  { x: 69, y: 77 },
  { x: 0, y: 90 },
  { x: 57, y: 209 },
  { x: 97, y: 283 },
  { x: 147, y: 440 },
  { x: 288, y: 374 },
  { x: 321, y: 396 },
  { x: 378, y: 416 },
  { x: 236, y: 270 },
  { x: 201, y: 96 },
  { x: 116, y: 96 },
  { x: 147, y: 0 },
  { x: 321, y: 90 }
];

const LINES = [
  [0, 1, 3, 4, 5],
  [2, 1, 11],
  [12, 10, 9, 6, 7],
  [13, 10, 11]
]

export const gemini = {
  name: 'gemini',
  coordinates: COORDINATES,
  lines: LINES,
  scale: 0.3,
  position: {
    x: 650, y: 150
  },
  rotate: 0,
  debug: false
}