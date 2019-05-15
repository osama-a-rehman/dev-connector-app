import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Own Imports
import { startDeleteEducation } from "../../actions/profiles";

class Education extends Component {
  onDeleteClick = id => {
    this.props.startDeleteEducation(id);
  };

  render() {
    const educations = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from_date}</Moment> -{" "}
          {edu.current ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to_date}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(edu.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    let tableContent;

    if (educations.length === 0) {
      tableContent = (
        <p className="m-3">
          No Education Credentials found, Please add the Education Credentials
          to your profile
        </p>
      );
    } else {
      tableContent = (
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      );
    }

    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        {tableContent}
      </div>
    );
  }
}

Education.propTypes = {
  startDeleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startDeleteEducation: id => dispatch(startDeleteEducation(id))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Education);
