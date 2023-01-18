const str = "hi";
const iterator = str[Symbol.iterator]();

for (let i of iterator) {
  console.log(i);
}
