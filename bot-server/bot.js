require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const { Chatbot, SupportedChatModels } = require('intellinode');
const { ChatGPTInput } = require('intellinode');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000' 
}));

const openaiBot = new Chatbot(process.env.openaiKey, SupportedChatModels.OPENAI, null, { oneKey: process.env.intelliKey });

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const input = new ChatGPTInput("You are a helpful apartment assistant for students. If asked about specific information about apartments when you return specific listing make sure the ID follows the listing and all the information about the listing is sent. Also go to the nextline when needed to make display look good");

  // Add user message
  input.addUserMessage(userMessage);

  try {
    const botResponses = await openaiBot.chat(input);
    res.json({ response: botResponses.join(' ') }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to get a response from the chatbot' });
  }
});

app.listen(1000, () => {
  console.log('Server running on port 1000');
});
