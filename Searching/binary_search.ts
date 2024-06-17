/* 
Only work on a sorted list

middleIndex = floor((left + right)/2)
check if middleItem === searchItem
if not, check if middleItem < searchItem
if yes => recursive the search from middleIndex+1 to the endIndex
else, search firstIndex to middleIndex-1
The base case is firstIndex>= endIndex

time complexity    best     worst
                   O(1)     O(n)
*/

function recursiveBinarySearch(numbers: number[], number: number): number {
  if (numbers.length === 0) return -1;
  return _recursiveBinarySearch(numbers, number, 0, numbers.length - 1);
}

function _recursiveBinarySearch(
  numbers: number[],
  number: number,
  left: number,
  right: number
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);
  const midNum = numbers[mid];

  if (midNum === number) {
    return mid;
  } else if (midNum < number) {
    return _recursiveBinarySearch(numbers, number, midNum + 1, right);
  } else {
    return _recursiveBinarySearch(numbers, number, left, mid - 1);
  }
}

function iterativeBinarySearch(numbers: number[], number: number): number {
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

// const array = [1, 2, 3, 4, 5];
// console.log(recursiveBinarySearch(array, 5));
// console.log(iterativeBinarySearch(array, 3));
