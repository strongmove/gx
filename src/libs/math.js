export const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const choice = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
