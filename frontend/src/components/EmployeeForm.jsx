import React, { useState } from "react";

function EmployeeForm({ onSubmit, initial }) {

  const [form, setForm] = useState(
    initial || { name: "", email: "", password: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-300 shadow-sm rounded-lg p-6 space-y-4"
    >

      <h3 className="text-lg font-medium text-slate-700">
        {initial ? "Edit Employee" : "Add New Employee"}
      </h3>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Name
        </label>

        <input
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Employee Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Email
        </label>

        <input
          type="email"
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="employee@email.com"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />
      </div>

      {!initial && (
        <div>

          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>

          <input
            type="password"
            className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Enter password"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

        </div>
      )}

      <button
        className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition"
      >
        {initial ? "Update Employee" : "Add Employee"}
      </button>

    </form>
  );
}

export default EmployeeForm;