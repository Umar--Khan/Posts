import { GET_POSTS, DELETE_POST } from "../actions/types";

const initialState = {
  posts: "",
  wordCount: "",
  frequentWords: ""
};

// Word Count
let count = 0;

const countWords = str => {
  count += str.body.match(/(\w+)/g).length;
  return count;
};

const deductCount = str => {
  count -= str.match(/(\w+)/g).length;
  return count;
};

//FreqWords
let top5Words = "";

//FreqWords - Tally function
const wordFreq = post => {
  const words = post.body.replace(/[.]/g, "").split(/\s/);
  let freqMap = {};
  words.forEach(w => {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });
  return freqMap;
};

//FreqWords - Tally function
const wordListMap = posts => {
  const res = {};
  const list = posts.map(post => wordFreq(post));
  [...list].map(item => {
    Object.keys(item).map(iter => {
      if (res.hasOwnProperty(iter)) {
        res[iter] = res[iter] + item[iter];
      } else {
        res[iter] = item[iter];
      }
    });
  });
  sortList(res);
};

//FreqWords - Sort by highest function
const sortList = list => {
  let arr = Object.keys(list).sort((a, b) => list[b] - list[a]);
  top5Words = arr.slice(0, 5);
};

// Redux
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      action.payload.map(post => countWords(post));
      wordListMap(action.payload);
      return {
        ...state,
        posts: action.payload,
        wordCount: count,
        frequentWords: top5Words
      };
    case DELETE_POST:
      const postId = action.payload.id;
      const postBody = action.payload.body;
      deductCount(postBody);
      wordListMap(state.posts);
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId),
        wordCount: count,
        frequentWords: top5Words
      };
    default:
      return state;
  }
}
