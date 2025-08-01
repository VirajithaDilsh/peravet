import AnimalEntryForm from "@/components/AnimalEntryForm";

export default function NewAnimalPage() {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl text-black font-bold mb-6">Add New Animal</h1>
            <AnimalEntryForm />
        </div>
    );
}
