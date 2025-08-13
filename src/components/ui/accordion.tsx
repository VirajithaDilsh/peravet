import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionContextType = {
    openItems: string[];
    toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
                              children,
                              type = "multiple",
                              className,
                          }: {
    children: React.ReactNode;
    type?: "single" | "multiple";
    className?: string;
}) {
    const [openItems, setOpenItems] = React.useState<string[]>([]);

    const toggleItem = (value: string) => {
        setOpenItems((prev) =>
            type === "single"
                ? prev.includes(value)
                    ? []
                    : [value]
                : prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
        );
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className={cn("space-y-2", className)}>{children}</div>
        </AccordionContext.Provider>
    );
}

const AccordionItemContext = React.createContext<{ value: string } | null>(
    null
);

export function AccordionItem({
                                  value,
                                  children,
                                  className,
                              }: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <AccordionItemContext.Provider value={{ value }}>
            <div className={cn("border rounded-lg", className)}>{children}</div>
        </AccordionItemContext.Provider>
    );
}

export function AccordionTrigger({
                                     children,
                                     className,
                                 }: {
    children: React.ReactNode;
    className?: string;
}) {
    const ctx = React.useContext(AccordionContext);
    const item = React.useContext(AccordionItemContext);

    if (!ctx || !item) return null;

    const isOpen = ctx.openItems.includes(item.value);

    return (
        <button
            onClick={() => ctx.toggleItem(item.value)}
            className={cn(
                "w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-100",
                className
            )}
            aria-expanded={isOpen}
            aria-controls={`${item.value}-content`}
            id={`${item.value}-header`}
            type="button"
        >
            {children}
            <span className="ml-2">{isOpen ? "−" : "+"}</span>
        </button>
    );
}

export function AccordionContent({
                                     children,
                                     className,
                                 }: {
    children: React.ReactNode;
    className?: string;
}) {
    const ctx = React.useContext(AccordionContext);
    const item = React.useContext(AccordionItemContext);

    if (!ctx || !item) return null;

    const isOpen = ctx.openItems.includes(item.value);

    return isOpen ? (
        <div
            className={cn("p-4 border-t", className)}
            role="region"
            aria-labelledby={`${item.value}-header`}
            id={`${item.value}-content`}
        >
            {children}
        </div>
    ) : null;
}
