import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'

export  function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        comments: '',
    });

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5529/add_user', { // Pilnas URL į backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);

            navigate('/students');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/students' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            required
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            required
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='gender'>Gender</label>
                        <input
                            type='text'
                            name='gender'
                            required
                            onChange={(e) => setValues({ ...values, gender: e.target.value })}
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='age'>Age</label>
                        <input
                            type='number'
                            name='age'
                            required
                            onChange={(e) => setValues({ ...values, age: e.target.value })}
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='comments'>Comments</label>
                        <textarea
                            id='comments'
                            name='comments'
                            required
                            placeholder='Įveskite savo komentarą...'
                            value={values.comments}
                            onChange={(e) => setValues({ ...values, comments: e.target.value })}
                        ></textarea>
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
