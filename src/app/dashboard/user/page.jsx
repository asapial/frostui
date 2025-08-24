"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";

export default function UserOverview() {
  // Hardcoded data for charts
  const activityData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 7 },
    { name: "Thu", value: 20 },
    { name: "Fri", value: 18 },
    { name: "Sat", value: 25 },
    { name: "Sun", value: 12 },
  ];

  const pieData = [
    { name: "Completed", value: 60 },
    { name: "Pending", value: 25 },
    { name: "Failed", value: 15 },
  ];

  const COLORS = ["#239eab", "#74deee", "#facc15"];

  const barData = [
    { month: "Jan", components: 3 },
    { month: "Feb", components: 6 },
    { month: "Mar", components: 2 },
    { month: "Apr", components: 9 },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-[#239eab] to-[#74deee] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">User Overview</h1>

      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/90 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Components</h2>
          <p className="text-3xl font-bold text-[#239eab] mt-2">24</p>
        </div>
        <div className="bg-white/90 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">Active Sessions</h2>
          <p className="text-3xl font-bold text-[#239eab] mt-2">12</p>
        </div>
        <div className="bg-white/90 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">Tasks Completed</h2>
          <p className="text-3xl font-bold text-[#239eab] mt-2">89%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white/90 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#239eab" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/90 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Task Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="mt-6 bg-white/90 shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Components Created</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="components" fill="#239eab" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
