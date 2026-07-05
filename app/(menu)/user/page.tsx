"use client"

import { useEffect, useState } from "react"
import { apiGet } from "@/lib/api"

// APIから返ってくるユーザー情報の型（仮）
type User = {
    name: string
    email: string
}

export default function UserPage() {
    const [user, setUser] = useState<User | null>(null)

    // 画面表示時（マウント時）に1回だけAPIを呼ぶ
    useEffect(() => {
        async function fetchUser() {
            const response = await apiGet("/user/me")
            const data = await response.json()
            setUser(data)
        }

        fetchUser()
    }, [])

    if (!user) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">ユーザーページ</h1>
                <p>読み込み中...</p>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">ユーザーページ</h1>
            <p>名前: {user.name}</p>
            <p>メール: {user.email}</p>
        </div>
    )
}
