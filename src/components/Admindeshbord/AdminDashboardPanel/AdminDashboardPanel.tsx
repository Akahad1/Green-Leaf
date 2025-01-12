"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import axios from "axios";

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
  // State to store dynamic data
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dynamically
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, postResponse] = await Promise.all([
          axios.get("https://green-leaf-server-site.vercel.app/api/a6/user"),
          axios.get("https://green-leaf-server-site.vercel.app/api/a6/post"),
        ]);

        setUserData(userResponse.data.data);
        setPostData(postResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare dynamic data for graphs
  const graphData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Posts",
        data: postData.slice(0, 12).map((_, i) => (i + 1) * 10), // Mock posts for 12 months
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "User Registrations",
        data: userData.slice(0, 12).map((_, i) => (i + 1) * 15), // Mock users for 12 months
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
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
        text: "Monthly Stats for the Year",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600 text-lg">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg p-6 text-white mb-6">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg">
            Overview of platform statistics and insights
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Users */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-600 text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2 text-blue-500">
              {userData.length}
            </p>
            <Link href="/Deshbord/allUser">
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                View Users
              </button>
            </Link>
          </div>

          {/* Total Posts */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-600 text-xl font-semibold">Total Posts</h2>
            <p className="text-3xl font-bold mt-2 text-purple-500">
              {postData.length}
            </p>
            <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">
              Manage Posts
            </button>
          </div>

          {/* Active Users */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-600 text-xl font-semibold">
              Active Users
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-500">
              {Math.floor(userData.length * 0.8)}
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
              View Activity
            </button>
          </div>

          {/* Payment History */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-gray-600 text-xl font-semibold">
              Monthly Revenue
            </h2>
            <p className="text-3xl font-bold mt-2 text-orange-500">$5,200</p>
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
              View Payments
            </button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Activity Overview
          </h2>
          <Line data={graphData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
