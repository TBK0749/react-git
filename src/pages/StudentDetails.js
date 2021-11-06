import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function StudentDetails() {
  const [student, setStudent] = useState(undefined);
  const { studentId } = useParams(); // https://reactrouter.com/web/example/url-params

  useEffect(() => {
    axios.get(`http://localhost:3001/students/${studentId}`).then((res) => {
        setStudent(res.data);
      }).catch((error) => {
        console.log(error);
      });

  }, [])
  
  if (student === undefined) return <div>student not found</div>;

  return (
    <div>
      <h1>{`No.${student.id} ${student.name}`}</h1>
      <h2>Bio</h2>
      <p>{student.bio}</p>
    </div>
  );
}