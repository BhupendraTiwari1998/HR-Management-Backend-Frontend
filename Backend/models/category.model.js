import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    course_name:{
        type:String,
        required:true,
        // unique:true,

    },
    course_description:{
        type:String,
        required:true,
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

export default mongoose.model('category',CategorySchema)