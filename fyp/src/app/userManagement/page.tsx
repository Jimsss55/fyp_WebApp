"use client"
import React from 'react';
import './user.css';
// Mock data for users
const users = [
  { id: 1, username: 'john_doe', email: 'john@example.com', gender: 'Male' },
  { id: 2, username: 'jane_doe', email: 'jane@example.com', gender: 'Female' },
  { id: 3, username: 'alice_smith', email: 'alice@example.com', gender: 'Female' },
  { id: 4, username: 'bob_johnson', email: 'bob@example.com', gender: 'Male' },
];

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Handle delete user
  const handleDeleteUser = (id: number) => {
    const updatedUsers = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(updatedUsers);
  };

  // Calculate stats
  const totalUsers = filteredUsers.length;
  const maleUsers = filteredUsers.filter((user) => user.gender === 'Male').length;
  const femaleUsers = filteredUsers.filter((user) => user.gender === 'Female').length;

  return (
    <div>
      <h1>User Management</h1>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stats-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stats-card">
          <h3>Male Users</h3>
          <p>{maleUsers}</p>
        </div>
        <div className="stats-card">
          <h3>Female Users</h3>
          <p>{femaleUsers}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email ID</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}