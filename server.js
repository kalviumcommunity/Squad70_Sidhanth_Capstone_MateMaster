const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const User = require('./models/User');
const Game = require('./models/Game');
const Tutorial = require('./models/Tutorial');
const Leaderboard = require('./models/Leaderboard');
const Matchmaking = require('./models/Matchmaking');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/matemaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ✅ All GET APIs directly in server.js:

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all tutorials
app.get('/api/tutorials', async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const entries = await Leaderboard.find().sort({ score: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET matchmaking queue
app.get('/api/matchmaking', async (req, res) => {
  try {
    const queue = await Matchmaking.find();
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
app.post('/api/users', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // POST a new game
  app.post('/api/games', async (req, res) => {
    try {
      const game = new Game(req.body);
      const savedGame = await game.save();
      res.status(201).json(savedGame);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // POST a new tutorial
  app.post('/api/tutorials', async (req, res) => {
    try {
      const tutorial = new Tutorial(req.body);
      const savedTutorial = await tutorial.save();
      res.status(201).json(savedTutorial);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // POST a new leaderboard entry
  app.post('/api/leaderboard', async (req, res) => {
    try {
      const entry = new Leaderboard(req.body);
      const savedEntry = await entry.save();
      res.status(201).json(savedEntry);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // POST a new matchmaking queue entry
  app.post('/api/matchmaking', async (req, res) => {
    try {
      const queueItem = new Matchmaking(req.body);
      const savedQueueItem = await queueItem.save();
      res.status(201).json(savedQueueItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
 // ==================== UPDATE USER ====================
 
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==================== UPDATE GAME ====================
  
  app.put('/games/:id', async (req, res) => {
    try {
      const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
      res.status(200).json(updatedGame);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==================== UPDATE TUTORIAL ====================
app.put('/tutorials/:id', async (req, res) => {
  try {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedTutorial) return res.status(404).json({ message: 'Tutorial not found' });
    res.status(200).json(updatedTutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== UPDATE LEADERBOARD ENTRY ====================
app.put('/leaderboard/:id', async (req, res) => {
  try {
    const updatedEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== UPDATE MATCHMAKING ENTRY ====================
app.put('/matchmaking/:id', async (req, res) => {
  try {
    const updatedEntry = await Matchmaking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEntry) return res.status(404).json({ message: 'Matchmaking entry not found' });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET POST and PUT implemented!!
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
