/* 
- partition the array into sorted and unsorted
- assume the first item is sorted
- in each successive pass, 
move an unsorted item into the sorted partion at the correct place

time complexity    best    worst
pass               O(n)     O(n)
comparision        O(1)     O(n)
total              O(n)     O(n^2)

NOTE: complexity is same as bubblesort
*/

function insertionSort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    let hasSwapped = false;
    while (j >= 0 && current < array[j]) {
      swap(array, j, j + 1);
      j -= 1;
      hasSwapped = true;
    }
    if (!hasSwapped) break;
  }
}

function swap(array: number[], index_a: number, index_b: number) {
  let temp = array[index_a];
  array[index_a] = array[index_b];
  array[index_b] = temp;
}

// const array = [5, 4, 3, 2, 1]; // 4 passes
// const array = [1, 2, 3, 4, 5]; // 1 pass
// insertionSort(array);
// console.log(array);
