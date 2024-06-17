/* 
iterate the linear one by one
return the item if the item is found

time complexity    best     worst
                   O(1)     O(n)
*/

// return the index of the found item
// retur -1 if the item is not found
function linearSearch(array: number[], item: number): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
}

// const array = [1,2,3,4,5];
// console.log(linearSearch(array, -2));

