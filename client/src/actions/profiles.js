import axios from "axios";

// Own Imports
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from "./types";
import { startLogOutUser } from "./auth";

export const getCurrentProfile = profile => ({
  type: GET_PROFILE,
  payload: profile
});

export const startGetCurrentProfile = () => {
  return disaptch => {
    disaptch(setProfileLoading());

    axios
      .get("/api/profile")
      .then(response => {
        // console.log("startGetCurrentProfile then - In profiles Action");
        // console.log(response.data);

        disaptch(getCurrentProfile(response.data));
      })
      .catch(error => {
        disaptch(getCurrentProfile({}));
      });
  };
};

export const startGetProfileByHandle = handle => {
  return disaptch => {
    disaptch(setProfileLoading());

    axios
      .get(`/api/profile/handle/${handle}`)
      .then(response => {
        // console.log("startGetProfileByHandle then - In profiles Action");
        // console.log(response.data);

        disaptch(getCurrentProfile(response.data));
      })
      .catch(error => {
        disaptch(getCurrentProfile(null));
      });
  };
};

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

export const startCreateProfile = (profileData, history) => {
  return dispatch => {
    axios
      .post("/api/profile", profileData)
      .then(response => {
        // console.log("startCreateProfile then - In profiles Action");
        // console.log(response.data);

        history.push("/dashboard");
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const startDeleteAccount = () => {
  return dispatch => {
    if (
      window.confirm("Are you sure to delete Account ? This cannot be Undone!")
    ) {
      axios
        .delete("/api/profile")
        .then(response => {
          dispatch(startLogOutUser());
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
  PROFILES SECTION
*/

const getProfiles = profiles => ({
  type: GET_PROFILES,
  payload: profiles
});

export const startGetAllProfiles = () => {
  return disaptch => {
    disaptch(setProfileLoading());

    axios
      .get("/api/profile/all")
      .then(response => {
        // console.log("startGetAllProfiles then - In profiles Action");
        // console.log(response.data);

        disaptch(getProfiles(response.data));
      })
      .catch(error => {
        disaptch(getProfiles(null));
      });
  };
};

/*
  CREDENTIALS SECTION
*/

export const startAddExperience = (experienceData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/experience", experienceData)
      .then(response => {
        history.push("/dashboard");
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const startDeleteExperience = experienceId => {
  return dispatch => {
    if (
      window.confirm(
        "Are you sure to delete this Experience ? This cannot be Undone!"
      )
    ) {
      axios
        .delete(`/api/profile/experience/${experienceId}`)
        .then(response => {
          dispatch(startGetCurrentProfile());
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

export const startAddEducation = (educationData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/education", educationData)
      .then(response => {
        history.push("/dashboard");
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const startDeleteEducation = educationId => {
  return dispatch => {
    if (
      window.confirm(
        "Are you sure to delete this Education ? This cannot be Undone!"
      )
    ) {
      axios
        .delete(`/api/profile/education/${educationId}`)
        .then(response => {
          dispatch(startGetCurrentProfile());
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
