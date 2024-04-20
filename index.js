const {compare, applyPatch} = require("fast-json-patch")

const start = {
  "location": {
    "city": "Salzburg",
    "zip": "5020",
    "street": "Salzburgerstraße",
    "number": "50"
  },
  "age": 25,
  "job": "Software Developer",
  "hobbies": [
    "Soccer",
    "Tennis",
    "Climbing"
  ],
  "name": "Max Mustermann"
}

const target = {
  "name": "Max Mustermann",
  "age": 25,
  "address": {
    "city": "Salzburg",
    "zip": "5020",
    "street": "Salzburgerstraße"
  },
  "hobbies": [
    "Soccer",
    "Tennis",
    "Climbing",
    "Cooking"      
  ]
}

function deepEqual(obj1, obj2) {
  // Base case: If both objects are identical, return true.
  if (obj1 === obj2) {
    return true;
  }
  // Check if both objects are objects and not null.
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  // Get the keys of both objects.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if the number of keys is the same.
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Iterate through the keys and compare their values recursively.
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  // If all checks pass, the objects are deep equal.
  return true;
}
// const patch = [
//   { op: 'add', path: '/hobbies/3', value: 'Cooking' },
//   { op: 'remove', path: '/job/number' },
//   { op: 'move', from: "/job", path: '/location' },
// ]

// console.log(applyPatch(start, patch))
const patch = compare(start, target)
applyPatch(start, patch)
console.log(deepEqual(start, target))
console.log(patch)
