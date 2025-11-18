function last(array, n) {
  if (array == null) return [];
  if (n == null) return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
}
module.exports = last;

console.log("last([1,2,3,4,5], 2):", last([1,2,3,4,5], 2));
console.log("last(['M','o','h','a','m','e','d'], 3):", last(['M','o','h','a','m','e','d'], 3));
