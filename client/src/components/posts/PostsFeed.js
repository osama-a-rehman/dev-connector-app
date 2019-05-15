import React, { Component } from "react";
import PropTypes from "prop-types";

// Own Imports
import PostFeedListItem from "./PostFeedListIem";

class PostsFeed extends Component {
  render() {
    const { posts } = this.props;

    let content = posts.map(post => (
      <PostFeedListItem key={post._id} post={post} />
    ));

    return <div>{content}</div>;
  }
}

PostsFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsFeed;
