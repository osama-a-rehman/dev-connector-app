import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own Imports
import { startAddEducation } from "../../actions/profiles";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      field_of_study: "",
      from_date: "",
      to_date: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => ({
      [name]: value
    }));
  };

  onCheck = () => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      field_of_study: this.state.field_of_study,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      description: this.state.description,
      current: this.state.current
    };

    this.props.startAddEducation(educationData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({
        errors: nextProps.errors
      }));
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />

                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="field_of_study"
                  value={this.state.field_of_study}
                  onChange={this.onChange}
                  error={errors.field_of_study}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from_date"
                  value={this.state.from_date}
                  onChange={this.onChange}
                  error={errors.from_date}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to_date"
                  value={this.state.to_date}
                  onChange={this.onChange}
                  error={errors.to_date}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Underway
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />

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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  startAddEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  startAddEducation: (educationData, history) => {
    dispatch(startAddEducation(educationData, history));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEducation)
);
