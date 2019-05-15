import React, { Component } from "react";
import Moment from "react-moment";
import isEmpty from "../../validation/is_empty";

class ProfileCredentials extends Component {
  render() {
    const { education, experience } = this.props;

    const educationItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="MMM YYYY">{edu.from_date}</Moment> -{" "}
          {edu.to_date === null ? (
            "Now"
          ) : (
            <Moment format="MMM YYYY">{edu.to_date}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong> {edu.field_of_study}
        </p>

        {isEmpty(edu.description) ? null : (
          <p>
            <strong>Description: </strong> {edu.description}
          </p>
        )}
      </li>
    ));

    const experienceItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="MMM YYYY">{exp.from_date}</Moment> -{" "}
          {exp.to_date === null ? (
            "Now"
          ) : (
            <Moment format="MMM YYYY">{exp.to_date}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>

        {isEmpty(exp.location) ? null : (
          <p>
            <strong>Location: </strong> {exp.location}
          </p>
        )}

        {isEmpty(exp.description) ? null : (
          <p>
            <strong>Description: </strong> {exp.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>

          {experienceItems.length > 0 ? (
            <ul className="list-group">{experienceItems}</ul>
          ) : (
            <p className="lead text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>

          {educationItems.length > 0 ? (
            <ul className="list-group">{educationItems}</ul>
          ) : (
            <p className="lead text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCredentials;
