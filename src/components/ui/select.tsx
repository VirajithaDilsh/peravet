"use client";

import React, {
    createContext,
    useContext,
    useId,
    useState,
    ReactNode,
    useCallback,
    useEffect,
    KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------- Types ---------------- */

type OnValueChange = (val: string) => void;

interface SelectContextType {
    value?: string;
    setValue: (v: string) => void;
    open: boolean;
    setOpen: (v: boolean) => void;
    registerItem: (id: string, value: string, label: string) => void;
    unregisterItem: (id: string) => void;
    onValueChange?: OnValueChange;
}

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
    const ctx = useContext(SelectContext);
    if (!ctx) throw new Error("Select components must be used within <Select />");
    return ctx;
}

/* ---------------- Parent Select ---------------- */

interface SelectProps {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: OnValueChange;
    className?: string;
}

export function Select({
                           children,
                           value: controlledValue,
                           defaultValue,
                           onValueChange,
                           className,
                       }: SelectProps) {
    const [value, setValue] = useState<string | undefined>(defaultValue);
    const [open, setOpen] = useState(false);

    // Controlled behavior: prefer controlledValue if supplied
    const effectiveValue = controlledValue !== undefined ? controlledValue : value;

    const setValueAndNotify = useCallback(
        (v: string) => {
            if (controlledValue === undefined) setValue(v);
            onValueChange?.(v);
        },
        [controlledValue, onValueChange]
    );

    // item registry to support rendering items inside SelectContent
    const [items, setItems] = useState<
        { id: string; value: string; label: string }[]
    >([]);

    const registerItem = useCallback((id: string, value: string, label: string) => {
        setItems((prev) => {
            if (prev.find((p) => p.id === id)) return prev;
            return [...prev, { id, value, label }];
        });
    }, []);

    const unregisterItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    }, []);

    useEffect(() => {
        // close when value changes externally (optional UX)
        setOpen(false);
    }, [effectiveValue]);

    return (
        <SelectContext.Provider
            value={{
                value: effectiveValue,
                setValue: setValueAndNotify,
                open,
                setOpen,
                registerItem,
                unregisterItem,
                onValueChange,
            }}
        >
            <div className={cn("relative w-full", className)}>{children}</div>
        </SelectContext.Provider>
    );
}

/* ---------------- Trigger ---------------- */

interface SelectTriggerProps {
    children?: ReactNode;
    className?: string;
}

export function SelectTrigger({ children, className }: SelectTriggerProps) {
    const { open, setOpen } = useSelect();

    return (
        <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn(
                "w-full flex justify-between items-center rounded-md border bg-white px-3 py-2 text-sm",
                className
            )}
        >
            {children}
            <span className="ml-2 text-gray-400">▾</span>
        </button>
    );
}
SelectTrigger.displayName = "SelectTrigger";

/* ---------------- Value ---------------- */

interface SelectValueProps {
    placeholder?: string;
    className?: string;
}

export function SelectValue({ placeholder, className }: SelectValueProps) {
    const { value } = useSelect();
    return (
        <span className={cn(value ? "text-gray-900" : "text-gray-400", className)}>
      {value ?? placeholder}
    </span>
    );
}
SelectValue.displayName = "SelectValue";

/* ---------------- Content (dropdown) ---------------- */

interface SelectContentProps {
    className?: string;
    // If you want to manually pass children (not necessary usually)
    children?: ReactNode;
}

export function SelectContent({ className, children }: SelectContentProps) {
    const { open, setOpen, registerItem, unregisterItem } = useSelect();

    // Close on Escape
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    if (!open) return null;

    return (
        <div
            role="listbox"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className={cn(
                "absolute mt-1 w-full rounded-md border bg-white shadow-md z-50 max-h-56 overflow-auto",
                className
            )}
        >
            {children /* typically SelectItem components */}
        </div>
    );
}
SelectContent.displayName = "SelectContent";

/* ---------------- Item ---------------- */

interface SelectItemProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function SelectItem({ value, children, className }: SelectItemProps) {
    const id = useId();
    const { setValue, setOpen, registerItem, unregisterItem, value: current } =
        useSelect();

    useEffect(() => {
        // register when mounted
        registerItem(id, value, typeof children === "string" ? children : String(children));
        return () => unregisterItem(id);
    }, [id, value, children, registerItem, unregisterItem]);

    const selected = current === value;

    return (
        <button
            role="option"
            aria-selected={selected}
            onClick={() => {
                setValue(value);
                setOpen(false);
            }}
            className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100",
                selected ? "bg-gray-100 font-medium" : "",
                className
            )}
        >
            {children}
        </button>
    );
}
SelectItem.displayName = "SelectItem";
