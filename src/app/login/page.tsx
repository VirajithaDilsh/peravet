"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const { login, currentUser } = useUserContext();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // ✅ await login since it's async
        const success = await login(email, password);

        if (!success) {
            setError("Invalid email or password");
            return;
        }

        setSubmitted(true); // trigger redirect
    };

    useEffect(() => {
        if (submitted && currentUser) {
            if (currentUser.role === "admin") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard");
            }
        }
    }, [submitted, currentUser, router]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#D4F2D9] px-4">
            <motion.div
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col items-center justify-center">
                    <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={250}
                        height={85}
                        className="rounded-lg"
                    />
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-8 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        required
                    />

                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        required
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end text-sm mb-8">
                        <Link href="/forgotpassword" className="text-green-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full bg-[#20B15A] text-white py-3 rounded-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Continue
                    </motion.button>

                    <div className="flex items-center justify-center mt-6 text-sm">
                        <p className="text-black">
                            New User?{" "}
                            <Link href="/register" className="text-green-600 font-bold hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
                
            </motion.div>
        </div>
    );
}
