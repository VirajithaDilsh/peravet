"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {JSX, useState} from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home(): JSX.Element {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    // Helper for programmatic navigation
    const goToLogin = (): void => {
        router.push("/login");
    };

    return (
        <main className="font-[Poppins,sans-serif] relative scroll-smooth">
            {/* HERO BACKGROUND */}
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/cow.png')",
                    backgroundPosition: "center 0px",
                }}
            >


            {/* HEADER */}
                <header className="relative w-full h-20 md:h-24">
                    {/* Desktop/Tablet logo */}
                    <motion.div
                        className="absolute top-0 left-8 hidden sm:block"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="/logo.png"
                            alt="desktop logo"
                            width={350}
                            height={260}
                            className="rounded-lg w-[200px] md:w-[300px] lg:w-[350px] h-auto"
                        />
                    </motion.div>



                    {/* Mobile logo */}
                    <motion.div
                        className="absolute top-4 left-4 block sm:hidden"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="/logo-mobile.png"
                            alt="mobile logo"
                            width={80}
                            height={25}
                            className="rounded-lg"
                        />
                    </motion.div>

                    {/* Nav + Buttons */}
                    <div className="absolute top-10 right-10 flex items-center space-x-6">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex space-x-6">
                            {["Home", "Features", "About", "Contact"].map((link) => (
                                <Link
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="text-black font-bold hover:text-green-600 hover:underline transition"
                                >
                                    {link}
                                </Link>
                            ))}
                        </nav>

                        {/* Login / Register always visible */}
                        <div className="hidden sm:flex gap-x-3">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/login"
                                    className="text-black border border-black font-bold px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-black hover:text-white transition"
                                >
                                    Login
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/register"
                                    className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-green-700 transition"
                                >
                                    Register
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="md:hidden ml-2"
                            aria-label="Open menu"
                        >
                            <Menu size={28} className="text-green-600" />
                        </button>
                    </div>
                </header>

                {/* MOBILE MENU OVERLAY with animation */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="absolute top-6 right-6 text-white"
                                aria-label="Close menu"
                            >
                                <X size={32} />
                            </button>

                            {/* Menu links */}
                            <motion.nav
                                className="flex flex-col items-center space-y-6 text-white text-2xl font-bold"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {["Home", "Features", "About", "Contact"].map((link) => (
                                    <Link
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="hover:text-green-400 transition"
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </motion.nav>

                            {/* Login/Register inside overlay */}
                            <motion.div
                                className="flex gap-4 mt-8 md:hidden"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href="/login"
                                    className="bg-white text-black font-bold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-700 transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HERO SECTION */}
                <section className="relative h-screen">
                    <motion.div
                        className="absolute top-60 left-10 md:bottom-20 md:left-20 max-w-xl text-left z-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl font-bold mb-4 leading-snug text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                        >
                            Manage Your Farm <br className="hidden md:block" /> Smarter
                        </motion.h1>
                        <motion.p
                            className="text-sm md:text-base mb-6 text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            This website is designed to help veterinary doctors <br className="block md:hidden"/> and farm staff
                            manage animals more easily.
                            <br />
                            You can view animal details, track vaccinations,<br className="block md:hidden"/> monitor
                            treatments, and improve communication<br className="block md:hidden"/> — all in one place.
                        </motion.p>
                        <motion.button
                            onClick={goToLogin}
                            className="bg-green-600 text-white px-5 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base hover:bg-green-700 transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </motion.div>
                </section>
            </div>

            {/* FEATURES SECTION */}
            <section id="features" className="bg-white p-6 md:p-10 text-center">
                <motion.h2
                    className="text-xl md:text-2xl font-bold text-black mt-6 mb-6 md:mt-10 md:mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Features
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-10">
                    {[
                        {
                            img: "/features/Activity.svg",
                            title: "Centralized Platform",
                            desc: "Connect vets & farmers for better care.",
                        },
                        {
                            img: "/features/Heart.svg",
                            title: "Improves Animal Care",
                            desc: "Veterinary tracking and animal history records.",
                        },
                        {
                            img: "/features/Work.svg",
                            title: "Enhanced Tech Skills",
                            desc: "Empower users to learn modern farm management.",
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center text-black hover:bg-gray-100 hover:rounded-3xl hover:scale-105 transition p-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                        >
                            <Image
                                src={feature.img}
                                alt={feature.title}
                                width={80}
                                height={80}
                                className="rounded-lg"
                            />
                            <p className="text-lg md:text-xl font-semibold mt-4">
                                {feature.title}
                            </p>
                            <p className="text-sm md:text-base">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="bg-[#E7E7E7] p-6 md:p-10 text-black">
                <motion.h2
                    className="text-xl md:text-2xl font-bold mt-6 mb-6 md:mt-10 md:mb-10 text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    About Us
                </motion.h2>
                <motion.p
                    className="text-base md:text-xl mb-6 md:mb-10 leading-relaxed text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Farm Management System is a simple and smart platform designed to help
                    veterinary doctors and farm staff manage animal information easily.{" "}
                    <br /> We help track animal health, vaccinations, treatments, and improve
                    communication between doctors and farm workers. <br /> Our goal is to
                    make animal care better and more organized.
                </motion.p>
            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="bg-[#5FBFCA] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>
                    <form className="space-y-4">
                        <label className="text-sm md:text-base">Name</label>
                        <input
                            className="border p-2 w-full rounded"
                            placeholder="Name"
                            type="text"
                        />
                        <input
                            className="border p-2 w-full rounded"
                            placeholder="Email"
                            type="email"
                        />
                        <textarea
                            className="border p-2 w-full rounded"
                            rows={4}
                            placeholder="Type Message here"
                        ></textarea>
                        <motion.button
                            className="bg-[#20B15A] text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            whileHover={{ scale: 1.05 }}
                            type="submit"
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src="/Tech support call on the computer.png"
                        alt="Tech support"
                        width={300}
                        height={250}
                        className="rounded-lg md:w-[407px] md:h-[374px]"
                    />
                </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="bg-green-500 text-black py-8 md:py-10 px-6 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center md:text-left">
                    {/* Socials */}
                    <div>
                        <div className="flex justify-center md:justify-start space-x-4 mb-4">
                            {[
                                { href: "https://facebook.com", img: "/social/fb.svg" },
                                { href: "https://twitter.com", img: "/social/twitter.svg" },
                                { href: "https://linkedin.com", img: "/social/linkin.svg" },
                                { href: "https://instagram.com", img: "/social/insta.svg" },
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    className="transition-transform"
                                >
                                    <Image src={social.img} alt="social" width={35} height={35} />
                                </motion.a>
                            ))}
                        </div>
                        <p className="mt-4">Copyright Team codeX 2025</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {["Home", "Features", "About Us", "Contact Us"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`#${link.toLowerCase().replace(" ", "")}`}
                                        className="hover:underline hover:text-green-800 transition"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="font-bold mb-4">Address</h3>
                        <p>
                            Veterinary Teaching Farm
                            <br />
                            Udaperadeniya
                            <br />
                            Peradeniya, Sri Lanka
                            <br />
                            20400
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
