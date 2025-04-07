const GameSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moves: [{ type: String }],
    result: { type: String, enum: ['win', 'loss', 'draw', 'ongoing'], default: 'ongoing' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);