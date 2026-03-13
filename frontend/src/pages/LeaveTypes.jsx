import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaveTypeForm from "../components/LeaveTypeForm";
import Layout from "../components/Layout";

function LeaveTypes() {

  const [types, setTypes] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTypes = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/leave-types",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setTypes(res.data);
  };

  const deleteType = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/leave-types/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchTypes();
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (

    <Layout>

      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
          Manage Leave Types
        </h2>

        {/* FORM SECTION */}

        <div className="bg-white border border-slate-300 shadow-sm rounded-lg p-6 mb-8">

          <h3 className="text-lg font-medium text-slate-700 mb-4">
            Add New Leave Type
          </h3>

          <LeaveTypeForm refresh={fetchTypes} />

        </div>

        {/* TABLE SECTION */}

        <div className="bg-white border border-slate-300 shadow-sm rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-200 text-slate-700">

              <tr>
                <th className="p-3 text-left">Leave Type</th>
                <th className="text-left">Max Days</th>
                <th className="text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {types.map((t) => (

                <tr key={t._id} className="border-t hover:bg-slate-100">

                  <td className="p-3">{t.name}</td>

                  <td>{t.maxDays}</td>

                  <td className="text-center">

                    <button
                      onClick={() => deleteType(t._id)}
                      className="bg-red-200 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-300"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

              {types.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-6"
                  >
                    No Leave Types Added
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );
}

export default LeaveTypes;