import PropTypes from "prop-types";
import { createContext } from "react";

export const CourseDetails = createContext();

export const CourseData = (props) => {
  const value = {};
  return (
    <CourseDetails.Provider value={value}>
      {props.children}
    </CourseDetails.Provider>
  );
};

CourseData.propTypes = {
  children: PropTypes.node.isRequired,
};
