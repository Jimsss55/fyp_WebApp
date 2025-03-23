"use client";
import React from "react";
import { FaCheck } from "react-icons/fa"; // Import tick icon
import "./feedback.css";

// Mock data for feedback
const feedbacks = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    message: "The app is great, but it crashes sometimes.",
    timestamp: "2023-10-01T14:30:00Z",
    profileImage: "https://via.placeholder.com/40", // Placeholder image URL
  },
  {
    id: 2,
    username: "jane_doe",
    email: "jane@example.com",
    message: "I love the new update! The UI is much cleaner now.",
    timestamp: "2023-10-10T09:15:00Z",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    username: "alice_smith",
    email: "alice@example.com",
    message: "The app is slow to load on my device.",
    timestamp: "2023-10-11T16:45:00Z",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    username: "bob_johnson",
    email: "bob@example.com",
    message: "Great app overall, but I wish there were more features.",
    timestamp: "2023-10-12T11:00:00Z",
    profileImage: "https://via.placeholder.com/40",
  },
  // Add more mock data as needed
];

export default function FeedbackManagementPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [readStatus, setReadStatus] = React.useState<Record<number, boolean>>(
    {}
  );

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle marking feedback as read
  const handleMarkAsRead = (id: number) => {
    setReadStatus((prev) => ({ ...prev, [id]: true }));
  };

  // Filter feedback
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const feedbackDate = new Date(timestamp);
    const diffInMs = now.getTime() - feedbackDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
      } else {
        return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
      }
    } else {
      return feedbackDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div>
      <h1>Feedback Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username, email, or feedback..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {filteredFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className={`feedback-item ${readStatus[feedback.id] ? "read" : ""}`}
          >
            <div className="feedback-header">
              {/* <Image
                src={feedback.profileImage}
                alt={feedback.username}
                className="profile-image"
              /> */}
              <div className="user-info">
                <span className="username">{feedback.username}</span>
                <span className="timestamp">
                  {formatTimestamp(feedback.timestamp)}
                </span>
              </div>
              <button
                className="mark-as-read-button"
                onClick={() => handleMarkAsRead(feedback.id)}
                disabled={readStatus[feedback.id]}
              >
                {readStatus[feedback.id] ? <FaCheck /> : "Mark as Read"}
              </button>
            </div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="separator"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
