const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.get('/', chatController.getChats)
router.get('/message/:id_chat', chatController.getMessages);
router.post('/chat', chatController.newChat);
router.post('/message', chatController.newMessage);
router.delete('/:id_chat', chatController.deleteChat);

module.exports = router;
