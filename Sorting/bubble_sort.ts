/* 
BUBBLE SORT

- Sort the items in n-1 pass
- in each pass, compare item i and i + 1 
- swap item if i > i+1
- in each successive pass, iterate item 0 to n-pass
- if no swap during any pass, the list is sorted => done sorting!

worst case O(n^2) comparison 
*/

function bubbleSort(array: number[]) {
  let hasSwapped = false;

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        hasSwapped = true;
      }
    }
    if (!hasSwapped) break;
  }
}

function swap(array: number[], index_a: number, index_b: number) {
  let temp = array[index_a];
  array[index_a] = array[index_b];
  array[index_b] = temp;
}

// const array = [5, 4, 3, 2, 1];
// const array = [1,2,3,4,5];
// bubbleSort(array);
// console.log(array);
