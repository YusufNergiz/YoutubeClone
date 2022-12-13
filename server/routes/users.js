import express from "express";
import { createError } from "../error.js";
import User from "../models/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();


// Update User
const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    else {
        return next(createError(403, "You can only update your account!"))
    }
}

const deletUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(204).json("Account has been successfully deleted!");
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(createError(403, "You can only delete your account!"))
    }
}

const getUser = async (req, res, next) => {
    try {
        const searchedUser = await User.findById(req.params.id)
        res.status(200).json(searchedUser);
    } catch (error) {
        next(createError(404, "User not found!"))
    }
}

const subscribe = async (req, res, next) => {
    try {

        // Finding the current user and adding the channel to its "subscribedUsers" array.
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        // Finding the subscribed channel and incrementing its subscribers array by 1.
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1},
        });
        res.status(200).json(`Subscribed to ${req.params.id}`)
    } catch (error) {
        next(error)
    }
}

const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json(`Unsubscribed from ${req.params.id}`)
    } catch (error) {
        next(error)
    }
}

// Update Current User Account
router.put("/:id", verifyToken, updateUser)

// Delete Current User Account
router.delete("/:id", verifyToken, deletUser);

// Get Info about another User.
router.get("/find/:id", getUser);

// Subscribe to a User from the current Account
router.put("/sub/:id", verifyToken, subscribe);

//Unsubscribe to a User from the current Account
router.put("/unsub/:id", verifyToken, unsubscribe);


export default router;