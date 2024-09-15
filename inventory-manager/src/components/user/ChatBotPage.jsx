import React, { useState, useEffect } from 'react';
import './ChatBotPage.css'; 

function ChatBotPage() {
  // Start with a welcome message
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to the chatbot. How can I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = { sender: 'user', text: userInput };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      const response = await fetch('http://localhost:1000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }

    setUserInput(''); 
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBotPage;