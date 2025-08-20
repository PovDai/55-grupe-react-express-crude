import { connection } from "../../db.js"

export async function addUser(req, res) {
    const { name, email, age, gender, comments } = req.body;

    try {
        const sql = `
            INSERT INTO student_details (name, email, age, gender,comments)
            VALUES (?, ?, ?, ?,?)
        `;
        const values = [name, email, age, gender,comments]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Student added successfully',
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: 'error',
            message: 'Something unexpected has occurred',
            error: error.message
        });
    }
}