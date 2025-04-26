const mongoose = require('mongoose');

const MatchmakingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['waiting', 'matched'], default: 'waiting' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Matchmaking', MatchmakingSchema);
