import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function Home() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('http://localhost:5529/students') // pilnas URL su portu
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        const result = await res.json()
        if (result.status === 'success') {
          setData(result.students) // čia dabar masyvas
        } else {
          setData([])
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (deleted) {
      setDeleted(false)
      fetchStudents()
    }
  }, [deleted])

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5529/delete/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`)
      }
      setDeleted(true) // perkraus studentų sąrašą
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container-fluid bg-primary vh-100 vw-100 p-3'>
      <h3>Students</h3>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-success' to='/create'>Add Student</Link>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.comments}</td>
              <td>
                <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
                <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
                <button 
                  onClick={() => handleDelete(student.id)} 
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
  )
}