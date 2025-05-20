import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setForm({ username: user.username, email: user.email });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/users/${editUser._id}`, form);
    setEditUser(null);
    setForm({ username: "", email: "" });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">👥 User Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{user.username}</h3>
            <p>Email: {user.email}</p>
            <div className="mt-3 flex gap-3">
              <button onClick={() => handleEdit(user)} className="px-3 py-1 bg-yellow-400 rounded">
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editUser && (
        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Update User</h3>
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="block w-full p-2 mb-2 border"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
            ✅ Update User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManager;
