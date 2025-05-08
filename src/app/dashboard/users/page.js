"use client";
import { useState, useEffect } from "react";


function fetchUsers() {
  return fetch("/api/users")
    .then((res) => res.json())
    .catch((err) => console.error("Error fetching users:", err));
}

function updateUserStatus(userId, status) {
  return fetch(`/api/users/${userId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).catch((err) => console.error("Error updating user status:", err));
}

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    updateUserStatus(userId, newStatus).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    });
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Joined Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">{user.status}</td>
              <td className="border border-gray-300 px-4 py-2">{user.joinedDate}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleStatusToggle(user.id, user.status)}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

// API route handler (to be placed in /pages/api/users.js)
export async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch users from database or mock data
    const users = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        joinedDate: "2023-01-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "blocked",
        joinedDate: "2023-02-15",
      },
    ];
    res.status(200).json(users);
  } else if (req.method === "PATCH") {
    const { userId, status } = req.body;
    // Update user status in database (mock implementation)
    res.status(200).json({ message: `User ${userId} status updated to ${status}` });
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}