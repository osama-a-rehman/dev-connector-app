import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply token to every request header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
