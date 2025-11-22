import React, { useState } from "react";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    setUsers([...users, { username, password }]);
    setUsername("");
    setPassword("");
  };

  const handleDelete = (indexToRemove) => {
    setUsers(users.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Authentication Form</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Username:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>User List</h3>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} - {user.password}{" "}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
