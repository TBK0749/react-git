import { useParams } from "react-router";

export default function StudentDetails() {
  const { id } = useParams();

  return (
    <div>Student Details: {id}</div>
  );
}