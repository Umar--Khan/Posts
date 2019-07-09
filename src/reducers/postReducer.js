import { GET_POSTS, DELETE_POST } from "../actions/types";
import { wordListMap, countWords, deductCount } from "./helperPostMethods";

const initialState = {
  posts: "",
  wordCount: 0,
  frequentWords: ""
};

// Redux
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      action.payload.map(post => countWords(post, state));
      return {
        ...state,
        posts: action.payload,
        wordCount: state.wordCount,
        frequentWords: wordListMap(action.payload, state)
      };
    case DELETE_POST:
      const postId = action.payload.id;
      const postBody = action.payload.body;
      deductCount(postBody, state);
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId),
        wordCount: state.wordCount,
        frequentWords: wordListMap(state.posts, state)
      };
    default:
      return state;
  }
}
