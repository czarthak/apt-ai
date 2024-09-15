import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ChatBotPage.css'; 

function ChatBotPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the Apartment AI Assistant! Type a question to get started!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate(); 

  const parseMessageForButtons = (text) => {
    const regex = /#\s?(\d+(?:\s\d+)*)\s?#/g; 
    const parts = [];
    let lastIndex = 0;

    text.replace(regex, (match, ids, offset) => {

      if (offset > lastIndex) {
        parts.push(text.substring(lastIndex, offset));
      }

      const idArray = ids.split(/\s+/); 
      idArray.forEach((id, index) => {
        parts.push(
          <button
            key={id + index}
            onClick={() => navigate(`/listing/${id}`)}
            className="listing-button"
          >
            {`Go to Listing #${id}`}
          </button>
        );
      });

      lastIndex = offset + match.length;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = { sender: 'user', text: userInput };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput(''); 

    try {
      const response = await fetch('http://localhost:1000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      console.log('Bot response:', data.response); 

      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="message-text">
              {message.sender === 'bot' ? parseMessageForButtons(message.text) : message.text}
            </span>
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
