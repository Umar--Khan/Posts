import { GET_POSTS, DELETE_POST } from "../actions/types";

const initialState = {
  posts: "",
  wordCount: "",
  frequentWords: ""
};

let count = 0;

const countWords = str => {
  count += str.body.match(/(\w+)/g).length;
  return count;
};

const deductCount = str => {
  count -= str.match(/(\w+)/g).length;
  return count;
};

let top5Words = "";

const wordFreq = post => {
  const words = post.body.replace(/[.]/g, "").split(/\s/);
  let freqMap = {};
  words.forEach(function(w) {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });

  return freqMap;
};

const wordListMap = posts => {
  let list;
  list = posts.map(post => wordFreq(post));
  sortList(list);

  console.log(list);
};

const sortList = list => {
  let list2 = list[0];
  let arr = Object.keys(list2).sort((a, b) => list2[b] - list2[a]);

  //Attempt to merge
  let newAttempt = list.map(list =>
    Object.keys(list).sort((a, b) => list[b] - list[a])
  );

  top5Words = arr.slice(0, 5);
  console.log(top5Words);

  console.log(newAttempt);
};

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
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId),
        wordCount: count
      };
    default:
      return state;
  }
}
