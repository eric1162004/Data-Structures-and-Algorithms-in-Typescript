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
}

class Tries {
  root: TriesNode;

  constructor() {
    this.root = new TriesNode();
  }

  insert(word: string) {
    word = word.toLocaleLowerCase();

    let current = this.root;
    let char;
    let i = 0;

    while (i < word.length) {
      char = word[i];

      if (current.children[char]) {
        current = current.children[char];
      } else {
        current.children[char] = new TriesNode(char);
        current = current.children[char];
      }

      i += 1;
    }

    current.isEndOfWord = true;
  }

  private charIndex(character: string): number {
    return character.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
  }
}

const tries = new Tries();
tries.insert('cat');
tries.insert('catch');
tries.insert('dog');
