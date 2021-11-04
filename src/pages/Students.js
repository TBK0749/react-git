import { useContext } from "react";
import { Link } from "react-router-dom";
import { StudentsContext } from "../context/StudentsContext";
import { Button, Table, } from '@mantine/core';


// 1. ไฟล์นี้ถูก render
// 2. React router พบว่ามี switch มันเลยทำการเช็ค path ปัจจุบันคือ /students

// Bugs
// 1. Can't create new student after removed all the student in the students array

// Requirement does not complete
// 1. The app didn't ask the user to confirm when delete

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);

  const rows = [...students].map((student, id) => (
    <tr key={id}>
      <td className="w-8">{student.id}</td>
      <td className="w-60"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
      <td className="w-40">
        <Link to={`/students/${student.id}/edit`}>
          <Button className="mr-1" variant="default" color="red" >
            Edit
          </Button>
        </Link>
        <Button
          color="red"
          value={student.id}
          onClick={() => {

            const result = window.confirm('Do you want to delete?');

            if (result) {
              const cloneStudents = [...students];
              const findId = (element) => element.id === student.id;
              const startDelete = cloneStudents.findIndex(findId);
              cloneStudents.splice(startDelete, 1);

              setStudents(cloneStudents);
            }
            console.log(result);
          }}
        >Delete</Button>
      </td>
    </tr>
  ))
  console.log(students);

  return (
    <div className="space-y-4">
      <div className="flow-root">
        <div className="my-4">
          <Link to="students/create">
            <Button variant="default" color="teal">
              Create Student
            </Button>
          </Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th className="w-6">ID</th>
              <th className="w-60">Name</th>
              <th className="w-40">Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </div>
  );
}