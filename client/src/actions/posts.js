import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

export const setPostLoading = () => ({
  type: POST_LOADING
});

const addPost = post => ({
  type: ADD_POST,
  payload: post
});

export const startAddPost = postData => {
  return dispatch => {
    dispatch(clearErrors());

    axios
      .post("/api/posts", postData)
      .then(response => {
        dispatch(addPost(response.data));
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

const getPosts = posts => ({
  type: GET_POSTS,
  payload: posts
});

export const startGetPosts = () => {
  return dispatch => {
    dispatch(setPostLoading());

    axios
      .get("/api/posts")
      .then(response => {
        dispatch(getPosts(response.data));
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

const getPost = post => ({
  type: GET_POST,
  payload: post
});

export const startGetPost = postId => {
  return dispatch => {
    dispatch(setPostLoading());

    console.log("action id: " + postId);
    console.log(`action call: /api/posts/${postId}`);

    axios
      .get(`/api/posts/${postId}`)
      .then(response => {
        dispatch(getPost(response.data));
      })
      .catch(error => {
        dispatch(getPost(null));
      });
  };
};

const deletePost = postId => ({
  type: DELETE_POST,
  payload: postId
});

export const startDeletePost = postId => {
  return dispatch => {
    if (
      window.confirm(
        "Are you sure to delete this Post ? This cannot be Undone!"
      )
    ) {
      axios
        .delete(`/api/posts/${postId}`)
        .then(response => {
          dispatch(deletePost(postId));
        })
        .catch(error => {
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          });
        });
    }
  };
};

/*
  LIKES SECTION
*/

export const startAddLikeToPost = postId => {
  return dispatch => {
    axios
      .post(`/api/posts/like/${postId}`)
      .then(response => {
        dispatch(startGetPosts());
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const startRemoveLikeFromPost = postId => {
  return dispatch => {
    axios
      .post(`/api/posts/unlike/${postId}`)
      .then(response => {
        dispatch(startGetPosts());
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

/*
  COMMENTS SECTION
*/

export const startAddComment = (postId, commentData) => {
  return dispatch => {
    dispatch(clearErrors());

    axios
      .post(`/api/posts/comment/${postId}`, commentData)
      .then(response => {
        dispatch(getPost(response.data));
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const startDeleteComment = (postId, commentId) => {
  return dispatch => {
    if (
      window.confirm(
        "Are you sure to delete this Comment ? This cannot be Undone!"
      )
    ) {
      axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(response => {
          dispatch(getPost(response.data));
        })
        .catch(error => {
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          });
        });
    }
  };
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
