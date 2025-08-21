import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

export function ReadComments() {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("gaunamas id:", id);

  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await fetch(`http://localhost:5529/get_comments/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        console.log(result); // 🔎 pasižiūrėk ką grąžina backend

        if (result.status === "success" && result.comment) {
          setComment(result.comment);
        } else {
          setError("Comment not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load comment");
      } finally {
        setLoading(false);
      }
    }

    fetchComment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!comment) return <p>No comment found.</p>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary p-3">
      <h1>Comment {id}</h1>
      <Link to="/komentarai" className="btn btn-success mb-3">Back</Link>
      <ul className="list-group">
        <li className="list-group-item"><b>ID: </b>{comment.id}</li>
        <li className="list-group-item"><b>Name: </b>{comment.name}</li>
        <li className="list-group-item"><b>Comment: </b>{comment.comment}</li>
      </ul>
    </div>
  );
}