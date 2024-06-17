/* 
Divide an array into 3 partition.

partitionSize =(right - left)/3
mid1 = left + partitionSize
mid2 = right + partitionSize

Time Complexity: O(log_3(n))

has much more comparison:
target > mid2?
target == mind2?
target < mid2 && targrt > mid1?
target == mid1?
target < mid1?

Turns out: binary search is faster than ternary search
reasons: ternary search has much more comparison which slow down the searching

*/

function ternarySearch(array: number[], target: number): number {
  return _ternarySearch(array, target, 0, array.length);
}

function _ternarySearch(
  array: number[],
  target: number,
  left: number,
  right: number
): number {
  if (left > right) return -1;

  let partitionSize = Math.floor((right - left) / 3);
  let mid1 = left - partitionSize;
  let mid2 = right - partitionSize;

  if (array[mid1] == target) return mid1;
  if (array[mid2] == target) return mid2;

  if (target < array[mid1])
    return _ternarySearch(array, target, left, mid1 - 1);
  if (target > array[mid2])
    return _ternarySearch(array, target, mid2 + 1, right);

  return _ternarySearch(array, target, mid1 + 1, mid2 - 1);
}

// const array = [1, 2, 3, 4, 5];
// console.log(ternarySearch(array, 5));
