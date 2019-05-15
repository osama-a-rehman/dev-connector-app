import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own Imports
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { startAddComment } from "../../actions/posts";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const commentData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.startAddComment(postId, commentData);
    this.setState(() => ({ text: "" }));
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => ({
      [name]: value
    }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({
        errors: nextProps.errors
      }));
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  startAddComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startAddComment: (postId, commentData) =>
    dispatch(startAddComment(postId, commentData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
