"use client";

import { useMemo, useState } from "react";
import { useAnimalContext } from "@/context/AnimalContext";
import { useUserContext } from "@/context/UserContext";
import { useTasks } from "@/context/TasksContext";
import { createTaskAPI } from "@/services/taskApi";
import { toast } from "sonner";
import { Animal, Layer, Broiler } from "@/types/animals";
import { NewTaskInput } from "@/types/Task";
import { appendTaskToHealthRecords } from "@/lib/taskHealthSync";

import { User } from "@/types/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@headlessui/react";

// ---------------- ASSIGNMENT TYPES ----------------
type AssignRole = "student" | "employee" | "doctor";

type TaskAssignType =
    | "all_students"
    | "all_employees"
    | "all_doctors"
    | "specific_users";

interface AssignedUser {
    id: string;
    name: string;
    role: AssignRole;
}

// ---------------- TYPE GUARDS ----------------
const isLayerOrBroiler = (animal: Animal): animal is Layer | Broiler =>
    animal.species === "Layer" || animal.species === "Broiler";

export default function AddTaskPage() {
    const { animals, editAnimal } = useAnimalContext();
    const { users } = useUserContext();
    const { reloadTasks } = useTasks();

    const [selectedTag, setSelectedTag] = useState("");
    const [animalInput, setAnimalInput] = useState("");
    const [taskType, setTaskType] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [comment, setComment] = useState("");

    const [assignType, setAssignType] = useState<TaskAssignType>("all_students");
    const [selectedUsers, setSelectedUsers] = useState<AssignedUser[]>([]);
    const [userFilterRole, setUserFilterRole] = useState<"all" | AssignRole>("all");

    const [drug, setDrug] = useState("");
    const [dosage, setDosage] = useState<number | "">("");
    const [route, setRoute] = useState("");
    const [prescribe, setPrescribe] = useState("");

    const [feedType, setFeedType] = useState<"Starter" | "Grower" | "Layer Feed">("Starter");
    const [feedIntake, setFeedIntake] = useState("");
    const [feedRequirement, setFeedRequirement] = useState("");

    const [waterIntake, setWaterIntake] = useState("");
    const [waterRequirement, setWaterRequirement] = useState("");
    const [chlorinating, setChlorinating] = useState("");

    const selectedAnimal = animals.find(
        (a: Animal) => a.tag === selectedTag
    );

    const assignableUsers: AssignedUser[] = useMemo(() => {
        return users
            .filter(
                (user): user is User & { role: AssignRole } =>
                    user.role === "student" ||
                    user.role === "employee" ||
                    user.role === "doctor"
            )
            .map((user) => ({
                id: user.id,
                name: user.name,
                role: user.role,
            }));
    }, [users]);

    const filteredAssignableUsers = useMemo(() => {
        if (userFilterRole === "all") return assignableUsers;
        return assignableUsers.filter((user) => user.role === userFilterRole);
    }, [assignableUsers, userFilterRole]);

    const assignmentPayload = {
        assignType,
        assignedUsers: assignType === "specific_users" ? selectedUsers : [],
    };

    const getTaskOptions = (): string[] => {
        if (!selectedAnimal) return [];

        const { species, gender } = selectedAnimal;

        if (isLayerOrBroiler(selectedAnimal)) {
            return ["Treatment", "Vaccination", "Disease", "Feed", "Water"];
        }

        const commonTasks = ["Vaccination", "Deworming", "Disease"];

        if ((species === "Cattle" || species === "Buffalo") && gender === "Female") {
            return [...commonTasks, "Artificial Insemination", "Expected Calving"];
        }

        return commonTasks;
    };

    const toggleUser = (user: AssignedUser) => {
        setSelectedUsers((prev) => {
            const exists = prev.some((u) => u.id === user.id);
            if (exists) {
                return prev.filter((u) => u.id !== user.id);
            }
            return [...prev, user];
        });
    };

    const validateForm = () => {
        if (!selectedTag) {
            toast.error("Please select an animal");
            return false;
        }

        if (!taskType) {
            toast.error("Please select a task type");
            return false;
        }

        if (taskType !== "Feed" && taskType !== "Water" && !dueDate) {
            toast.error("Please select a date");
            return false;
        }

        if (assignType === "specific_users" && selectedUsers.length === 0) {
            toast.error("Please select at least one user");
            return false;
        }

        return true;
    };

    const handleAddTask = async () => {
        if (!validateForm()) return;

        const payload: NewTaskInput = {
            animalTag: selectedTag,
            type: taskType as NewTaskInput["type"],
            dueDate: dueDate || undefined,
            nextDate: nextDate || undefined,
            comment: comment || undefined,
            drug: drug || undefined,
            dosage: dosage === "" ? undefined : dosage,
            route: route || undefined,
            prescribe: prescribe || undefined,
            feedType,
            feedIntake: feedIntake || undefined,
            feedRequirement: feedRequirement || undefined,
            waterIntake: waterIntake || undefined,
            waterRequirement: waterRequirement || undefined,
            chlorinating: chlorinating || undefined,
            ...assignmentPayload,
        };

        try {
            await createTaskAPI(payload);

            if (selectedAnimal) {
                const updatedAnimal = appendTaskToHealthRecords(selectedAnimal, payload);
                if (updatedAnimal) {
                    await editAnimal(updatedAnimal);
                }
            }

            await reloadTasks();
            toast.success("Task added successfully!");
            resetForm();
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message || "Could not create task";
            toast.error(message);
        }
    };

    const resetForm = () => {
        setSelectedTag("");
        setAnimalInput("");
        setTaskType("");
        setDueDate("");
        setNextDate("");
        setComment("");
        setAssignType("all_students");
        setSelectedUsers([]);
        setUserFilterRole("all");

        setDrug("");
        setDosage("");
        setRoute("");
        setPrescribe("");

        setFeedType("Starter");
        setFeedIntake("");
        setFeedRequirement("");

        setWaterIntake("");
        setWaterRequirement("");
        setChlorinating("");
    };

    const renderTaskFields = () => {
        if (!taskType) return null;

        switch (taskType) {
            case "Treatment":
                return (
                    <>
                        <Input
                            placeholder="Drug"
                            value={drug}
                            onChange={(e) => setDrug(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <Input
                            type="number"
                            placeholder="Dosage"
                            value={dosage}
                            onChange={(e) =>
                                setDosage(e.target.value === "" ? "" : Number(e.target.value))
                            }
                            className="rounded-xl h-11"
                        />
                        <Input
                            placeholder="Route"
                            value={route}
                            onChange={(e) => setRoute(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <Input
                            placeholder="Prescribed By"
                            value={prescribe}
                            onChange={(e) => setPrescribe(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <textarea
                            rows={4}
                            className="w-full rounded-xl border p-3 resize-none"
                            placeholder="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </>
                );

            case "Feed":
                return (
                    <>
                        <Select
                            onValueChange={(v) =>
                                setFeedType(v as "Starter" | "Grower" | "Layer Feed")
                            }
                            value={feedType}
                        >
                            <SelectTrigger className="w-full rounded-xl h-11">
                                <SelectValue placeholder="Select Feed Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Starter">Starter</SelectItem>
                                <SelectItem value="Grower">Grower</SelectItem>
                                <SelectItem value="Layer Feed">Layer Feed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Input
                            placeholder="Feed Intake"
                            value={feedIntake}
                            onChange={(e) => setFeedIntake(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <Input
                            placeholder="Feed Requirement"
                            value={feedRequirement}
                            onChange={(e) => setFeedRequirement(e.target.value)}
                            className="rounded-xl h-11"
                        />
                    </>
                );

            case "Water":
                return (
                    <>
                        <Input
                            placeholder="Water Intake"
                            value={waterIntake}
                            onChange={(e) => setWaterIntake(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <Input
                            placeholder="Water Requirement"
                            value={waterRequirement}
                            onChange={(e) => setWaterRequirement(e.target.value)}
                            className="rounded-xl h-11"
                        />
                        <Input
                            placeholder="Chlorinating"
                            value={chlorinating}
                            onChange={(e) => setChlorinating(e.target.value)}
                            className="rounded-xl h-11"
                        />
                    </>
                );

            case "Disease":
            case "Vaccination":
            case "Deworming":
            case "Artificial Insemination":
            case "Expected Calving":
                return (
                    <>
                        {taskType === "Disease" && (
                            <Input
                                placeholder="Treatment / Drug"
                                value={drug}
                                onChange={(e) => setDrug(e.target.value)}
                                className="rounded-xl h-11"
                            />
                        )}

                        <textarea
                            rows={4}
                            className="w-full rounded-xl border p-3 resize-none"
                            placeholder="Comment / Details..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </>
                );

            default:
                return null;
        }
    };

    const filteredAnimals: Animal[] = animalInput
        ? animals.filter((a: Animal) =>
            a.tag.toLowerCase().includes(animalInput.toLowerCase())
        )
        : animals;

    return (
        <div className="w-full flex justify-center py-10">
            <Card className="w-full max-w-5xl shadow-lg rounded-2xl p-4 bg-white">
                <CardHeader className="border-b pb-4">
                    <CardTitle className="text-2xl font-bold">New Task</CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-medium">Associated Animal</label>

                                <Combobox<string | null>
                                    value={selectedTag || null}
                                    onChange={(value) => setSelectedTag(value ?? "")}
                                >
                                    <div className="relative">
                                        <Combobox.Input
                                            className="w-full rounded-xl h-11 border px-3"
                                            placeholder="Type or select animal"
                                            onChange={(e) => setAnimalInput(e.target.value)}
                                            displayValue={(value: string | null) => value ?? ""}
                                        />

                                        {filteredAnimals.length > 0 && (
                                            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-xl max-h-60 overflow-auto">
                                                {filteredAnimals.map((animal: Animal) => (
                                                    <Combobox.Option
                                                        key={animal.tag}
                                                        value={animal.tag}
                                                        className={({ active }) =>
                                                            `cursor-pointer select-none p-2 ${
                                                                active ? "bg-blue-500 text-white" : ""
                                                            }`
                                                        }
                                                    >
                                                        {animal.tag} ({animal.species})
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}
                                    </div>
                                </Combobox>
                            </div>

                            <div className="space-y-2">{renderTaskFields()}</div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-medium">Task Type</label>
                                <Select onValueChange={setTaskType} value={taskType}>
                                    <SelectTrigger className="w-full rounded-xl h-11">
                                        <SelectValue placeholder="Select Task Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedAnimal &&
                                            getTaskOptions().map((task) => (
                                                <SelectItem key={task} value={task}>
                                                    {task}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-medium">Assign To</label>
                                <Select
                                    value={assignType}
                                    onValueChange={(value) =>
                                        setAssignType(value as TaskAssignType)
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-xl h-11">
                                        <SelectValue placeholder="Select Assignment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all_students">All Students</SelectItem>
                                        <SelectItem value="all_employees">All Employees</SelectItem>
                                        <SelectItem value="all_doctors">All Doctors</SelectItem>
                                        <SelectItem value="specific_users">Specific Users</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {assignType === "specific_users" && (
                                <div className="space-y-4 rounded-xl border p-4">
                                    <div className="space-y-2">
                                        <label className="font-medium">Filter Users by Role</label>
                                        <Select
                                            value={userFilterRole}
                                            onValueChange={(value) =>
                                                setUserFilterRole(value as "all" | AssignRole)
                                            }
                                        >
                                            <SelectTrigger className="w-full rounded-xl h-11">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="student">Students</SelectItem>
                                                <SelectItem value="employee">Employees</SelectItem>
                                                <SelectItem value="doctor">Doctors</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium">Select Specific Users</label>
                                        <div className="max-h-52 overflow-auto rounded-xl border p-2 space-y-2">
                                            {filteredAssignableUsers.map((user) => {
                                                const checked = selectedUsers.some(
                                                    (u) => u.id === user.id
                                                );

                                                return (
                                                    <label
                                                        key={user.id}
                                                        className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => toggleUser(user)}
                                                        />
                                                        <span>
                                                            {user.name} ({user.role})
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="font-medium">Selected Users</label>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedUsers.map((user) => (
                                                    <div
                                                        key={user.id}
                                                        className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm"
                                                    >
                                                        {user.name} ({user.role})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {taskType !== "Feed" && taskType !== "Water" && (
                                <div className="space-y-2">
                                    <label className="font-medium">
                                        {taskType === "Expected Calving"
                                            ? "Expected Date"
                                            : taskType === "Artificial Insemination"
                                                ? "AI Date"
                                                : "Date"}
                                    </label>
                                    <Input
                                        type="date"
                                        className="rounded-xl h-11"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            )}

                            {taskType !== "Feed" && taskType !== "Water" && (
                                <div className="space-y-2">
                                    <label className="font-medium">
                                        {taskType === "Artificial Insemination"
                                            ? "Next AI Date"
                                            : taskType === "Expected Calving"
                                                ? "Calving Expected Follow-up Date"
                                                : "Next Date"}
                                    </label>
                                    <Input
                                        type="date"
                                        className="rounded-xl h-11"
                                        value={nextDate}
                                        onChange={(e) => setNextDate(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-10 border-t pt-5">
                        <Button variant="outline" className="rounded-xl px-6" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button
                            className="rounded-xl px-8 bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleAddTask}
                        >
                            Create Task
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}