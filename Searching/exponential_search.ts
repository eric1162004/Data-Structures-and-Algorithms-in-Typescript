/* 
Idea: start a small search bound idndex
check if the search item is with the bound
if no, graduately increase the partition size
if yes, search item in [preBoundIndex, boundIndex]

time complexity: O(log i), where i = the position of the item
i is also the max time we can divided the array

*/

function _iterativeBinarySearch(numbers: number[], number: number): number {
  if (numbers.length === 0) return -1;

  let left = 0;
  let right = numbers.length - 1;

  let mid = getMid();
  let midNum = numbers[mid];

  let index = -1;

  while (left <= right) {
    midNum = numbers[mid];
    if (midNum === number) {
      index = mid;
      break;
    } else if (midNum < number) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = getMid();
  }

  return index;

  function getMid() {
    return Math.floor((left + right) / 2);
  }
}

function exponentialSearch(array: number[], target: number): number {
  let bound = 1;
  while (bound < array.length && array[bound] < target) bound *= 2;

  // found the bound
  // do binary search within the bound
  const left = Math.floor(bound / 2);
  const right = Math.max(bound, array.length - 1);
  const index = _iterativeBinarySearch(array.slice(left, right + 1), target);

  return index === -1 ? -1 : index + left; // + left offset
}

// const array = [1, 2, 3, 4, 5];
// console.log(exponentialSearch(array, 5));
// console.log(exponentialSearch(array, 8));
