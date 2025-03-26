"use client";
import React from "react";
import { FaCheck } from "react-icons/fa"; // Import tick icon
import "./feedback.css";
import { useState, useEffect } from "react";
import { fetchFeedback } from "../api/feedback/fetchFeedback";
import { updateFeedback } from "../api/feedback/updateFeedback";

interface Feedback {
  id: number;
  user_id: number;
  username: string;
  message: string;
  status: string;
  created_at: string;
}

export default function FeedbackManagementPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle marking feedback as read
  const handleMarkAsRead = async (id: number) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!token) {
        console.error("Access token not found");
        return;
      }

      // Call the updateFeedback function to update the status in the backend
      const updatedFeedback = await updateFeedback(id, token, 1);
      console.log("Updated Feedback: ", updatedFeedback);

      // Update the feedbacks state with the updated feedback
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback.id === updatedFeedback.id ? updatedFeedback : feedback
        )
      );

      console.log(`Feedback with ID ${id} marked as read`);
    } catch (error) {
      console.error("Error marking feedback as read", error);
    }
  };

  // Fetch feedback from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("Access token not found");
          return;
        }

        const data = await fetchFeedback(token);
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback", error);
      }
    };
    fetchData();
  }, []);

  // Filter feedback
  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1>Feedback Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter feedbacks by status..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {filteredFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className={`feedback-item ${
              feedback.status === "viewed" ? "read" : ""
            }`}
          >
            <div className="feedback-header">
              <div className="user-info">
                <span className="timestamp">
                  {formatDate(feedback.created_at)}
                </span>
              </div>
              <button
                className="mark-as-read-button"
                onClick={() => handleMarkAsRead(feedback.id)}
                disabled={feedback.status === "viewed"}
              >
                {feedback.status === "viewed" ? <FaCheck /> : "Mark as Read"}
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
