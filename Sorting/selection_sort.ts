/* 
- SELECT the smallest item each pass
- move the smallest item to the 'SORTED PARTITION'
- you only need n-1 pass

time complexity    best    worst
pass               O(n)     O(n)
comparision        O(n)     O(n)
total              O(n^2)   O(n^2)

*/

function selectionSort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    let smallestItemIndex = i;

    // unsorted partition starting at => i+1
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[smallestItemIndex]) smallestItemIndex = j;
    }

    if (smallestItemIndex !== i + 1) swap(array, smallestItemIndex, i);
  }
}

function swap(array: number[], index_a: number, index_b: number) {
  let temp = array[index_a];
  array[index_a] = array[index_b];
  array[index_b] = temp;
}

// const array = [5, 4, 3, 2, 1];
// // const array = [1, 2, 3, 4, 5];
// selectionSort(array);
// console.log(array);
