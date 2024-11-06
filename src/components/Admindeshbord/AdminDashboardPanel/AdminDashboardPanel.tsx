"use client";
import React from "react";
import { Line } from "react-chartjs-2"; // For graphs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Dummy data for graphs
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Payments",
        data: [100, 200, 150, 300, 250, 400],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Posts",
        data: [50, 100, 80, 150, 120, 180],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
      {
        label: "User Activity",
        data: [200, 180, 220, 250, 210, 300],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Activity Overview",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:mr-0 mr-7">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md lg:mt-[-50px] rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Control Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Content Management */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
            <p>View, edit, or delete posts and content.</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md">
              Go to Content
            </button>
          </div>

          {/* User Management */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <p>View and manage user accounts and activity.</p>
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md">
              <Link href="/Deshbord/allUser"> Go to Users</Link>
            </button>
          </div>

          {/* Payment History */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <p>View payment history and manage subscriptions.</p>
            <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md">
              Go to Payments
            </button>
          </div>
        </div>

        {/* Graphs */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Monthly Stats</h2>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
