import { useTasks } from "@/context/TasksContext";
import { format } from "date-fns";

export default function TasksTable() {
    const { tasks, completed, markCompleted, undoCompleted } = useTasks();

    return (
        <table className="min-w-full border">
            <thead>
            <tr>
                <th>Next Date</th> {/* Show nextDate instead of dueDate */}
                <th>Type</th>
                <th>Species</th>
                <th>Tag</th>
                <th>Completed On</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((t) => {
                const isDone = !!completed[t.key];
                const completedDate = isDone ? format(new Date(completed[t.key]), "yyyy-MM-dd") : "";
                return (
                    <tr key={t.key} className={isDone ? "opacity-50" : ""}>
                        <td>{t.nextDate ? format(new Date(t.nextDate), "yyyy-MM-dd") : ""}</td>
                        <td>{t.type}</td>
                        <td>{t.species}</td>
                        <td>{t.animalTag}</td>
                        <td>{completedDate}</td>
                        <td>
                            {isDone ? (
                                <button onClick={() => undoCompleted(t.key)}>Undo</button>
                            ) : (
                                <button onClick={() => markCompleted(t.key)}>Done</button>
                            )}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
