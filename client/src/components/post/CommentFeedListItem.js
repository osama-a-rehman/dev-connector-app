import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { startDeleteComment } from "../../actions/posts";

class CommentFeedListItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.startDeleteComment(postId, commentId);
  };

  render() {
    const { auth, comment, postId } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            {comment.avatar ? (
              <img className="rounded-circle" src={comment.avatar} alt="" />
            ) : (
              <img
                className="rounded-circle"
                src="/images/dummy-user.jpg"
                alt=""
              />
            )}

            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            {comment.user === auth.user.id ? (
              <button
                onClick={() => this.onDeleteClick(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentFeedListItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  startDeleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startDeleteComment: (postId, commentId) =>
    dispatch(startDeleteComment(postId, commentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFeedListItem);
