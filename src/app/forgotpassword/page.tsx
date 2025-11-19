// ForgotPasswordNotice.jsx
import React from "react";
import BackButton from "@/components/Button/BackButton";

export default function ForgotPasswordNotice() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D4F2D9] px-4">
            <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-6">
                    Forgot Password
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    If you have forgotten your password for the Farm Management System,
                </p>
                <p className="text-gray-700 text-lg font-semibold mb-6">
                    please meet the <span className="text-green-600">Farm Manager</span> to reset it.
                </p>
                <p className="text-gray-600 mb-6">
                    The Farm Manager will assist you with recovering your account and provide the necessary credentials.
                </p>

                <div className="flex items-center justify-center mt-10">
                    <BackButton />
                </div>
            </div>
        </div>
    );
}
