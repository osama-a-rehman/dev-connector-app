import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own Import
import Spinner from "../common/Spinner";
import ProfileListItem from "./ProfileListItem";

import { startGetAllProfiles } from "../../actions/profiles";

class Profiles extends Component {
  componentDidMount() {
    this.props.startGetAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileListItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>

              <div>{profileItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  startGetAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  startGetAllProfiles: () => {
    dispatch(startGetAllProfiles());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
