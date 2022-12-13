import express from "express";
import { verifyToken } from "../verifyToken.js";
import Comment from "../models/Comment.js";
import { createError } from "../error.js";

const router = express.Router();

const getComments = async (req, res, next) => {
    try {
        const allComments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(allComments);
    } catch (error) {
        next(error)
    }
}

const addComment = async (req, res, next) => {
    try {
        const newComment = new Comment({ ...req.body, userId: req.user.id, videoId: req.params.videoId })
        const savedComment = await newComment.save()
        res.status(200).json(savedComment);
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const toBeDeletedComment = await Comment.findById(req.params.id);
        if (toBeDeletedComment.userId === req.user.id) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment successfully Deleted!");
        }
        else {
            next(createError(401, "You can only delete your own Comments!"));
        }
    } catch (error) {
        next(error)
    }
}

// Add a self written comment to a Video
router.post("/:videoId", verifyToken, addComment);

// Delete a self written comment from a Video
router.delete("/:id", verifyToken, deleteComment);

// Get all the comments of a Video.
router.get("/:videoId", verifyToken, getComments);

export default router;