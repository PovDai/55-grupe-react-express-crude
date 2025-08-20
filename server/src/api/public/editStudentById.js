import { connection } from "../../db.js";  

export async function editUserById(req, res) {
    const id = req.params.id;
    const { name, email, age, gender, comments } = req.body;

    try {
        const sql = `
            UPDATE student_details 
            SET name = ?, email = ?, age = ?, gender = ?,comments=?,
            WHERE id = ?
        `;
        const values = [name, email, age, gender, comments, id];

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Student updated successfully',
            affectedRows: result.affectedRows
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