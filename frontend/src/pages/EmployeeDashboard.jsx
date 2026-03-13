import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function EmployeeDashboard() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves/mine");
      const leaves = res.data;

      const pending = leaves.filter(l => l.status === "pending").length;
      const approved = leaves.filter(l => l.status === "approved").length;
      const rejected = leaves.filter(l => l.status === "rejected").length;

      setStats({
        total: leaves.length,
        pending,
        approved,
        rejected
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <Layout>
      <div>

        <h2 className="text-3xl font-semibold text-gray-700">
          Employee Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Overview of your leave activity
        </p>

        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Leave Requests</h3>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-yellow-600 text-sm">Pending Approval</h3>
            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-green-600 text-sm">Approved Leaves</h3>
            <p className="text-3xl font-bold mt-2">{stats.approved}</p>
          </div>

          <div className="bg-red-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-red-600 text-sm">Rejected Requests</h3>
            <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
          </div>

        </div>

      </div>
    </Layout>



  );
}

export default EmployeeDashboard;