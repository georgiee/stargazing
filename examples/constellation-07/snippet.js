// will set 125px
updatePathLength(document.querySelector('.hotpink-path'));

function updatePathLength(path) {
  const length = path.getTotalLength();
  path.style.setProperty('--path-length', length)
}