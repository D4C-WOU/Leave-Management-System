import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      fetchLeaves(); // refresh table
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div>
        <h2>All Leave Requests</h2>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.employee?.name}</td>
                <td>{leave.leaveType?.name}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>

                <td>
                  <button
                    onClick={() => updateStatus(leave._id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(leave._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );

}

export default AdminLeaves;