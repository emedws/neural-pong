function dot(a, b) {
  if (typeof b == 'number')
    return a.map(a0 => typeof a0 == 'number' ? a0 * b : a0.map(a1 => a1 * b));
  if (!a[0].length && !b[0].length)
    return a.map(a0 => b.map(b0 => a0 * b0));
  if ((a[0].length) != b.length)
    throw new Error('wrong matrix sizes', arguments);
  return a.map((a0, i) => a0.reduce((s, _, j) => s + a[i][j] * b[j], 0));
}

function add(a, b) {
  if (typeof b == 'number')
    return a.map((a0, i) => a0 + b);
  if (typeof b[0] == 'number')
    return a.map((a0, i) => a0 + b[i])
  return a.map((a0, i) => a0.map((a1, j) => a1 + b[i][j]))
}

function substract(a, b) {
  return a.map((a0, i) => a0 - b[i])
}

function transpose(a) {
  return a[0].map((_, i) => a.map((_, j) => a[j][i]));
}

function arrayProduct(a, b) {
  if (a.length != b.length || a[0].length != b[0].length)
    throw new Error('wrong matrix sizes', arguments);
  if (!a[0].length)
    return a.map((a0, i) => a0 * b[i]);
  return a.map((a0, i) => a0.map((a1, j) => a1 * b[i][j]));
}
