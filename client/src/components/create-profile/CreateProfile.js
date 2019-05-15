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
import { startCreateProfile } from "../../actions/profiles";

class CreateProfile extends React.Component {
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
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    console.log("create-profile submitted");
    console.log(profileData);

    this.props.startCreateProfile(profileData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({
        errors: nextProps.errors
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
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  startCreateProfile: (profileData, history) =>
    dispatch(startCreateProfile(profileData, history))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateProfile)
);
