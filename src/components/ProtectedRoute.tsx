"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export default function ProtectedRoute({
                                           children,
                                           allowedRoles,
                                       }: {
    children: React.ReactNode;
    allowedRoles?: string[];
}) {
    const { currentUser, loading } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!currentUser) {
                router.push("/login"); // redirect if not logged in
            } else if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
                router.push("/403"); // redirect if role not allowed
            }
        }
    }, [currentUser, loading, router, allowedRoles]);

    if (loading || !currentUser) return null; // wait until context is ready

    return <>{children}</>;
}
