const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const axios = require('axios');
const OpenAI = require('openai');

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const newChat = async (req, res)=>{
    try {
        const { title } = req.body;
        const newChat = await Chat.create({title});
        res.json(newChat);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const newMessage = async (req, res) =>{
    try {
        const { chat_role, content, id_chat } = req.body;
        let messages = await Message.findAll({where: {id_chat}});
        
        if(messages.length > 0){ 
            messages = messages.map((m)=>({
                role: m.chat_role,
                content: m.content
            }));
        }

        messages.push({
            role: chat_role,
            content
        })

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages
        });

        const newUserMessage = await Message.create({chat_role, content, id_chat});
        const newAssistantMessage = await Message.create({chat_role: response.choices[0].message.role, content: response.choices[0].message.content, id_chat});
        res.json(newAssistantMessage);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const getChats = async(req, res)=>{
    try {
        const chats = await Chat.findAll();
        res.json(chats)
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const getMessages = async(req, res)=>{
    try {
        const { id_chat } = req.params;
        const messages = await Message.findAll({ where: {id_chat} });
        res.json(messages);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
} 

const deleteChat = async(req, res)=>{
    try {
        const { id_chat } = req.params;
        await Message.destroy({where: {id_chat}});
        await Chat.destroy({where: {id_chat}});

        res.json({message: 'Records deleted successfully'});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

module.exports = {
    newChat,
    newMessage,
    getChats,
    getMessages,
    deleteChat
}