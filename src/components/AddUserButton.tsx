"use client";
import { useRouter } from "next/navigation";

interface AddUserButtonProps {
    className?: string;
}

export default function AddUserButton({ className = "" }: AddUserButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/users/new-user");
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={`
        bg-blue-600 text-white
        px-3 py-1 text-sm         /* default mobile */
        sm:px-4 sm:py-2 sm:text-base /* small screens */
        md:px-5 md:py-3 md:text-lg   /* medium screens */
        lg:px-6 lg:py-2 lg:text-base /* large screens limit size */
        rounded-2xl
        hover:bg-blue-700
        transition-colors duration-200
        ${className}
      `}
        >
            Add User
        </button>
    );
}