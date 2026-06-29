"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings } from "lucide-react";

const navItems = [
    { href: "/bashboard", label: "ダッシュボード", icon: LayoutDashboard },
    { href: "/settings", label: "設定", icon: Settings },
];

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gray-800 text-white p-4">
                <h1>My App</h1>
            </header>

            <div className="flex flex-1">
                <nav className="flex flex-col w-64 bg-white border-r p-4">
                    <ul className="flex flex-col gap-1 mt-4">
                        {navItems.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                                            isActive
                                                ? "bg-purple-50 text-purple-600"
                                                : "text-gray-500 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Icon size={20} />
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
