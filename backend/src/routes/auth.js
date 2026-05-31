const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(
                           password, 10);
    
    // Create user
    user = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });
    await user.save();
    
    // Create token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check user
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(
                    password, user.password);
    if(!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }
    
    // Create token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user
router.get('/me', require('../middleware/auth'), 
async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
                           .select('-password');
    res.json(user);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;