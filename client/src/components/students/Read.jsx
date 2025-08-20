import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"

 export  function Read() {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`http://localhost:5529/get_student/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        setStudent(result.student); // vienas objektas
      } catch (err) {
        console.error(err);
      }
    }
    fetchStudent();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/students" className="btn btn-success">Back</Link>
      <ul className="list-group mt-3">
        <li className="list-group-item"><b>ID: </b>{student.id}</li>
        <li className="list-group-item"><b>Name: </b>{student.name}</li>
        <li className="list-group-item"><b>Email: </b>{student.email}</li>
        <li className="list-group-item"><b>Age: </b>{student.age}</li>
        <li className="list-group-item"><b>Gender: </b>{student.gender}</li>
        <li className="list-group-item"><b>Comments: </b>{student.comments}</li>
      </ul>
    </div>
  );
}




