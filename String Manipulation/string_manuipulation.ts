function countVowel(string: string): number {
  const isVowel = (char: string) => ['a', 'e', 'i', 'o', 'u'].includes(char);
  return [...string].reduce((acc, char) => (isVowel(char) ? acc + 1 : acc), 0);
}
console.assert(countVowel('hello') === 2);
console.assert(countVowel('h') === 0);
console.assert(countVowel('') === 0);

function reverseString(string: string): string {
  let i = string.length - 1,
    reverseString = '';
  while (i > -1) reverseString += string[i--];
  return reverseString;
}
console.assert(reverseString('hello') === 'olleh');
console.assert(reverseString('') === '');

function reverseWordOrder(string: string) {
  const tokens = string.split(' ');
  let i = tokens.length - 1,
    reverseString = '';
  while (i > -1) reverseString += tokens[i--] + ' ';
  return reverseString.slice(0, -1);
}

console.assert(
  reverseWordOrder('Trees are beautiful') === 'beautiful are Trees'
);
console.assert(reverseWordOrder('') === '');

function isRotatedString(string1: string, string2: string): boolean {
  const length = string1.length;
  if (length !== string2.length) return false;
  if (length === 0) return true;

  let lastChar;
  for (let i = 0; i < length; i++) {
    if (string1 === string2) return true;
    lastChar = string2.charAt(length - 1);
    string2 = lastChar + string2.substring(0, length - 1);
  }

  return false;
}

console.assert(isRotatedString('abcd', 'dabc') === true);
console.assert(isRotatedString('abcd', 'cdab') === true);
console.assert(isRotatedString('abcd', 'adbc') === false);
console.assert(isRotatedString('', '') === true);
console.assert(isRotatedString('a', '') === false);

function removeDuplicatedChar(string: string): string {
  const length = string.length;
  if (length === 0 || length === 1) return string;

  let i = 0;
  let dedup = string[i];
  let ahead = i + 1;
  while (ahead < length) {
    if (string[i] !== string[ahead]) {
      i = ahead;
      dedup += string[i];
    }
    ahead++;
  }

  return dedup;
}

console.assert(removeDuplicatedChar('hellooo!!') === 'helo!');
console.assert(removeDuplicatedChar('') === '');
console.assert(removeDuplicatedChar('helo!') === 'helo!');

function findMostRepeatedChar(string: string): string {
  let count = {};

  [...string].forEach((char) => {
    count = count[char]
      ? { ...count, [char]: count[char] + 1 }
      : { ...count, [char]: 1 };
  });

  let uniqueChar = Object.keys(count);
  let uniqueCharCount = uniqueChar.length;
  let largestCount = uniqueChar[0];

  while (uniqueCharCount > 0) {
    if (uniqueChar[uniqueCharCount--] > largestCount) uniqueChar.shift();
  }

  return uniqueChar[0];
}
console.assert(findMostRepeatedChar('Hellooo!!') === 'o');

function capitalize(word: string): string {
  let length = word.length;
  if (length === 0) return '';
  let firstLetter = word[0].toUpperCase();
  if (length === 1) return firstLetter;
  return firstLetter + word.substring(1);
}

console.assert(capitalize('one') === 'One');
console.assert(capitalize('') === '');
console.assert(capitalize('one ') === 'One ');

function removeSpace(sentence: string) {
  return sentence
    .split(' ')
    .filter((token) => token !== '')
    .join(' ');
}

console.assert(removeSpace('  a   ') === 'a');
console.assert(removeSpace('  a    b  ') === 'a b');

function removeSpaceAndCapitalize(sentence: string): string {
  return removeSpace(sentence)
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

console.assert(
  removeSpaceAndCapitalize(' trees    are     beautiful  ') ===
    'Trees Are Beautiful'
);

console.assert(
  removeSpaceAndCapitalize('trees    are     beautiful  ') ===
    'Trees Are Beautiful'
);

console.assert(
  removeSpaceAndCapitalize('   trees    are     beautiful') ===
    'Trees Are Beautiful'
);

console.assert(
  removeSpaceAndCapitalize('   trees    1are     beautiful') ===
    'Trees 1are Beautiful'
);

console.assert(removeSpaceAndCapitalize('   ') === '');

/* 
isAnagram:
Detect if two strings are anagram of each other. A string is an
anagram of another string if it has the exact same characters in any
order. 
*/
function isAnagram(string1: string, string2: string): boolean {
  if (string1.length !== string2.length) return false;

  let i;
  for (let char of string1) {
    i = string2.indexOf(char);
    if (i === -1) return false;
    string2 = string2.slice(0, i) + string2.slice(i + 1);
  }

  return string2.length === 0;
}

console.assert(isAnagram('abcd', 'adbc') === true);
console.assert(isAnagram('abcd', 'abcd') === true);
console.assert(isAnagram('abcd', 'abce') === false);

function isPalindrome(string: string): boolean {
  let reverseIndex = string.length - 1;

  for (let char of string) {
    if (char !== string[reverseIndex]) return false;
    reverseIndex--;
  }

  return true;
}

console.assert(isPalindrome('abba') === true);
console.assert(isPalindrome('abcba') === true);
console.assert(isPalindrome('abca') === false);
