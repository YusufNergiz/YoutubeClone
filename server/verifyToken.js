import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    // Checking if the User has an access_token through cookies
    const token = req.cookies.access_token || req.body.headers.access_token;
    if (!token) {
        return next(createError(401, "Please Login First!"));
    }
    // If yes, verify it through JWT
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
        // Set the global req.user to the current user itself so that we can use it everywhere
        // in our app where verifyToken function has been called.
        req.user = user;
        next();
    })
};