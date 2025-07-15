import Sidebar from '@/components/Sidebar'; // adjust path accordingly

export default function Home() {
    return (
        <div className="flex">
            <main className="flex-1 p-4 text-black">
                {/* Main content goes here */}
                <h1>Hello, main layer!</h1>
            </main>
        </div>
    );
}