/* 

allocate an array with k buckets,
each bucket contain a linklist

send item to the buckets according to:
bucket = floor(item % numberOfBuckets)

space = O(n+k) n=items, k buckets

time complexity
                    best        worst
Distribution:       O(n)        O(n)
iterate bucket:     O(k)        O(k)
sorting         :   O(1)        O(n^2)   best case: linklist has one item    
total           :   O(n+k)      O(n^2)    

Bottomline: the more the bucket allocated, the closer to O(n+k)

*/

class LNode<T> {
  next: LNode<T> | null;
  data: T;

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T> {
  head: LNode<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a new node to the end of the list
  append(data) {
    const newNode = new LNode<T>(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current?.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Get the node at a specific index
  get(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let count = 0;
    while (current && count < index) {
      current = current.next;
      count++;
    }
    return current.data;
  }

  // Merge two sorted linked lists
  merge(left, right) {
    let result = new LNode(null);
    let current = result;

    while (left && right) {
      if (left.data <= right.data) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }

    current.next = left || right; // Append remaining elements

    return result.next;
  }

  // Split the linked list into halves (recursive)
  split(head) {
    if (!head || !head.next) {
      return head;
    }

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    const secondHalf = slow.next;
    slow.next = null; // Detach the second half

    return [head, secondHalf];
  }

  // Merge Sort implementation (recursive)
  mergeSort(head) {
    if (!head || !head.next) {
      return head;
    }

    const [left, right] = this.split(head);

    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  sort() {
    this.head = this.mergeSort(this.head);
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

function bucketSort(array: number[], numberOfBuckets: number) {
  const buckets: LinkedList<LinkedList<number>> = new LinkedList<
    LinkedList<number>
  >();

  for (let i = 0; i < numberOfBuckets; i++) {
    buckets.append(new LinkedList<number>());
  }

  for (let item of array) {
    const bucketIndex = Math.floor(item / numberOfBuckets);
    buckets.get(bucketIndex)?.append(item);
  }

  let i = 0;
  for (let bucket of buckets) {
    // console.log("pre", bucket);
    bucket.sort();
    // console.log("post", bucket);
    for (let item of bucket) {
      array[i++] = item;
    }
  }
}

// const array = [6, 2, 5, 4, 3, 7];
// const array = [1, 2, 3, 4, 5];
// bucketSort(array, 5);
// console.log(array);
