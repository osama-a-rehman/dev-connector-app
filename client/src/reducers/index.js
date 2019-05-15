import { combineReducers } from "redux";

// Own Imports
import authReducer from "./auth";
import errorsReducer from "./errors";
import profilesReducer from "./profiles";
import postsReducer from "./posts";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profilesReducer,
  post: postsReducer
});
