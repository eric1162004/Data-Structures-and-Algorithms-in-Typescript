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

const array = [1, 2, 3, 4, 5];
console.log(recursiveBinarySearch(array, 5));
