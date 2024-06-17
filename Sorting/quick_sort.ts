/* 
Does not require additional space, unlike mergesort

pivot = an item chosen from the unsorted array to partition an array
b = boundary ptr
i = iterative ptr

as iterating the array, if a item is smaller than the pivot,
increment the b ptr. and swap the item at i to position b
when i reach to where the pivot is, swap item b+1 with the pivot

Pivot Selection
- pick randomly
- use the middle index
- average of first, middle and last item

time complexity    best         worst
partition          O(n)         O(n)    # iterate all items and swap require n operation
# of times         O(log n)     O(n)    # depends on the chosen pivot
total              O(n log n)   O(n^2)
space              O(log n)     O(n)    # same as the # of times
*/

function quickSort(array: number[]) {
  _quickSort(array, 0, array.length - 1);
}

function _quickSort(array: number[], start: number, end: number) {
  if (start >= end) return; // if array has one or zero item, return

  let boundary = partition(array, start, end);

  _quickSort(array, start, boundary - 1);
  _quickSort(array, boundary + 1, end);
}

function partition(array: number[], start: number, end: number) {
  let pivot = array[end]; // assume pivot is the last item
  let boundary = start - 1;

  for (let i = start; i <= end; i++) {
    if (array[i] <= pivot) { // less or equal because you need to swap the pivot as well
      swap(array, i, ++boundary); // increment the boundary after a swap
    }
  }

  return boundary;
}

function swap(array: number[], index_a: number, index_b: number) {
  let temp = array[index_a];
  array[index_a] = array[index_b];
  array[index_b] = temp;
}

const array = [5, 4, 3, 2, 1]; // 4 passes
// const array = [1, 2, 3, 4, 5]; // 1 pass
quickSort(array);
console.log(array);
