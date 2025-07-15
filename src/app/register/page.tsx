// RegistrationNotice.jsx
import React from "react";

export default function RegistrationNotice() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D4F2D9] px-4">
            <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-6">
                    Registration Notice
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    If you are a <span className="font-semibold">Veterinary Doctor</span>,{" "}
                    <span className="font-semibold">Student</span>, or{" "}
                    <span className="font-semibold">Farm Employee</span> and want to register
                    for the Farm Management System,
                </p>
                <p className="text-gray-700 text-lg mb-6 font-semibold">
                    please meet the <span className="text-green-600">Farm Manager</span> first.
                </p>
                <p className="text-gray-600">
                    The Farm Manager will assist you with the registration process and provide
                    the necessary credentials.
                </p>
            </div>
        </div>
    );
}
