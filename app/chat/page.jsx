"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const GroupChatUI = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const groups = [
    {
      id: "group1",
      name: "Art Exhibition",
      description: "Azerbaijan National Museum of Art.",
      members: "7/10",
      full: false,
    },
    {
      id: "group2",
      name: "Carpet Exhibition",
      description: "Azerbaijan National Carpet Museum.",
      members: "3/6",
      full: false,
    },
    {
      id: "group3",
      name: "Game Summit",
      description: "Baku Sport Palace.",
      members: "3/4",
      full: false,
    },
    {
      id: "group4",
      name: "Music Festival",
      description: "Haydar Aliyev Palace.",
      members: "8/10",
      full: false,
    },
    {
      id: "group5",
      name: "Grape and Wine Festival",
      description: "Shamakhi Meysari Wine Factory.",
      members: "25/25",
      full: true,
    },
    {
      id: "group6",
      name: "Jazz Festival",
      description: "Maiden Tower.",
      members: "30/30",
      full: true,
    },
  ];

  const joinGroup = (group) => {
    if (group.full) {
      setSelectedGroup({
        name: group.name,
        status: "This group is full. You cannot send messages.",
      });
    } else {
      setSelectedGroup({
        name: group.name,
        status: `You are in the ${group.name}`,
      });
      setMessages([
        {
          sender: "system",
          text: `Welcome to ${group.name}! Start chatting now.`,
        },
      ]);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "user",
          text: message,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4">
          <h3 className="text-xl font-bold mb-4">Available Groups</h3>
          {groups.map((group) => (
            <div
              key={group.id}
              className={`p-4 mb-4 border rounded cursor-pointer ${
                group.full ? "bg-gray-300" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => joinGroup(group)}
            >
              <h4 className="font-bold">{group.name}</h4>
              <p>{group.description}</p>
              <span className="text-sm text-gray-600">
                {group.members} members
              </span>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white">
            <h4 className="text-xl font-bold">
              {selectedGroup ? selectedGroup.name : "Select a Group to Join"}
            </h4>
            <span className="text-sm text-gray-600">
              {selectedGroup ? selectedGroup.status : "You are not in a group"}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4" id="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.time && (
                    <span className="block text-xs mt-1">{msg.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-1 border rounded-l px-4 py-2"
              disabled={!selectedGroup || selectedGroup.status.includes("full")}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              disabled={!selectedGroup || selectedGroup.status.includes("full")}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatUI;
