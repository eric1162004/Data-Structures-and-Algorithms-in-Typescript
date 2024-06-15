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
  children: { [charCode: string]: TriesNode };

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
}

const tries = new Tries();

const values = ['cat', 'catch', 'dog'];

values.forEach((value) => {
  tries.insert(value);
});

values.forEach((v) => {
  console.log(v, tries.contains(v));
  v = v + '!';
  console.log(v, tries.contains(v));
});
console.log('done');
