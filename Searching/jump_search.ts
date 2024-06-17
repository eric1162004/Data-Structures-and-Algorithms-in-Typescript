/* 

Only work on sorted array

divide array into blocks
ideal block size  = sqrt(n)
check if target is with the block by comparing the last element of the blocks

pStart = start of a block
pNext = start of next block
if pStart >= length => return -1
ensure pNext never > length

time complexity = O(sqrt(n))
*/

function jumpSearch(array: number[], target: number): number {
  const length = array.length;
  if (length === 0) return -1;

  const blockSize = Math.floor(Math.sqrt(length));

  let pStart = 0;
  let pNext = blockSize;

  while (pStart < length) {
    // move to next block
    if (target > array[pNext - 1]) {
      pStart += blockSize;
      pNext = pNext + blockSize >= length ? length : pNext + blockSize;
      continue;
    }
    // iterate a block
    while (pStart < pNext) {
      if (target === array[pStart]) return pStart; // find item, return index!
      pStart++;
    }
  }

  return -1; // item not found
}

// const array = [1, 2, 3, 4, 5];
// console.log(jumpSearch(array, 5));
