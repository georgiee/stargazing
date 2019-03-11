

const COORDINATES = [
  { x: 126, y: 249},
  { x: 108, y: 405},
  { x: 75, y: 460},
  { x: 44, y: 447},
  { x: 0, y: 418},
  { x: 272, y: 466},
  { x: 246, y: 338},
  { x: 339, y: 351},
  { x: 220, y: 329},
  { x: 184, y: 243},
  { x: 237, y: 157},
  { x: 285, y: 177},
  { x: 332, y: 206},
  { x: 366, y: 230},
  { x: 399, y: 230},
  { x: 419, y: 117},
  { x: 244, y: 7},
  { x: 91, y: 104},
  { x: 62, y: 72},
  { x: 13, y: 43},
  { x: 69, y: 0},
  { x: 130, y: 355}
];

const LINES = [
  [0, 9, 8, 21, 0],
  [9, 10, 17, 0, 9],
  [10, 11, 12, 13, 14, 15],
  [10, 16, 17],
  [17, 18, 19, 20],
  [8, 6, 7, 5],
  [21, 1, 2, 3, 4]
]

  export const hercules = {
    name: 'hercules',
    coordinates: COORDINATES,
    lines: LINES,
    scale: 0.3,
    position: {
      x: 200, y: 100
    },
    rotate: -25,
    debug: false,
    duration: 2500,
    delay: 2000
  }