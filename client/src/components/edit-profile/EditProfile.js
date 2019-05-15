import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Own Imports
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

// Import Actions
import {
  startCreateProfile,
  startGetCurrentProfile
} from "../../actions/profiles";

// Import Utils
import isEmpty from "../../validation/is_empty";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      github_username: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  onChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState(() => ({
      [inputName]: inputValue
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github_username: this.state.github_username,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linked_in: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    console.log("edit-profile submitted");
    console.log(profileData);

    this.props.startCreateProfile(profileData, this.props.history);
  };

  componentDidMount() {
    this.props.startGetCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({
        errors: nextProps.errors
      }));
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesn't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.github_username = !isEmpty(profile.github_username)
        ? profile.github_username
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linked_in)
        ? profile.social.linked_in
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState(() => ({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        github_username: profile.github_username,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram
      }));
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    // Select options for status
    const selectOptions = [
      {
        label: "* Select Professional Status",
        value: 0
      },

      {
        label: "Developer",
        value: "Developer"
      },

      {
        label: "Junior Developer",
        value: "Junior Developer"
      },

      {
        label: "Senior Developer",
        value: "Senior Developer"
      },

      {
        label: "Manager",
        value: "Manager"
      },

      {
        label: "Student or Learning",
        value: "Student or Learning"
      },

      {
        label: "Instructor or Teacher",
        value: "Instructor or Teacher"
      },

      {
        label: "Intern",
        value: "Intern"
      },

      {
        label: "Other",
        value: "Other"
      }
    ];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            className="form-control form-control-lg"
            placeholder="Twitter Page URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            icon="fab fa-twitter"
          />

          <InputGroup
            className="form-control form-control-lg"
            placeholder="Facebook Page URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            icon="fab fa-facebook"
          />

          <InputGroup
            className="form-control form-control-lg"
            placeholder="Linkedin Page URL"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
            icon="fab fa-linkedin"
          />

          <InputGroup
            className="form-control form-control-lg"
            placeholder="Youtube Channel URL"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            icon="fab fa-youtube"
          />

          <InputGroup
            className="form-control form-control-lg"
            placeholder="Instagram Page URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            icon="fab fa-instagram"
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)"
                />

                <SelectListGroup
                  className="form-control form-control-lg"
                  placeholder="* Profile handle"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  options={selectOptions}
                />

                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own or a company website"
                />

                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />

                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Github Username"
                  name="github_username"
                  value={this.state.github_username}
                  onChange={this.onChange}
                  error={errors.github_username}
                  info="If you want your latest repos and a Github link, include
                    your username"
                />

                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light mr-3"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  startCreateProfile: PropTypes.func.isRequired,
  startGetCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  startCreateProfile: (profileData, history) =>
    dispatch(startCreateProfile(profileData, history)),
  startGetCurrentProfile: () => dispatch(startGetCurrentProfile())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)
);
