import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function MyLeaves() {

  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves/mine");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const cancelLeave = async (id) => {
    try {
      await API.delete(`/leaves/${id}`);
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling leave");
    }
  };

  return (
    <Layout>

      <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        My Leave Requests
      </h2>

      <div className="bg-white border border-slate-300 shadow-sm rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-200 text-slate-700">

            <tr>
              <th className="p-3 text-left">Leave Type</th>
              <th className="text-left">From</th>
              <th className="text-left">To</th>
              <th className="text-left">Reason</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr key={leave._id} className="border-t hover:bg-slate-100">

                <td className="p-3">{leave.leaveType?.name}</td>

                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>

                <td>{new Date(leave.toDate).toLocaleDateString()}</td>

                <td className="text-slate-600">{leave.reason}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded text-sm font-medium
                    ${leave.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : leave.status === "rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                  >
                    {leave.status}
                  </span>

                </td>

                <td>

                  {leave.status === "pending" && (

                    <button
                      onClick={() => cancelLeave(leave._id)}
                      className="bg-red-200 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-300"
                    >
                      Cancel
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default MyLeaves;