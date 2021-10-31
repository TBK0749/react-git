import { useEffect } from "react";
import { students } from "../data/students";

export default function Students() {
  useEffect(() => {
    // Get student from '../data/students'
    console.log(students);
  }, []);

  return (
    <div>Show all students here</div>
  );
}