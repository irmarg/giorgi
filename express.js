const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// User Schema (Admin)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Player Schema
const PlayerSchema = new mongoose.Schema({
    name: String,
    position: String,
    goals: Number,
    assists: Number,
    saves: Number,
    image: String
});
const Player = mongoose.model('Player', PlayerSchema);

// Games Schema
const GameSchema = new mongoose.Schema({
    team1: String,
    team2: String,
    score: String,
    date: String
});
const Game = mongoose.model('Game', GameSchema);

// Admin Login (JWT Authentication)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Add Player (Admin Only)
app.post('/api/players', async (req, res) => {
    const { name, position, goals, assists, saves, image } = req.body;
    const newPlayer = new Player({ name, position, goals, assists, saves, image });
    await newPlayer.save();
    res.json(newPlayer);
});

// Get All Players
app.get('/api/players', async (req, res) => {
    const players = await Player.find();
    res.json(players);
});

// Get Players by Position
app.get('/api/players/:position', async (req, res) => {
    const players = await Player.find({ position: req.params.position });
    res.json(players);
});

// Add Game
app.post('/api/games', async (req, res) => {
    const { team1, team2, score, date } = req.body;
    const newGame = new Game({ team1, team2, score, date });
    await newGame.save();
    res.json(newGame);
});

// Get All Games
app.get('/api/games', async (req, res) => {
    const games = await Game.find();
    res.json(games);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
