import React from "react";
import LeaveRequestForm from "../components/LeaveRequestForm";
import Layout from "../components/Layout";

function ApplyLeave() {

  const refresh = () => {
    console.log("Leave applied successfully");
  };

  return (

    <Layout>

      <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-300 shadow-sm rounded-lg p-8">

        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Apply for Leave
        </h2>

        <p className="text-slate-500 mb-6">
          Submit a formal leave request to your administrator
        </p>

        <div className="border-l-4 border-slate-400 pl-6 text-slate-700 space-y-4">

          <p>
            <strong>To:</strong> HR / Administrator
          </p>

          <p>
            I would like to request leave for the following period:
          </p>

          <LeaveRequestForm refresh={refresh} />

          <p>
            Thank you for your consideration.
          </p>

          <p className="mt-6">

            Sincerely,
            <br />

            <span className="font-semibold">
              {localStorage.getItem("name") || "Employee"}
            </span>

          </p>

        </div>

      </div>

    </Layout>

  );
}

export default ApplyLeave;