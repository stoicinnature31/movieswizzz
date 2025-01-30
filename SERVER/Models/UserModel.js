import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            requied: [true, "Please Write Your Full Name"],
        },

        email: {
            type: String,
            requied: [true, "Please Write Your Email Address"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Please Write Your Password"],
            minlength: [4, "Password must be atleast 4 characters"],
        },

        image: {
            type: String,
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
)

export default mongoose.model("user", UserSchema);