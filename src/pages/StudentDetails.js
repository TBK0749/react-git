import { useParams } from "react-router";
import { students } from "../data/students";
import { StudentsContext } from "../context/StudentsContext";
import { useContext } from "react";

// const students = [
//   {id: 1, name: 'John Doe', bio: 'John is a man'},
//   {id: 2, name: 'Jane Doe', bio: 'Jane is a girl'},
//   {id: 3, name: 'Marie Joshoua', bio: 'Marie is a girl/man'},
// ];

export default function StudentDetails() {
  const { students, setStudents } = useContext(StudentsContext);
  const { studentId } = useParams(); // https://reactrouter.com/web/example/url-params
  const student = students.find(student => student.id === Number(studentId));

  if (student === undefined) return <div>student not found</div>;

  return (
    <div>
      <h1>{`No.${student.id} ${student.name}`}</h1>
      <h2>Bio</h2>
      <p>{student.bio}</p>
    </div>
  );
}