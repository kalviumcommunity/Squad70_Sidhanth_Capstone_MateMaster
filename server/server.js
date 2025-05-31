const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const auth = require("./middleware/authmiddleware");
const axios = require('axios'); 




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
    if (!game){
       return res.status(404).json({ message: 'Game not found' });
      }
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
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user){
     return res.status(400).json({ message: "User not found" });
}
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

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

  // POST a new game (with JWT auth)
app.post('/api/games', auth, async (req, res) => {
  try {
    // Create the new game with the userId 
    const game = new Game({ ...req.body, userId: req.user.userId });
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  
  // POST a new tutorial
  app.post('/api/tutorials', async (req, res) => {
    try {
      // new tutrial
      const tutorial = new Tutorial(req.body);
      const savedTutorial = await tutorial.save();
      res.status(201).json(savedTutorial);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // POST a new leaderboard entry
  
  // POST a new leaderboard entry (with JWT auth)
app.post('/api/leaderboard', auth, async (req, res) => {
  try {
    // Create a new leaderboard entry with userId 
    const entry = new Leaderboard({ ...req.body, userId: req.user.userId });
    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  
  // POST a new matchmaking queue entry
  
  // POST a new matchmaking queue entry 
app.post('/api/matchmaking', auth, async (req, res) => {
  try {
    // Create a new matchmaking entry
    const queueItem = new Matchmaking({ ...req.body, userId: req.user.userId });
    const savedQueueItem = await queueItem.save();
    res.status(201).json(savedQueueItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AI Chat Assistant Endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('AI error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});


  
 // ==================== UPDATE USER ====================
 
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedUser){
         return res.status(404).json({ message: 'User not found' });
        }
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
      if (!updatedGame){ 
        return res.status(404).json({ message: 'Game not found' });
      }
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
    if (!updatedTutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
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
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
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
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Matchmaking entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET POST and PUT implemented!!

// Route to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to delete a game by ID
app.delete("/api/games/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to delete a tutorial by ID
app.delete("/api/tutorials/:id", async (req, res) => {
  try {
    const deletedTutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!deletedTutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to delete a leaderboard entry by ID
app.delete("/api/leaderboard/:id", async (req, res) => {
  try {
    const deletedEntry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: "Leaderboard entry not found" });
    res.json({ message: "Leaderboard entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to delete a matchmaking entry by ID
app.delete("/api/matchmaking/:id", async (req, res) => {
  try {
    const deletedMatch = await Matchmaking.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: "Matchmaking entry not found" });
    res.json({ message: "Matchmaking entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
