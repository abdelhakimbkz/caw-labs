function first(array, n) {
  if (array == null || n <= 0) return [];
  if (n == null) return array[0];
  return array.slice(0, n);
}
module.exports = first;

console.log("first([1,2,3,4,5], 2):", first([1,2,3,4,5], 2));
console.log("first(['H','a','k','i','m'], 3):", first(['H','a','k','i','m'], 3));
