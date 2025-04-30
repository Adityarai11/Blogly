const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//config .env
require('dotenv').config();


// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;


// Register User
exports.registerController = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'Please fill all details',
                success: false
            });
        }

        // Existing User Check
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save New User
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).send({
            success: true,
            message: "New User Created",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        });
    }
};

// Login User
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                message: 'Please provide email and password',
                success: false
            });
        }

        // Check user exist
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // Exclude passwords
        return res.status(200).send({
            userCount:users.length,
            success: true,
            message:"all user data",
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error fetching users',
            error
        });
    }
};
