"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#D4F2D9] px-4">
            <motion.div
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={250}
                        height={85}
                        className="rounded-lg"
                    />
                </div>
                <form>
                    {/* Email Input */}
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mt-8 mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        required
                    />

                    {/* Password Input */}
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        required
                    />

                    <div className="flex justify-end text-sm mb-8">
                        <Link href="/register" className="text-green-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button with animation */}
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
                            <Link
                                href="/register"
                                className="text-green-600 font-bold hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
