import asyncHandler from 'express-async-handler'
import User from '../Models/UserModel.js';


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400).json({ message: 'User already exists' });
        }
        else {
            const user = await User.create({
                fullName,
                email,
                password,
                image
            });
            res.status(201).json({ message: 'User created successfully', user });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});


export { registerUser };