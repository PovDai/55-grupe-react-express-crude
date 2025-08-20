import { connection } from "../../db.js";
export async function getStudents(req, res) {
  try {
    const sql = "SELECT * FROM student_details";
    const [students] = await connection.execute(sql);

    return res.json({
      status: 'success',
      students: students
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 'error',
      students: []
    });
  }
}