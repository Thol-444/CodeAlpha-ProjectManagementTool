const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get tasks by project
router.get('/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ 
      project: req.params.projectId 
    }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, projectId } = req.body;
    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        title: req.body.title,
        description: req.body.description
      },
      { new: true }
    );
    res.json(task);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment
router.post('/:id/comments', auth, 
async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if(!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }
    
    task.comments.push({
      text: req.body.text,
      author: req.user.id
    });
    await task.save();
    res.json(task);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;