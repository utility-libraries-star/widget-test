export function uniqID() {
  return Array.from({ length: 8 }, () =>
    ((Math.random() * 16) | 0).toString(16)
  ).join('');
}
