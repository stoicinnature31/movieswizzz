import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/auth.js';

// #Desc Register User
// #route POST /api/users
// #access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;

    // Input validation
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 4) {
        return res.status(400).json({ message: 'Password must be at least 4 characters' });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
            isAdmin: false // Default to non-admin
        });

        if (user) {
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    image: user.image,
                    isAdmin: user.isAdmin,
                },
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during user registration' });
    }
});


// #Desc Login User
// #route POST /api/users/login
// #access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user in database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                message: 'User logged in successfully',
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    image: user.image,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                }
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during user login' });
    }
})

export { registerUser, loginUser };
