import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config()

import cors from 'cors'
import studentRouter from './routers/student.router'
import categoryRouter from './routers/category.router'
import companyRouter from './routers/company.router'
import AdminRouter from './routers/admin.router'


const app = express();
app.use(express.json());
app.use(cors());

const port = 3003;

mongoose.connect('mongodb://localhost:27017/HR_Management')
// mongoose.connect('mongodb+srv://Bhupendra:tiwari1234@hrm.lgovapr.mongodb.net/HR_Management')
    .then(() => console.log('Connected!'));


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use(studentRouter)
app.use(categoryRouter)
app.use(companyRouter)
app.use(AdminRouter)