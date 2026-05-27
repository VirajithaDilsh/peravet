"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NewUserForm from "@/components/NewUserForm";
import { getUserByIdAPI, updateUserAPI, User } from "@/services/userApi";
import { FormValues } from "@/types/users";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [user, setUser] = useState<Partial<FormValues> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByIdAPI(id);

        setUser({
          _id: data._id,
          name: data.name || "",
          email: data.email || "",
          password: "",
          confirmPassword: "",
          role: data.role || "",
          department: data.department || "",
          year: data.year,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      if (!updatedUser._id) return;

      await updateUserAPI(updatedUser._id, updatedUser);

      router.push("/dashboard/admin#userTable");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-black">Loading user...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">User not found.</p>;
  }

  return (
    <NewUserForm
      isEdit={true}
      defaultValues={user}
      onSubmit={handleUpdateUser}
    />
  );
}