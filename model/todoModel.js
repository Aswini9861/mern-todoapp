import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todoName:{
        type:String,
        required:true
    }
})

export default mongoose.model('tododata',todoSchema)