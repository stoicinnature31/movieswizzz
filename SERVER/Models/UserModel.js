import mongoose from "mongoose";
import validator from "validator"; // For email validation
import bcrypt from "bcrypt"; // For password hashing

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide your full name."],
        },
        email: {
            type: String,
            required: [true, "Please provide your email address."],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email address."],
        },
        password: {
            type: String,
            required: [true, "Please provide a password."],
            minlength: [4, "Password must be at least 4 characters long."],
        },
        image: {
            type: String,
            default: "", // Optional field with a default value
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedMovies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
            },
        ],
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("User", UserSchema);