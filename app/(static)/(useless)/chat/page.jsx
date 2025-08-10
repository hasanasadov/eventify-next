"use client";

import React, { useState } from "react";

const GroupChatUI = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state for displaying errors

  const groups = [
    { id: "group1", name: "Art Exhibition", members: "7/10", full: false },
    { id: "group2", name: "Carpet Exhibition", members: "3/6", full: false },
    { id: "group3", name: "Game Summit", members: "3/4", full: false },
    { id: "group4", name: "Music Festival", members: "8/10", full: false },
    {
      id: "group5",
      name: "Grape and Wine Festival",
      members: "25/25",
      full: true,
    },
  ];

  const fetchMessages = async (groupId) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(`/api/groups/${groupId}/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages.");
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      setError(err.message || "An error occurred while fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setError("");
      const response = await fetch(`/api/groups/${selectedGroup.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) throw new Error("Failed to send message.");
      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (err) {
      setError(err.message || "An error occurred while sending the message.");
    }
  };

  const joinGroup = (group) => {
    if (!group.full) {
      setSelectedGroup({ id: group.id, name: group.name });
      fetchMessages(group.id);
    }
  };

  const exitGroup = () => {
    setSelectedGroup(null);
    setMessages([]);
    setError("");
  };

  return (
    <div className="flex h-[80vh] font-sans bg-gray-100 shadow-lg">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r">
        <h2 className="bg-[#25D366] text-white text-xl font-bold p-4">
          Groups
        </h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className={`p-4 cursor-pointer ${
                group.full
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-green-50"
              }`}
              onClick={() => !group.full && joinGroup(group)}
            >
              <div className="font-semibold">{group.name}</div>
              <div className="text-sm text-gray-500">
                {group.members} members
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col w-2/3 bg-gray-50">
        {/* Chat Header */}
        <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {selectedGroup ? selectedGroup.name : "Select a Group"}
          </h3>
          {selectedGroup && (
            <button
              onClick={exitGroup}
              className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Exit Group
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {loading && (
            <div className="text-center text-gray-500 italic mt-20">
              Loading messages...
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 italic mt-4">{error}</div>
          )}
          {!loading && !error && selectedGroup && messages.length === 0 && (
            <div className="text-center text-gray-500 italic mt-20">
              No messages yet. Start the conversation!
            </div>
          )}
          {!loading &&
            !error &&
            selectedGroup &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#DCF8C6] text-black"
                      : msg.sender === "system"
                      ? "bg-gray-300 text-black text-sm italic"
                      : "bg-white text-black"
                  }`}
                >
                  {msg.text}
                  {msg.time && (
                    <span className="block text-xs mt-1 text-gray-500">
                      {msg.time}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Input Area */}
        {selectedGroup && (
          <div className="p-4 bg-white border-t flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-[#25D366] text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChatUI;
