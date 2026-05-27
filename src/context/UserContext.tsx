"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  loginUserAPI,
  getUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  User,
} from "@/services/userApi";

interface UserContextProps {
  users: User[];
  currentUser: User | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  addUser: (user: User) => Promise<void>;
  editUser: (id: string, user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  getUserById: (id: string) => User | undefined;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load current user + users
  useEffect(() => {
    const init = async () => {
      try {
        const storedCurrentUser = localStorage.getItem("currentUser");

        if (storedCurrentUser) {
          setCurrentUser(JSON.parse(storedCurrentUser));
        }

        const token = localStorage.getItem("token");

        if (token) {
          const data = await getUsersAPI();
          setUsers(data);
        }
      } catch (err) {
        console.error("User loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Save current user only
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Refresh users from backend
  const refreshUsers = async () => {
    try {
      const data = await getUsersAPI();
      setUsers(data);
    } catch (err) {
      console.error("Refresh users error:", err);
    }
  };

  // Login using backend
  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const data = await loginUserAPI({ email, password });

    localStorage.setItem("token", data.token);
    setCurrentUser(data.user);

    await refreshUsers();

    return true;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUsers([]);
  };

 const addUser = async (user: User) => {
  try {
    const newUser = await createUserAPI(user);

    // Option 1: add returned user directly to table
    setUsers((prev) => [...prev, newUser]);

    // Option 2: safest way, reload from backend
    await refreshUsers();
  } catch (err) {
    console.error("Add user error:", err);
  }
};

  const editUser = async (id: string, user: User) => {
    try {
      const updatedUser = await updateUserAPI(id, user);

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? updatedUser : u))
      );

      if (currentUser?._id === id) {
        setCurrentUser(updatedUser);
      }
    } catch (err) {
      console.error("Edit user error:", err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteUserAPI(id);

      setUsers((prev) => prev.filter((u) => u._id !== id));

      if (currentUser?._id === id) {
        logout();
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  const getUserById = (id: string): User | undefined => {
    return users.find((u) => u._id === id);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loading,
        login,
        logout,
        addUser,
        editUser,
        deleteUser,
        getUserById,
        refreshUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }

  return context;
};