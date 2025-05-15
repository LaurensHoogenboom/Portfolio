export const getRandomId = function(length = 6) {
  return Math.random().toString(36).substring(2, length+2);
};