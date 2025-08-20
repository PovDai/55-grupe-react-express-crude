import { connection } from "../../db.js";

export async function deleteUserById(req, res) {
    const id = req.params.id;

    try {
        const sql = "DELETE FROM student_details WHERE id = ?";
        const [result] = await connection.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.json({
                status: 'error',
                message: 'Student not found'
            });
        }

        return res.json({
            status: 'success',
            message: 'Student deleted successfully',
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