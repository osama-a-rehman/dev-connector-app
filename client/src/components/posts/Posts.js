import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own Imports
import PostForm from "./PostForm";
import PostsFeed from "./PostsFeed";
import Spinner from "../common/Spinner";

import { startGetPosts } from "../../actions/posts";

class Posts extends Component {
  componentDidMount() {
    this.props.startGetPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postsContent;

    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      postsContent = <PostsFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  startGetPosts: () => dispatch(startGetPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
