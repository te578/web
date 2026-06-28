import Link from "next/link";

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="bg-gray-800 text-white p-4">
                <h1>My App</h1>
            </header>

            <div className="flex">
                <nav className="flex-col bg-gray-200 p-4 w-50">
                    <ul>
                        <li className="mt-2">
                            <Link href="/bashboard">ダッシュボード</Link>
                        </li>
                        <li className="mt-2">
                            <Link href="/settings">設定</Link>
                        </li>
                    </ul>
                </nav>
                <main className="flex-1 p-3">
                    {children}
                </main>
            </div>
        </>
    );
}