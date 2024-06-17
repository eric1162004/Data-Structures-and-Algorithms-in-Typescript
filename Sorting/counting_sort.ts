/* 
Non-comparison sorting

assume data set has range [0,k], k is the max value
create an array of k slots
iterate the dataset and adding the frequency of the values
in their respective array slots.

dataset: 2,3,4,4,5,5,5 

array  : 0,0,1,1,2,3
         ^ ^ ^ ^ ^ ^
index    0 1 2 3 4 5

space complexity: O(k)

time complexity:
    populate counts: O(n)
     iterate counts: O(k)
             total : O(n+k)  ~ O(n)    

Use when:
- space is not an issue
- values are non-negative

*/

function countSort(array: number[], max: number) {
  const counts = new Array(max + 1).fill(0); // if max = 5, then you need 6 slots in the counting array

  for (let i of array) {
    counts[i]++;
  }

  let k = 0; // keep track of the array index
  for (let i = 0; i < counts.length; i++) {
    // looping the frequency array
    for (let j = 0; j < counts[i]; j++) {
      // if 0 has count of 3, then fill up the array with 3 zeros.
      array[k++] = i;
    }
  }
}

// const array = [5, 4, 3, 2, 1]; // 4 passes
// // const array = [1, 2, 3, 4, 5]; // 1 pass
// countSort(array, 5);
// console.log(array);
