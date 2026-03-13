import React from "react";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import Layout from "../components/Layout";

function Dashboard() {

  const role = localStorage.getItem("role");

  if (role === "admin") {
    return <AdminDashboard />
  }

  return <EmployeeDashboard />
}

export default Dashboard;