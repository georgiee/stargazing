function updatePathLength(path) {
  const length = path.getTotalLength();
  path.style.setProperty('--path-length', length)
}