import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export function CreateComments() {
    const [values, setValues] = useState({
        name: '',
        comment: '',
    });

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5529/add_comment', {
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

            navigate('/komentarai');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container vh-100 vw-100 bg-primary">
            <div className="row">
                <h3>Add Comment</h3>
                <div className="d-flex justify-content-end">
                    <Link to="/komentarai" className="btn btn-success">Comments Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            id="comment"
                            name="comment"
                            required
                            placeholder="Įveskite savo komentarą..."
                            value={values.comment}
                            onChange={(e) => setValues({ ...values, comment: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}