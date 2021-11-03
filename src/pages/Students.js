import { useContext } from "react";
import { Link } from "react-router-dom";
import { StudentsContext } from "../context/StudentsContext";
import { Button } from '@mantine/core';


// 1. ไฟล์นี้ถูก render
// 2. React router พบว่ามี switch มันเลยทำการเช็ค path ปัจจุบันคือ /students

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);

  return (
    <div className="space-y-4">
      <div className="flow-root ...">
        <div>
          <Link to="students/create">
            <Button variant="default" color="teal">
              Create Student
            </Button>
          </Link>
        </div>
        {[...students].map((student, id) => (
          <Link to={`students/${student.id}`} key={id}>
            <div className="border-solid border-4 border-black my-4 flex justify-center h-auto text-2xl">
              <div>
                <div className="my-4 ...">{student.name}</div>
                <div className="my-4 ...">{student.bio}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}