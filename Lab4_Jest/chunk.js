function chunk(array, size) {
  const chunkedArr = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, index + size));
    index += size;
  }
  return chunkedArr;
}

module.exports = chunk;

console.log("chunk([1,2,3,4,5,6], 2):", chunk([1,2,3,4,5,6], 2));
console.log("chunk(['c','h','u','n','k'], 2):", chunk(['c','h','u','n','k'], 2));
