function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function simRaf(fn) {
  return setTimeout(fn, 1e3 / 60);
}
function raf(fn) {
  const rr = simRaf;
  return rr(fn);
}
function cancelRaf(id) {
  const rr = clearTimeout;
  rr(id);
}
export {
  cancelRaf,
  isSameSecond,
  raf
};
