import Posts from "../models/Posts.js"
import mongoose from "mongoose"

export const getPosts = async (req,res)=>{
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const createPost = async (req, res)=>{
    const posts = req.body;
    const newPost = new Posts(posts)
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(404).json({message : "Didn't created"})
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await Posts.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Posts.findByIdAndDelete(id);
    res.json({message : "Post successfully deleted"})
}

export const likePost = async (req,res)=>{
    const {id} = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Posts.findById(id);
    const index = post.likes.findIndex((id)=> id === String(req.userId))

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    const updatedPost = await Posts.findByIdAndUpdate(id, post, {new : true})
    res.json(updatedPost);

}