import React, { Component } from "react";

import SinglePost from "./SinglePost";

import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, wordCount, frequentWords } = this.props;
    return (
      <div>
        <h1>Posts</h1>
        <h3>Total word count: {wordCount}</h3>
        <h3>Top 5 Words used: {frequentWords && frequentWords.join(", ")}</h3>
        {posts && posts.map(post => <SinglePost post={post} key={post.id} />)}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.post.posts,
  wordCount: state.post.wordCount,
  frequentWords: state.post.frequentWords
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
