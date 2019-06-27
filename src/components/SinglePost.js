import React, { Component } from "react";
import { connect } from "react-redux";
import { delPost } from "../actions/postActions";

class SinglePost extends Component {
  render() {
    const { post, delPost } = this.props;
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button onClick={() => delPost(post)}>Delete</button>
      </div>
    );
  }
}

export default connect(
  null,
  { delPost }
)(SinglePost);
