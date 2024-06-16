/*
Tries

autocompletion
shared prefix words
store many words
fast look up O(L)
insert O(L)
delete O(L)
always has a empty root node

index = ch - 'a'

*/

class TriesNode {
  character?: string;
  isEndOfWord: boolean;
  private children: { [charCode: string]: TriesNode };

  constructor(character?: string) {
    this.character = character;
    this.children = {};
  }

  hasChild(char: string) {
    return this.children.hasOwnProperty(char);
  }

  addChild(char: string) {
    this.children[char] = new TriesNode(char);
  }

  getChild(char: string) {
    return this.children[char];
  }

  getChildren(): TriesNode[] {
    return Object.values(this.children);
  }

  hasChildren(): boolean {
    return Object.keys(this.children).length > 0;
  }

  removeChild(char: string) {
    if (this.hasChild(char)) {
      delete this.children[char];
    }
  }
}

class Tries {
  root: TriesNode = new TriesNode();

  insert(word: string) {
    word = word.toLocaleLowerCase();

    let current = this.root;

    for (const char of word) {
      if (!current.hasChild(char)) {
        current.addChild(char);
      }
      current = current.getChild(char);
    }

    current.isEndOfWord = true;
  }

  contains(word: string): boolean {
    word = word.toLocaleLowerCase();

    let current = this.root;

    for (const char of word) {
      if (!current.hasChild(char)) {
        return false;
      }
      current = current.getChild(char);
    }

    return current.isEndOfWord;
  }

  traverse() {
    this._traverse(this.root);
  }

  private _traverse(root: TriesNode) {
    // Pre-order: visit the root first

    // skip the root as it always contains no character
    if (root !== this.root) {
      console.log(root.character);
    }

    for (let child of root.getChildren()) {
      this._traverse(child);
    }
  }

  remove(word: string) {
    word = word.toLocaleLowerCase();
    
    // check if tries has that word
    if (!this.contains(word)) return;
    
    // use post-order traverse reach to the end of the branch
    this._remove(this.root, word, 0);
  }
  
  // Good example of using Post-order traverse!
  private _remove(root: TriesNode, word: string, index: number) {
    // terminating condition = when at the last character of the word
    if (index == word.length) {
      root.isEndOfWord = false;
      return;
    }

    // fucntion starts here!
    let char = word.charAt(index);
    let child = root.getChild(char);

    // Word is not in the tries
    if (!child) return;

    // recurse
    this._remove(child, word, index + 1);

    // back from recurse
    if (!child.hasChildren() && !child.isEndOfWord) {
      root.removeChild(char);
    }
  }
}

const tries = new Tries();

const values = ['car', 'care', 'dog'];

values.forEach((value) => {
  tries.insert(value);
});

// tries.remove("care");
// tries.remove("car");

// values.forEach((v) => {
//   console.log(v, tries.contains(v));
//   v = v + '!';
//   console.log(v, tries.contains(v));
// });

tries.traverse();

console.log('done');
