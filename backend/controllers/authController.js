const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10); // salt is used to enhance security of the hashed password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

// @desc   Get user profile
// @route  GET /api/auth/profile
// @access Private(Requires token)
const getUserProfile = async (req, res) => {
    try {
        // Assuming protect middleware sets req.user with user id
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};