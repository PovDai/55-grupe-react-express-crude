import express from 'express';
import cors from 'cors';
import helmet from "helmet";

import { postRegister } from './src/api/public/postRegister.js';
import { postLogin } from './src/api/public/postLogin.js';
import { getPublicCategories } from './src/api/public/getCategories.js';
import { getLogin } from './src/api/public/getLogin.js'
import { cookieParser } from './src/middleware/cookieParser.js'
import { userData } from './src/middleware/userData.js'
import { isAdmin } from './src/middleware/isAdmin.js';
import { getAdminCategories } from './src/api/admin/categories/getCategories.js';
import { postAdminCategories } from './src/api/admin/categories/postCategories.js';
import { putAdminCategories } from './src/api/admin/categories/putCategories.js';
import { deleteAdminCategories } from './src/api/admin/categories/deleteCategories.js';
import { PORT } from './src/env.js';
import { getStudentById } from './src/api/public/getStudentById.js';
import { editUserById } from './src/api/public/editStudentById.js';
import { deleteUserById } from './src/api/public/deleteStudent.js';
import { getStudents } from './src/api/public/getStudents.js';
import { addUser } from './src/api/public/addStudent.js';
import { addComment } from './src/api/public/komentarai/addComment.js';
import { getCommentById } from './src/api/public/komentarai/getCommentById.js';
import { editCommentById } from './src/api/public/komentarai/editCommentById.js';
import { deleteCommentById } from './src/api/public/komentarai/deleteComment.js';
import { getComments } from './src/api/public/komentarai/getComment.js';



const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());

app.use(cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:5530',
}));

app.use(cookieParser);
app.use(userData)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/register', postRegister);
app.post('/api/login', postLogin);
app.get('/api/login', getLogin)

app.get('/api/categories', getPublicCategories);

app.get('/api/admin/categories', isAdmin, getAdminCategories);
app.post('/api/admin/categories', isAdmin, postAdminCategories);
app.put('/api/admin/categories/:original_url', isAdmin, putAdminCategories);
app.delete('/api/admin/categories/:url', isAdmin, deleteAdminCategories);


app.post('/add_user', addUser);
app.get('/students', getStudents);
app.get("/get_student/:id", getStudentById);
app.post("/edit_user/:id", editUserById)
app.delete("/delete/:id", deleteUserById);

app.post('/add_comment', addComment);
app.get('/komentarai', getComments);
app.get('/get_comments/:id', getCommentById);
app.post('/edit_comment/:id', editCommentById);
app.delete('/delete_comment/:id', deleteCommentById);






app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send('Server error');
});


app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
}) 