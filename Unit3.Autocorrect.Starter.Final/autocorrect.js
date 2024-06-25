const TODO = "REPLACE ME!!!";
// Note: There are some simple test cases at the bottom of this file!

/**
 * @param {string[]} topics - an array of topic words
 * @param {string} sentence - a space-separated string of words
 * @returns {boolean} whether `sentence` contains any of the words in `topics`
 */
const isRelevant = (topics, sentence) => {
  // Convert sentence into an array of words
  const words = sentence.split(' ');

  // Check if any topic word exists in the sentence
  for (let i = 0; i < topics.length; i++) {
    if (words.includes(topics[i])) {
      return true;
    }
  }

  return false;
};
console.log(true,isRelevant(dogWords, sentence));
console.log(false,isRelevant(catWords, sentence));

/**
 * @param {string[]} topics - an array of topic words
 * @returns {(sentence: string) => boolean} a function that takes a sentence
 *  and returns whether it is relevant to `topics`
 */
const about = (criterion) => (sentences) => {
  return sentences.filter(criterion);
};

console.log(true, aboutDogs(sentence1)); 
console.log(false, aboutDogs(sentence2)); 
console.log(true, aboutDogs(sentence3)); 

/**
 * @param {(sentence: string) => boolean} criterion - a function that
 *  takes a sentence and returns a boolean
 * @param {string[]} sentences - an array of space-separated strings of words
 * @returns {string[]} the subset of `sentences` for which `criterion` returns true
 */

const getRelevantSentences = (criterion) => (sentences) => {
  return sentences.filter(sentence => criterion(sentence));
};

console.log(true, aboutDogs([sentence1])); 
console.log(false, aboutDogs([sentence2])); 
console.log(true, aboutDogs([sentence3]));

/**
 * @param {string} str1 - the first string to compare
 * @param {string} str2 - the second string to compare
 * @returns {number} the absolute difference in length between `str1` and `str2`
 */
const getDistanceByLength = (str1, str2) => {
  return Math.abs(str1.length - str2.length);
};
console.log(1, getDistanceByLength("hi", "hey")); 
console.log(0, getDistanceByLength("hi", "hi")); 
console.log(5, getDistanceByLength("hello", "world")); 

/**
 * @param {string} word - the original string
 * @param {string[]} words - an array of strings
 * @param {(str1: string, str2: string) => number} distanceFn - a function that
 *  takes two strings and returns a number representing the distance between them
 * @param {number} threshold - the maximum distance that is still considered "close"
 * @returns {string} the string in `words` with the minimum distance to `word`
 *  as calculated by `distanceFn`, unless that distance is strictly greater than
 *  the `threshold`, in which case the original `word` is returned.
 */
const getClosestWord = (word, words, distanceFn, threshold) => {
  let minDistance = Infinity;
  let closestWord = word; // Default to returning the original word if no close match found

  // Iterate through each word in the array
  words.forEach((w) => {
    // Calculate the distance between `word` and current `w`
    const distance = distanceFn(word, w);

    // Update closestWord if current `w` is closer and within threshold
    if (distance < minDistance && distance <= threshold) {
      minDistance = distance;
      closestWord = w;
    }
  });

  return closestWord;
};


/**
 * @param {string} word - the original string
 * @param {string[]} words - an array of strings
 * @param {number} threshold - the maximum distance that is still considered "close"
 * @returns {string} the string in `words` that is the closest to `word` in _length_,
 *  unless that distance is strictly greater than the `threshold`,
 *  in which case the original `word` is returned.
 */
const getClosestWordByLength = (word, words, threshold) => {
  let minDifference = Infinity;
  let closestWord = word; // Default to returning the original word if no close match found

  // Iterate through each word in the array
  words.forEach((w) => {
    // Calculate the absolute difference in length between `word` and current `w`
    const difference = Math.abs(word.length - w.length);

    // Update closestWord if current `w` has a closer length and is within threshold
    if (difference < minDifference && difference <= threshold) {
      minDifference = difference;
      closestWord = w;
    }
  });

  return closestWord;
};

let words = ["bed", "bank", "fence", "bridges"];
console.log("bed", getClosestWordByLength("hi", words, 3));
console.log("hi", getClosestWordByLength("hi", words, 0)); 
console.log("fence", getClosestWordByLength("rivers", words, 2));


/* === Simple Test Cases === */
// The provided logs print the expected output first.

console.log("--- isRelevant ---");
const sentence = "the quick brown fox jumps over the lazy dog";
const catWords = ["cat", "kitten"];
const dogWords = ["dog", "puppy"];

console.log(true, isRelevant(dogWords, sentence));
console.log(false, isRelevant(catWords, sentence));

console.log("--- about ---");
const aboutDogs = about(dogWords);
console.log(true, aboutDogs(sentence));
console.log(false, aboutDogs("this sentence is about cats"));

console.log("--- getRelevantSentences ---");
const sentences = [
  "I have a pet dog",
  "I have a pet cat",
  "I don't have any pets",
];
console.log(["I have a pet dog"], getRelevantSentences(aboutDogs, sentences));
console.log(
  ["I don't have any pets"],
  getRelevantSentences((s) => s.length > 17, sentences)
);

console.log("--- getClosestWord ---");
let words = ["bed", "bank", "fence", "bridges"];
console.log("bed", getClosestWord("hi", words, getDistanceByLength, 3));
console.log("hi", getClosestWord("hi", words, getDistanceByLength, 0));
console.log("fence", getClosestWord("rivers", words, getDistanceByLength, 2));

console.log("--- getClosestWordByLength ---");
console.log("bed", getClosestWordByLength("hi", words, 3));
console.log("hi", getClosestWordByLength("hi", words, 0));
console.log("fence", getClosestWordByLength("rivers", words, 2));
