import React, { useState } from "react";
import axios from "axios";

function LeaveTypeForm({ refresh }) {

  const [name, setName] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/leave-types",
        { name, maxDays, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setMaxDays("");
      setDescription("");
      refresh();

    } catch (err) {
      alert(err.response?.data?.message || "Error adding leave type");
    }
  };

  return (

    <form onSubmit={submit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Leave Name
        </label>

        <input
          placeholder="e.g. Sick Leave"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Maximum Days
        </label>

        <input
          type="number"
          placeholder="e.g. 10"
          value={maxDays}
          onChange={(e) => setMaxDays(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Description
        </label>

        <textarea
          placeholder="Optional description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          rows="3"
        />
      </div>

      <button
        className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition"
      >
        Add Leave Type
      </button>

    </form>

  );
}

export default LeaveTypeForm;