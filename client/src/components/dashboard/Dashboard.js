import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Own Imports
import Spinner from "../common/Spinner";
import Experience from "./Experience";
import Education from "./Education";

import {
  startGetCurrentProfile,
  startDeleteAccount
} from "../../actions/profiles";

// Import Components
import ProfileActions from "./ProfileActions";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.startGetCurrentProfile();
  }

  onDeleteClick = event => {
    this.props.startDeleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>

            <Link className="btn btn-lg btn-info" to="/create-profile">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  startGetCurrentProfile: PropTypes.func.isRequired,
  startDeleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startGetCurrentProfile: () => dispatch(startGetCurrentProfile()),
  startDeleteAccount: () => dispatch(startDeleteAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
