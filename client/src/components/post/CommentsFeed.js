import React, { Component } from "react";
import PropTypes from "prop-types";

// Own Imports
import CommentFeedListItem from "./CommentFeedListItem";

class CommentsFeed extends Component {
  render() {
    const { comments, postId } = this.props;

    let content = comments.map(comment => (
      <CommentFeedListItem
        key={comment._id}
        comment={comment}
        postId={postId}
      />
    ));

    return <div>{content}</div>;
  }
}

CommentsFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentsFeed;
