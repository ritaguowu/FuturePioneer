import { useContext } from "react";

import CourseContext from "./courseContext";

export default useCourse = () => {
  const { courseName, setCourseName } = useContext(CourseContext);

  const newCourse = (newName) => {
    setCourseName(newName);
  };

  return { courseName, newCourse };
};
