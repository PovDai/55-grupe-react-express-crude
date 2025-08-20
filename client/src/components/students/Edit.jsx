
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router"

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    comments: ""
  });

  const [loading, setLoading] = useState(true); // įkėlimo būsena
  const [error, setError] = useState(null);     // klaidų būsena

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`http://localhost:5529/get_student/${id}`);
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.status === "success" && result.student) {
          setStudent(result.student);
        } else {
          setError("Student not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5529/edit_user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
      console.log(result);

      navigate("/students"); // grįžtam į home po sėkmingo atnaujinimo
    } catch (err) {
      console.error(err);
      setError("Failed to save student data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary p-4">
      <h1>Edit User {id}</h1>
      <Link to="/students" className="btn btn-success mb-3">Back</Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            value={student.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="email">Email</label>
          <input
            value={student.email}
            type="email"
            name="email"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="gender">Gender</label>
          <input
            value={student.gender}
            type="text"
            name="gender"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="age">Age</label>
          <input
            value={student.age}
            type="number"
            name="age"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="comments">Comments</label>
          <textarea
            value={student.comments}
            name="comments"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
