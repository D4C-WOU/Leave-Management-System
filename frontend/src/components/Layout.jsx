import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkStyle =
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition";

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-slate-700">
          LeaveFlow
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-1">

          <NavLink className={linkStyle} to="/dashboard">
            Dashboard
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink className={linkStyle} to="/employees">
                Employees
              </NavLink>

              <NavLink className={linkStyle} to="/leave-types">
                Leave Types
              </NavLink>

              <NavLink className={linkStyle} to="/manage-leaves">
                Manage Leaves
              </NavLink>
            </>
          )}

          {role === "employee" && (
            <>
              <NavLink className={linkStyle} to="/apply-leave">
                Apply Leave
              </NavLink>

              <NavLink className={linkStyle} to="/my-leaves">
                My Leaves
              </NavLink>
            </>
          )}

        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8">

          <h1 className="text-lg font-semibold text-slate-700">
            Leave Management System
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
          >
            Logout
          </button>

        </header>

        {/* Page Content */}
        <main className="p-8 flex-1">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

export default Layout;