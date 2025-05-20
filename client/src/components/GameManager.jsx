import React, { useEffect, useState } from "react";
import axios from "axios";

const GameManager = () => {
  const [games, setGames] = useState([]);
  const [editGame, setEditGame] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    mode: "",
  });

  const fetchGames = async () => {
    const res = await axios.get("http://localhost:5000/games");
    setGames(res.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/games/${id}`);
    fetchGames();
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setForm({ title: game.title, description: game.description, mode: game.mode });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/games/${editGame._id}`, form);
    setEditGame(null);
    setForm({ title: "", description: "", mode: "" });
    fetchGames();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">🎮 Game Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div key={game._id} className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <p>{game.description}</p>
            <p className="text-sm italic text-gray-500">Mode: {game.mode}</p>
            <div className="mt-3 flex gap-3">
              <button onClick={() => handleEdit(game)} className="px-3 py-1 bg-yellow-400 rounded">
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(game._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editGame && (
        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Update Game</h3>
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Mode"
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value })}
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
            ✅ Update Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameManager;
