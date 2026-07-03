"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, User } from "lucide-react";

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 現在開いているページのURLを取得する
    const pathname = usePathname();

    // アクティブなリンクのスタイル
    const activeClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-purple-50 text-purple-600";
    // 非アクティブなリンクのスタイル
    const inactiveClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100";

    return (
        <div className="flex h-screen flex-col">
            <header className="bg-gray-800 text-white p-4">
                <div className="flex items-center justify-between">
                    <h1>My App</h1>
                    <div className="flex items-center gap-4">
                    <a href="/user" className="text-white hover:text-gray-300">
                        <User size={30} />
                    </a>
                    <a href="/login" className="text-white hover:text-gray-300">
                        Logout
                    </a>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                <nav className="flex flex-col w-60 border-r p-4">
                    <ul className="flex flex-col gap-1 mt-4 bg-green-100">
                        <li>
                            <Link
                                href="/dashboard"
                                className={pathname === "/dashboard" ? activeClass : inactiveClass}
                            >
                                <LayoutDashboard size={20} />
                                ダッシュボード
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/user"
                                className={pathname === "/user" ? activeClass : inactiveClass}
                            >
                                <User size={20} />
                                タスク調整
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/telephone"
                                className={pathname === "/telephone" ? activeClass : inactiveClass}
                            >
                                <Settings size={20} />
                                通話
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/file-sharing"
                                className={pathname === "/file-sharing" ? activeClass : inactiveClass}
                            >
                                <Settings size={20} />
                                ファイル共有
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/team-up"
                                className={pathname === "/team-up" ? activeClass : inactiveClass}
                            >
                                <Settings size={20} />
                                チームアップ一覧
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/message"
                                className={pathname === "/message" ? activeClass : inactiveClass}
                            >
                                <Settings size={20} />
                                メッセージ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/settings"
                                className={pathname === "/settings" ? activeClass : inactiveClass}
                            >
                                <Settings size={20} />
                                設定
                            </Link>
                        </li>

                    </ul>
                    <p className="text-sm text-gray-500 mt-auto">
                        © 2026 My App. All rights reserved.
                    </p>
                </nav>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
