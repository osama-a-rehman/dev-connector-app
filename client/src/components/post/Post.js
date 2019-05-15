import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Own Imports
import Spinner from "../common/Spinner";
import PostFeedListItem from "../posts/PostFeedListIem";
import CommentForm from "./CommentForm";
import CommentsFeed from "./CommentsFeed";

import isEmpty from "../../validation/is_empty";

import { startGetPost } from "../../actions/posts";

class Post extends Component {
  componentDidMount() {
    console.log("id: " + this.props.match.params.id);
    this.props.startGetPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    console.log("Keys: " + Object.keys(post));

    if (post === null || loading || isEmpty(post)) {
      console.log("Spinner");
      postContent = <Spinner />;
    } else {
      console.log("postContent");

      postContent = (
        <div>
          <PostFeedListItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentsFeed comments={post.comments} postId={post._id} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  startGetPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  startGetPost: postId => dispatch(startGetPost(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
