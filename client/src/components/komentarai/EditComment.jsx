import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";

export function EditComments() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    name: "",
    comment: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await fetch(`http://localhost:5529/get_comments/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();

        if (result.status === "success" && result.comment) {
          setComment(result.comment);
        } else {
          setError("Comment not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch comment data");
      } finally {
        setLoading(false);
      }
    }
    fetchComment();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5529/edit_comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const result = await res.json();
      console.log("Edit result:", result);

      navigate("/komentarai"); // grįžtam į sąrašą
    } catch (err) {
      console.error(err);
      setError("Failed to save comment data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary p-4">
      <h1>Edit Comment {id}</h1>
      <Link to="/komentarai" className="btn btn-success mb-3">Back</Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            value={comment.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="comment">Comment</label>
          <textarea
            value={comment.comment}
            name="comment"
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