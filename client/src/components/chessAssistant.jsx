import React, { useState } from 'react';
import axios from 'axios';

const ChessAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { prompt });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Chess Assistant</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border mb-2"
        placeholder="Ask a chess question..."
      />
      <button onClick={handleAsk} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Asking...' : 'Ask'}
      </button>
      {response && <p className="mt-4 whitespace-pre-wrap">{response}</p>}
    </div>
  );
};

export default ChessAssistant;
