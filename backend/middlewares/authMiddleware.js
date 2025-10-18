const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        // Read Authorization header (case-insensitive)
        const authHeader = req.headers.authorization || req.headers.Authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // attach user to request (lowercase 'user')
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        }

        return res.status(401).json({ message: 'Not authorized, no token' });
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
}

module.exports = {
    protect
};