import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String
    } ,
    message : {
        type : String
    } ,
    name :{
        type : String
    },
    creator : {
        type : String
    } ,
    tags : [String],
    selectedFile : {
        type : String
    } ,
    likes :{
        type : [String],
        default : []
    }
},{
    timestamps : true
});

export default mongoose.model("posts", postSchema);