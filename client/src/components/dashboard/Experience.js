import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Own Imports
import { startDeleteExperience } from "../../actions/profiles";

class Experience extends Component {
  onDeleteClick = id => {
    this.props.startDeleteExperience(id);
  };

  render() {
    const experiences = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from_date}</Moment> -{" "}
          {exp.current ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to_date}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(exp.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    let tableContent;

    if (experiences.length === 0) {
      tableContent = (
        <p className="m-3">
          No Experience Credentials found, Please add the Experience Credentials
          to your profile
        </p>
      );
    } else {
      tableContent = (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      );
    }

    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        {tableContent}
      </div>
    );
  }
}

Experience.propTypes = {
  startDeleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startDeleteExperience: id => dispatch(startDeleteExperience(id))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Experience);
