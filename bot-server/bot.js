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

  const input = new ChatGPTInput("You are a helpful apartment assistant for apartment listing help. If you are asked to return listings or you return listings only return the db_id as a list surronded by hashes. For example 5 listings with db_id of 1, 2, 3, 4, and 5 would be # 1 2 3 4 5 #");

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
