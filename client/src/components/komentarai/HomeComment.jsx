import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function HomeComments() {
  const [data, setData] = useState([]);

  // Funkcija komentarų užklausai
  async function fetchComments() {
    try {
      const res = await fetch('http://localhost:5529/komentarai');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const result = await res.json();
      if (result.status === 'success') {
        setData(result.comments);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  // Ištrynimo funkcija
  async function handleDelete(id) {
    if (!window.confirm('Ar tikrai norite ištrinti šį komentarą?')) return;

    try {
      const res = await fetch(`http://localhost:5529/delete_comment/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      // Po sėkmingo ištrynimo perkraunam komentarus
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='container-fluid bg-primary vh-100 vw-100 p-3'>
      <h3>Comments</h3>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-success' to='/kurti'>Add Comments</Link>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.comment}</td>
              <td>
                <Link className='btn mx-2 btn-success' to={`/skaityti/${comment.id}`}>Read</Link>
                <Link className='btn mx-2 btn-success' to={`/koreguoti/${comment.id}`}>Edit</Link>
                <button 
                  onClick={() => handleDelete(comment.id)} 
                  className='btn mx-2 btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}