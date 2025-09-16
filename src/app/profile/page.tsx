"use client";

import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { currentUser, editUser } = useUserContext();
  const router = useRouter();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [department, setDepartment] = useState(
    currentUser?.role === "student" ? currentUser.department : ""
  );
  const [year, setYear] = useState(
    currentUser?.role === "student" ? currentUser.year : 1
  );
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

<<<<<<< HEAD
  // Keep fields in sync with currentUser
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      if (currentUser.role === "student") {
        setDepartment(currentUser.department);
        setYear(currentUser.year);
      }
=======
    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-600 text-black">
                <p className="p-4 text-red-500">
                    You need to login to view your profile.
                </p>
            </div>
        );
>>>>>>> 726cc10df10fd515071f00473e0334827eb6fda5
    }
  }, [currentUser]);

<<<<<<< HEAD
  // Auto-focus first input in edit mode
  useEffect(() => {
    if (editMode) {
      const firstInput = document.querySelector<HTMLInputElement>("input");
      firstInput?.focus();
    }
  }, [editMode]);
=======
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...currentUser,
            name,
            email,
            password,
            ...(currentUser.role === "student" ? { department, year } : {}),
        };
        editUser(updatedUser);
        setMessage("Profile updated successfully!");
        router.push("/profile");
    };
>>>>>>> 726cc10df10fd515071f00473e0334827eb6fda5

  if (!currentUser) {
    return (
<<<<<<< HEAD
      <p className="p-4 text-red-500 text-center text-lg font-medium">
        You need to login to view your profile.
      </p>
=======
        <div className="min-h-screen bg-[#D4F2D9] flex items-center justify-center">
            <div className="max-w-xl w-full p-6 bg-white text-black rounded-2xl shadow mt-6">
                <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

                {message && <p className="text-green-600 mb-4">{message}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {currentUser.role === "student" && (
                        <>
                            <div>
                                <label className="block mb-1 font-medium">Department</label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Year</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
>>>>>>> 726cc10df10fd515071f00473e0334827eb6fda5
    );
  }

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      name,
      email,
      ...(currentUser.role === "student" && { department, year }),
    };
    editUser(updatedUser);
    setMessage("Profile updated successfully!");
    setEditMode(false);
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    if (currentUser.role === "student") {
      setDepartment(currentUser.department);
      setYear(currentUser.year);
    }
    setEditMode(false);
    setMessage("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#D4F2D9" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-400 p-8 text-center relative">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
              <User className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">{name}</h1>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-green-600 font-medium"
            >
              {message}
            </motion.p>
          )}

          <div className="space-y-4">
            <Field label="Name" value={name} setValue={setName} editable={editMode} />
            <Field label="Email" value={email} setValue={setEmail} editable={editMode} />
            {currentUser.role === "student" && (
              <>
                <Field
                  label="Department"
                  value={department}
                  setValue={setDepartment}
                  editable={editMode}
                />
                <Field
                  label="Year"
                  value={year}
                  setValue={setYear}
                  editable={editMode}
                  type="number"
                />
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="text-center mt-4 flex justify-center gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-white transition
                ${editMode ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={editMode ? handleSave : () => setEditMode(true)}
            >
              {editMode ? "Save" : "Edit"}
            </button>

            {editMode && (
              <button
                className="px-6 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Reusable Field component
const Field = ({
  label,
  value,
  setValue,
  editable = false,
  type = "text",
}: {
  label: string;
  value: any;
  setValue: (val: any) => void;
  editable?: boolean;
  type?: string;
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-semibold text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        readOnly={!editable}
        onChange={e =>
          type === "number" ? setValue(Number(e.target.value)) : setValue(e.target.value)
        }
        className={`w-full p-3 rounded-xl border shadow-sm text-sm focus:outline-none transition
          ${editable
            ? "bg-white border-blue-400 focus:ring-2 focus:ring-blue-500"
            : "bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed"}`}
      />
    </div>
  );
};
