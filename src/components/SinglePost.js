import React from "react";
import { connect } from "react-redux";
import { delPost } from "../actions/postActions";

const SinglePost = ({ post, delPost } = this.props) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => delPost(post)}>Delete</button>
    </div>
  );
};

export default connect(
  null,
  { delPost }
)(SinglePost);
