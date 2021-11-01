import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentsContext } from "../context/StudentsContext";


// 1. ไฟล์นี้ถูก render
// 2. React router พบว่ามี switch มันเลยทำการเช็ค path ปัจจุบันคือ /students

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);

  return (
    <div>
      <ul>
        {[...students].map((student, id) => (
          <li key={id}>
            <Link to={`students/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}