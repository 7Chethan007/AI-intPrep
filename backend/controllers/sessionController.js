const Session = require('../models/Session');
const Question = require('../models/Question');

// @desc    Create a new session and linked questions
// @route   POST /api/sessions/create
// @access  Private
const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user.id;
        
        // **NOTE: Keep this only if your Session model uses the misspelled field 'experince'**
        // You should correct your schema if possible, but the mapping is kept here for safety.
        const session = await Session.create({
            user: userId,
            role,
            experince: experience, // Mapped to misspelled field
            experience,           // Mapped to correctly spelled field
            topicsToFocus,
            description,
        });

        const questionsArray = Array.isArray(questions) ? questions : [];
        const questionsDocs = await Promise.all(
            questionsArray.map(async (q) => {
                // FIX: Map 'question' and 'answer' fields from the incoming JSON
                const question = await Question.create({
                    session: session._id,
                    questionText: q.question,  // Using 'q.question' from the incoming JSON
                    answer: q.answer,          // <--- ADDED ANSWER FIELD HERE
                    // Note: 'note' is optional and would be added here if sent in the POST request body
                });
                return question._id;
            })
        );
        
        session.questions = questionsDocs;
        await session.save();

        // The GET route ('/my-sessions') will populate the Question documents, 
        // which now correctly contain the answer, leading to the desired Postman output.
        res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ... (Rest of the controller functions remain the same) ...

// @desc    Get all sessions for a user
// @route   GET /api/sessions/my-sessions
// @access  Private
const getSessionsByUser = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('questions');
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a session by ID
// @route   GET /api/sessions/:id
// @access  Private
const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options: { sort: { isPinned: -1, createdAt: 1 } }
            })
            .exec();
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a session
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // check if the session belongs to the user
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this session' });
        }
        // First delete all questions linked to this session
        await Question.deleteMany({ session: session._id });
        // Then delete the session
        await session.deleteOne();
        
        res.status(200).json({ success: true, message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createSession,
    getSessionsByUser,
    getSessionById,
    deleteSession
};