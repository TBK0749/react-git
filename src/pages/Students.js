import { useContext } from "react";
import { Link } from "react-router-dom";
import { StudentsContext } from "../context/StudentsContext";
import { Button, Table, } from '@mantine/core';


// 1. ไฟล์นี้ถูก render
// 2. React router พบว่ามี switch มันเลยทำการเช็ค path ปัจจุบันคือ /students

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);


  const rows = [...students].map((student, id) => (
    <tr key={id}>
      <td>{student.id}</td>
      <td><Link to={`/students/${student.id}`}>{student.name}</Link></td>
      <td>
        <Link to={`/students/${student.id}/edit`}>
          <Button className="mr-1" variant="default" color="red" >
            Edit
          </Button>
        </Link>
        <Button
          color="red"
          value={student.id}
          onClick={() => {

            const cloneStudents = [...students];
            const findId = (element) => element.id === student.id;
            const startDelete = cloneStudents.findIndex(findId);
            cloneStudents.splice(startDelete, 1);

            setStudents(cloneStudents);

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
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </div>
  );
}