import React, { useState, useEffect } from "react";
import API from "../api/axios";

function LeaveRequestForm() {

  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await API.get("/leave-types");
        setTypes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTypes();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/leaves", form);

      alert("Leave application submitted successfully!");

      setForm({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: ""
      });

    } catch (err) {
      console.error("Leave submit error:", err);
    }
  };

  return (

    <form
      onSubmit={submit}
      className="bg-white border border-slate-300 shadow-sm rounded-lg p-6 space-y-5 mt-4"
    >

      <h3 className="text-lg font-medium text-slate-700">
        Apply for Leave
      </h3>

      {/* Leave Type */}
      <div>

        <label className="block text-sm font-medium text-slate-600 mb-1">
          Leave Type
        </label>

        <select
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          value={form.leaveType}
          onChange={(e) =>
            setForm({ ...form, leaveType: e.target.value })
          }
          required
        >
          <option value="">Select Leave Type</option>

          {types.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}

        </select>

      </div>


      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="block text-sm font-medium text-slate-600 mb-1">
            Start Date
          </label>

          <input
            type="date"
            className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
            required
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-slate-600 mb-1">
            End Date
          </label>

          <input
            type="date"
            className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={form.toDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
            required
          />

        </div>

      </div>


      {/* Reason */}
      <div>

        <label className="block text-sm font-medium text-slate-600 mb-1">
          Reason for Leave
        </label>

        <textarea
          rows="4"
          placeholder="Explain the reason for your leave..."
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
          required
        />

      </div>


      {/* Submit */}
      <button
        type="submit"
        className="bg-slate-800 text-white px-5 py-2 rounded-md hover:bg-slate-900 transition"
      >
        Submit Leave Application
      </button>

    </form>

  );
}

export default LeaveRequestForm;