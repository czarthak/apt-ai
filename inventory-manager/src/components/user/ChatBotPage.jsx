import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ChatBotPage.css'; 

function ChatBotPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the Apartment AI Assistant! Type a question to get started!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate(); 

  // Function to parse the message and create buttons for IDs between #
  const parseMessageForButtons = (text) => {
    const regex = /#\s?(\d+(?:\s\d+)*)\s?#/g; // Matches # 1 2 3 # format
    const parts = [];
    let lastIndex = 0;

    // Use matchAll to iterate over all matches
    const matches = [...text.matchAll(regex)];

    matches.forEach((match) => {
      const [fullMatch, ids] = match;
      const offset = match.index;

      // Push the text before the current match
      if (offset > lastIndex) {
        parts.push(text.slice(lastIndex, offset));
      }

      // Split the IDs by space and create buttons for each one
      const idArray = ids.split(/\s+/);
      idArray.forEach(id => {
        parts.push(
          <div key={id} style={{ marginBottom: '10px' }}> {/* Wrap in a div for its own line */}
            <button
              onClick={() => navigate(`/listing/${id}`)}
              className="listing-button"
              style={{ display: 'block' }}  // Ensure each button takes its own line
            >
              {`Go to Listing #${id}`}
            </button>
          </div>
        );
      });

      // Update lastIndex to the end of the current match
      lastIndex = offset + fullMatch.length;
    });

    // Push any remaining text after the last match
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = { sender: 'user', text: userInput };
    
    // Add the user's message to the chat
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput(''); 

    try {
      const response = await fetch('http://localhost:1000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      const botMessage = { sender: 'bot', text: data.response };

      // Add the bot's response to the chat
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
