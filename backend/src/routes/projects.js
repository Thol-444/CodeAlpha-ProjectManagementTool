const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id }
      ]
    }).populate('owner', 'name email');
    res.json(projects);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    ).populate('owner', 'name email')
     .populate('members', 'name email');
    
    if(!project) {
      return res.status(404).json({ 
        message: 'Project not found' 
      });
    }
    res.json(project);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = new Project({
      title,
      description,
      owner: req.user.id
    });
    await project.save();
    res.status(201).json(project);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        title: req.body.title,
        description: req.body.description 
      },
      { new: true }
    );
    res.json(project);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;