function dot(a, b) {
  return a.map((a0) => a0.reduce((s, a0, i) => s + a0 * b[i], 0));
}

function add(a, b) {
  return a.map((a0,i) => a0 + b[i])
}