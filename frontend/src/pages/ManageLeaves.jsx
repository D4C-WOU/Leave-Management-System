import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function ManageLeaves() {

  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchLeaves = async () => {
    const res = await API.get("/leaves");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/leaves/${id}`, { status });
    fetchLeaves();
  };

  // count leaves per employee
  const getEmployeeLeaveCount = (employeeId) => {
    return leaves.filter(l => l.employee?._id === employeeId).length;
  };

  // filter logic
  const filteredLeaves = leaves.filter(l => {
    if (filter === "all") return true;
    return l.status === filter;
  });

  return (

    <Layout>

      <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Manage Leave Requests
      </h2>

      {/* FILTER BUTTONS */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1 bg-slate-700 text-white rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("approved")}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Approved
        </button>

        <button
          onClick={() => setFilter("rejected")}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Rejected
        </button>

      </div>

      <div className="space-y-6">

        {filteredLeaves.map((l) => (

          <div
            key={l._id}
            className="bg-white shadow-md rounded-xl p-6"
          >

            <p className="text-slate-700">
              <strong>{l.employee?.name}</strong> requested{" "}
              <strong>{l.leaveType?.name}</strong>
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {new Date(l.fromDate).toLocaleDateString()} →{" "}
              {new Date(l.toDate).toLocaleDateString()}
            </p>

            {/* TOTAL LEAVES APPLIED */}

            <p className="text-xs text-gray-500 mt-1">
              Total leaves applied: {getEmployeeLeaveCount(l.employee?._id)}
            </p>

            <p className="mt-3 italic text-slate-600">
              "{l.reason}"
            </p>

            <div className="flex justify-between items-center mt-4">

              <span
                className={`px-3 py-1 rounded text-sm ${l.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : l.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {l.status}
              </span>

              {l.status === "pending" && (

                <div className="space-x-2">

                  <button
                    onClick={() => updateStatus(l._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(l._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

        {filteredLeaves.length === 0 && (
          <p className="text-gray-500">No leave requests</p>
        )}

      </div>

    </Layout>

  );
}

export default ManageLeaves;