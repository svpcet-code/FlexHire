const express = require('express');
const { handleAIChat } = require('../controllers/aiController');

const router = express.Router();

// AI Chat endpoint
router.post('/chat', handleAIChat);

module.exports = router;

