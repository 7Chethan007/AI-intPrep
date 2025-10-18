const express = require('express');
const { createSession, getSessionsByUser, getSessionById, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Session routes
router.post('/create', protect, createSession);
router.get('/my-sessions', protect, getSessionsByUser);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router;