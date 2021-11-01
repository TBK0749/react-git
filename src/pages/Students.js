import { useEffect } from "react";
import { Link } from "react-router-dom";
import { students } from "../data/students";


// 1. ไฟล์นี้ถูก render
// 2. React router พบว่ามี switch มันเลยทำการเช็ค path ปัจจุบันคือ /students

export default function Students() {
  useEffect(() => {
    // Get student from '../data/students'
    console.log(students);
  }, []);

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