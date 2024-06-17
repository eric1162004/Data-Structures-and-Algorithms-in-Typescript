/* 
Divide
- recursively create smaller new arrays 
- midIndex = floor(n / 2)

Conquer
- merge to sub arrays in sorting order

time complexity    best      worst
Dividing           O(log n)  O(log n)
Merging            O(n)      O(n)
total              O(n)      O(n^2)
space              O(n)      O(n)

NOTE: Downside - require additional space cost
*/

function mergeSort(array: number[]) {
  if (array.length <= 1) return array;

  const midIndex = Math.ceil(array.length / 2);

  const sortedLeft = mergeSort(array.slice(0, midIndex));
  const sortedRight = mergeSort(array.slice(midIndex));

  let merged = merge(sortedLeft, sortedRight);

  return merged;
}

function merge(array1: number[], array2: number[]): number[] {
  let merged = [];
  let i = 0;

  // compare the first element of the two arrays
  // push the smaller element onto the merged
  while (array1.length > 0 && array2.length > 0) {
    if (array1[0] < array2[0]) {
      merged.push(array1.shift());
    } else {
      merged.push(array2.shift());
    }
    i += 1;
  }

  // Append remaining elements
  while (array1.length > 0) {
    merged.push(array1.shift());
    i += 1;
  }
  while (array2.length > 0) {
    merged.push(array2.shift());
    i += 1;
  }

  return merged;
}

// const array = [5, 4, 3, 2, 1]; // 4 passes
// const array = [1, 2, 3, 4, 5]; // 1 pass
// console.log(mergeSort(array));
