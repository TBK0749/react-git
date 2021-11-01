import { useParams } from "react-router";
import { students } from "../data/students";

export default function StudentDetails() {
  const { id } = useParams();
  const student = students[Number(id - 1)];

  if (!student) return <div>student not found</div>;

  return (
    <div>
      <h1>{`No.${student.id} ${student.name}`}</h1>
      <h2>Bio</h2>
      <p>{student.bio}</p>
    </div>
  );
}