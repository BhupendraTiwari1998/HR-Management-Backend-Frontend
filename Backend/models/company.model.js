import mongoose from "mongoose";
import studentModel from "./student.model";

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    company_name:{
        type:String,
        required:true
    },
    company_description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:null
    },  
    company_status:{
        type:String,
        default:null
    },
    student_detail:{
        type:Schema.Types.ObjectId,
        // required:true,
        default:null,
        ref:studentModel
    },
    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})

export default mongoose.model("company", CompanySchema)