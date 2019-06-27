import { GET_POSTS, DELETE_POST } from "./types";
const axios = require("axios");

const postsURL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = () => dispatch => {
  axios.get(postsURL).then(resp =>
    dispatch({
      type: GET_POSTS,
      payload: resp.data
    })
  );
};

export const delPost = post => dispatch => {
  dispatch({
    type: DELETE_POST,
    payload: post
  });
};
