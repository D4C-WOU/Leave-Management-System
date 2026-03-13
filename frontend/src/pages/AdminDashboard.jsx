import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function AdminDashboard() {

  const [stats, setStats] = useState({
    employees: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const fetchData = async () => {
    try {

      const empRes = await API.get("/users");
      const leaveRes = await API.get("/leaves");

      const leaves = leaveRes.data;

      const pending = leaves.filter(l => l.status === "pending").length;
      const approved = leaves.filter(l => l.status === "approved").length;
      const rejected = leaves.filter(l => l.status === "rejected").length;

      setStats({
        employees: empRes.data.length,
        pending,
        approved,
        rejected
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <Layout>

      <div>

        <h2 className="text-3xl font-semibold text-gray-700">
          Admin Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          System overview and leave statistics
        </p>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          {/* Employees */}

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-gray-500 text-sm">
              Total Employees
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.employees}
            </p>

          </div>


          {/* Pending */}

          <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-yellow-600 text-sm">
              Pending Requests
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.pending}
            </p>

          </div>


          {/* Approved */}

          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-green-600 text-sm">
              Approved Leaves
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.approved}
            </p>

          </div>


          {/* Rejected */}

          <div className="bg-red-50 p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-red-600 text-sm">
              Rejected Requests
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.rejected}
            </p>

          </div>

        </div>

      </div>

    </Layout>

  );
}

export default AdminDashboard;