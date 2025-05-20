import React, { useEffect, useState } from "react";
import axios from "axios";

function TutorialManager() {
  const [tutorials, setTutorials] = useState([]);
  const [editing, setEditing] = useState(null);   // holds tutorial being edited
  const [updatedTitle, setUpdatedTitle] = useState("");

  // Fetch tutorials on component mount
  useEffect(() => {
    axios.get("/api/tutorials")
      .then(response => setTutorials(response.data))
      .catch(err => console.error(err));
  }, []);

  // Delete tutorial handler
  const handleDelete = (id) => {
    axios.delete(`/api/tutorials/${id}`)
      .then(() => {
        setTutorials(tutorials.filter(t => t._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Start editing handler
  const startEditing = (tutorial) => {
    setEditing(tutorial);
    setUpdatedTitle(tutorial.title);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditing(null);
    setUpdatedTitle("");
  };

  // Save updated tutorial
  const saveUpdate = () => {
    axios.put(`/api/tutorials/${editing._id}`, { title: updatedTitle })
      .then(response => {
        setTutorials(tutorials.map(t => t._id === editing._id ? response.data : t));
        setEditing(null);
        setUpdatedTitle("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Manage Tutorials</h2>
      <ul>
        {tutorials.map(t => (
          <li key={t._id}>
            {editing && editing._id === t._id ? (
              <>
                <input
                  value={updatedTitle}
                  onChange={e => setUpdatedTitle(e.target.value)}
                />
                <button onClick={saveUpdate}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {t.title}
                <button onClick={() => startEditing(t)}>Edit</button>
                <button onClick={() => handleDelete(t._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TutorialManager;
