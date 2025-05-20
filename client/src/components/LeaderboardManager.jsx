import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaderboardManager = () => {
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [form, setForm] = useState({
    username: "",
    score: "",
  });

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/leaderboard");
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/leaderboard/${id}`);
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setForm({ username: entry.username, score: entry.score });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/leaderboard/${editEntry._id}`, form);
    setEditEntry(null);
    setForm({ username: "", score: "" });
    fetchEntries();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">🏆 Leaderboard Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map((entry) => (
          <div key={entry._id} className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{entry.username}</h3>
            <p>Score: {entry.score}</p>
            <div className="mt-3 flex gap-3">
              <button onClick={() => handleEdit(entry)} className="px-3 py-1 bg-yellow-400 rounded">
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(entry._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editEntry && (
        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Update Leaderboard Entry</h3>
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Score"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
            ✅ Update Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardManager;
