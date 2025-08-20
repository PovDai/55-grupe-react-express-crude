import { connection } from "../../db.js ";

export async function getStudentById(req, res) {
    const id = req.params.id;

    try {
        const sql = "SELECT * FROM student_details WHERE `id` = ?";
        const [students] = await connection.execute(sql, [id]);

        return res.json({
            status: 'success',
            student: students[0] || null, // grąžinam tik vieną studentą
        });
    } catch (error) {
        console.error(error); // galima loginti klaidą
        return res.json({
            status: 'error',
            student: null,
        });
    }
}