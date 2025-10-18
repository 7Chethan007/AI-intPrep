const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema( {
    // Link back to the parent session
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
    // The question text
    questionText: { // <--- ADD THIS FIELD
        type: String,
        required: true,
    },
    // The model answer text
    answer: { // <--- ADD THIS FIELD
        type: String,
        required: true, 
    },
    // User's personal note on the question
    note: {
        type: String,
        default: '',
    },
    // Flag to indicate if the user pinned this question
    isPinned: {
        type: Boolean,
        default: false,
    },
},{ timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);