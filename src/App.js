import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post('http://localhost:5000/api/chat', {
        prompt: input
      });
      setResponses(prev => [...prev, { user: input, bot: result.data.choices[0].text }]);
      setInput('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        {responses.map((msg, index) => (
          <div key={index}>
            <div>User: {msg.user}</div>
            <div>Bot: {msg.bot}</div>
          </div>
        ))}
      </div>
      <input value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default App;
