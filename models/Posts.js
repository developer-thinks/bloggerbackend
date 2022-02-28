import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title :String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likes :{
        type : {String},
        default : []
    }
},{
    timestamps : true
});

const Posts = mongoose.model("posts", postSchema);

export default Posts;