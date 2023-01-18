import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const signup = async (req, res, next) => {
    // Function to encrypt the user password before saving it in the database
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            try {
                // Getting user data from the body of the request { "name": Yussuf, "email"; "email@email.com", "password": "_encrypted_pass_" }
                const newUser = new User({...req.body, password: hash})
                await newUser.save();
                res.status(201).send("User has been Created!")
            } catch (error) {
                next(error)  // Uses the global error function in the index.js to display erorrs more claerly
            }
        });
    });
}

const signin = async (req, res, next) => {
    try {
        // Checks if user exists in databse
        const user = await User.findOne({name: req.body.name});
        if (!user) {
            next(createError(404, "User not Found!"));
        }
        else {
            // Compares the crypted password to the entered password
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    // If the password matches it creates a token for the user
                    const token = jwt.sign({id: user._id}, process.env.JWT);
                    const { password, ...userdData } = user._doc;
                    // Saves the token in cookies so the web can understand if the legit user is signin in ig...
                    res.cookie("access_token", token, { httpOnly: false, sameSite: 'lax', secure: false }).status(200).json(userdData);
                }
                else {
                    next(createError(403, "Incorrect credentials!"))
                }
                next();
            });
        }
    } catch (error) {
        next(error);
    }
}

const signinWithGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT);
            // Saves the token in cookies so the web can understand if the legit user is signin in ig...
            res.cookie("access_token", token, { httpOnly: true, sameSite: 'lax', secure: false }).status(200).json(user._doc);
        }
        else {
            const newUser = new User({...req.body, fromGoogle: true});
            const savedNewUser = await newUser.save();
            const token = jwt.sign({id: savedNewUser._id}, process.env.JWT);
            // Saves the token in cookies so the web can understand if the legit user is signin in ig...
            res.cookie("access_token", token, { httpOnly: true, sameSite: 'lax', secure: false }).status(200).json(savedNewUser._doc);
        }
    } catch (error) {
        next(createError(403, "Google Auth Failed to Sign In, Try again later."))        
    }
}

router.post("/signup", signup)

router.post("/signin", signin);

router.post("/googleauth", signinWithGoogle);

export default router;