"use client";

import React, { useEffect, useState } from "react";
import "./user.css";
import { fetchUsers } from "../api/users/fetchUsers";

// Define the User interface
interface User {
  id: number;
  username: string;
  gender: string;
  dob: string;
  role_id: number;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Fetch users from backend

  useEffect(() => {
    const fetchData = async () => {
      try {
        // retrieve the token from cookies
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("Access token not found");
          return;
        }

        const data = await fetchUsers(token);

        const usersWithRole1 = data.filter((user: User) => user.role_id === 1);
        setUsers(usersWithRole1);
        setFilteredUsers(usersWithRole1);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user: User) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Handle delete user
  const handleDeleteUser = (id: number) => {
    const updatedUsers = filteredUsers.filter((user: User) => user.id !== id);
    setFilteredUsers(updatedUsers);
  };

  // Calculate stats
  const totalUsers = filteredUsers.length;
  const maleUsers = filteredUsers.filter(
    (user: User) => user.gender === "Male"
  ).length;
  const femaleUsers = filteredUsers.filter(
    (user: User) => user.gender === "Female"
  ).length;

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
            <th>Gender</th>
            <th>DoB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.gender}</td>
              <td>{user.dob}</td>
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
