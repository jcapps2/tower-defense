export default [
  [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]
];
// 0 means that the space is open
// -1 means blocked position/enemy path
// when we add turrets, we will update that position on the map with a -1