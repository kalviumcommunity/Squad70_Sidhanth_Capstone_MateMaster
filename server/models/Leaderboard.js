const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    rank: { type: Number, required: true }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);