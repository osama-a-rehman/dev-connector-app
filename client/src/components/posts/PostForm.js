import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own Imports
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { startAddPost } from "../../actions/posts";

class PostForm extends Component {
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

    const postData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.startAddPost(postData);
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
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
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

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  startAddPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startAddPost: postData => dispatch(startAddPost(postData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
