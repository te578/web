"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import { apiGet } from "@/lib/api"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// APIから返ってくるユーザー情報の型（仮）
type User = {
    name: string
    email: string
    password: string
}

export default function UserPage() {
    const [data, setUser] = useState<User | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // 選んだ画像ファイルをプレビュー用のURLに変換する
    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarUrl(URL.createObjectURL(file))
    }

    // 画面表示時（マウント時）に1回だけAPIを呼ぶ
    useEffect(() => {
        // TODO: バックエンド連携ができたら下のテストデータを消して、この呼び出しを使う
        // async function fetchUser() {
        //     try {
        //         const response = await apiGet("/user")
        //         const data = await response.json()
        //         setUser(data)
        //     } catch (err) {
        //         console.error("ユーザー情報の取得に失敗しました:", err)
        //     }
        // }
        // fetchUser()

        // 画面の見た目を確認するための仮データ（読み込み中の表示を確認するため10秒待ってからセットする）
        setTimeout(() => {
            setUser({ name: "テストユーザー", email: "test@example.com", password: "" })
        }, 10000)
    }, [])

    if (data === null) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">ユーザーページ</h1>
                <p>読み込み中...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-[80vh] p-8">
            <Link href="/dashboard" className="self-start mb-4 text-gray-500 hover:text-gray-800">
                <Home size={28} />
            </Link>
            <h1 className="text-4xl font-bold p-4 rounded-lg">ユーザーページ</h1>
            <div className="mt-6 border border-gray-200 rounded-lg p-6 w-full max-w-4xl bg-white flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                >
                    <Avatar className="size-20">
                        <AvatarImage src={avatarUrl ?? undefined} />
                        <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                />
                <p>クリックして画像を変更</p>
            </div>
            <div className="mt-6 border border-gray-200 rounded-lg p-6 w-full max-w-4xl bg-white">
                <p>ユーザー名: {data.name}</p>
            </div>
            <div className="mt-6 border border-gray-200 rounded-lg p-6 w-full max-w-4xl bg-white">
                <p>メールアドレス: {data.email}</p>
            </div>
                        <div className="mt-6 border border-gray-200 rounded-lg p-6 w-full max-w-4xl bg-white">
                <p>パスワード: </p>
            </div>
        </div>
    )
}
