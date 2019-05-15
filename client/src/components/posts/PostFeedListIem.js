import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

// Own Imports
import {
  startDeletePost,
  startAddLikeToPost,
  startRemoveLikeFromPost
} from "../../actions/posts";

class PostFeedListIem extends Component {
  onLikeClick = postId => {
    this.props.startAddLikeToPost(postId);
  };

  onUnLikeClick = postId => {
    this.props.startRemoveLikeFromPost(postId);
  };

  findUserLick = likes => {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  onDeleteClick = postId => {
    this.props.startDeletePost(postId);
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/asd`}>
              {post.avatar ? (
                <img className="rounded-circle" src={post.avatar} alt="" />
              ) : (
                <img
                  className="rounded-circle"
                  src="/images/dummy-user.jpg"
                  alt=""
                />
              )}
            </Link>

            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>

            {showActions ? (
              <div>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("text-secondary fas fa-thumbs-up", {
                      "text-info": this.findUserLick(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onUnLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={() => this.onDeleteClick(post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostFeedListIem.defaultProps = {
  showActions: true
};

PostFeedListIem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  startDeletePost: PropTypes.func.isRequired,
  startAddLikeToPost: PropTypes.func.isRequired,
  startRemoveLikeFromPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startDeletePost: postId => dispatch(startDeletePost(postId)),
  startAddLikeToPost: postId => dispatch(startAddLikeToPost(postId)),
  startRemoveLikeFromPost: postId => dispatch(startRemoveLikeFromPost(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeedListIem);
