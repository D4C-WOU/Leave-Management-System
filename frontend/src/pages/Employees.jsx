import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import API from "../api/axios";
import Layout from "../components/Layout";

function Employees() {

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (data) => {
    await API.post("/users", data);
    fetchUsers();
  };

  const updateUser = async (data) => {
    await API.put(`/users/${editing._id}`, data);
    setEditing(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <Layout>

      <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Employees
      </h2>

      {/* Form */}
      <div className="bg-slate-50 border border-slate-300 shadow-sm rounded-lg p-6 mb-8">
        <EmployeeForm
          onSubmit={editing ? updateUser : addUser}
          initial={editing}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-300 shadow-sm rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-200 text-slate-700">

            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left">Email</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((u) => (

              <tr key={u._id} className="border-t hover:bg-slate-100">

                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>

                <td className="text-center space-x-2">

                  <button
                    onClick={() => setEditing(u)}
                    className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
                  >
                    Delete
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

export default Employees;