const points = [ {x: 0, y: 0}, {x: 100, y: 0}];

const path = createLine(points);
const dot1 = createDot(points[0]);
const dot2 = createDot(points[1]);

svg.appendChild(dot1);
svg.appendChild(dot2);
svg.appendChild(path);

function createDot({x, y}) {
  const group = createSVGElement('g');
  const dot = createSVGElement('circle');
  dot.setAttribute('r', 5);
  dot.setAttribute('fill', 'white');
  group.appendChild(dot);
  group.setAttribute('transform', `translate(${x} ${y})`);
  return group;
}