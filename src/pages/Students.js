import { useEffect } from "react";
import { Router, Switch } from "react-router";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { students } from "../data/students";
import StudentDetails from "./StudentDetails"

export default function Students() {
  useEffect(() => {
    // Get student from '../data/students'
    console.log(students);
  }, []);

  const { url } = useRouteMatch();

  return (
    <div>
      <ul>
        {[...students].map((student, id) => (
          <li key={id}>
            <Link to={`${url}/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        {/* <Route path={`${url}/:id`} >
          <StudentDetails />
        </Route> */}
        <Route path={`${url}/:id`} children={<StudentDetails />} />
      </Switch>
    </div>
  );
}