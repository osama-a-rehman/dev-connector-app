// Own Imports
// Import Actions
import { SET_CURRENT_USER } from "../actions/types";

// Import Validations
import isEmpty from "../validation/is_empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        // Used this isEmpty so that for logging out we could pass just empty user to logout the user
        user: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;
