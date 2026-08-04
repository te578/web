"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react"
import { apiPost } from "@/lib/api"
import { Loader2 } from "lucide-react"

type ResetRequest = {
    email: string;
};

// 指定したミリ秒だけ待つ（実際のAPI呼び出しの代わりに使うテスト用）
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function ResetPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 通信中かどうか

    async function handleSubmit(formData: FormData) {
        const email = formData.get("email") as string;
        setError("");

        if (!email) {
            setError("メールアドレスを入力してください");
            return;
        }

        setIsLoading(true); // 通信開始、ぐるぐる表示ON
        try {
            await sleep(1000); // 1秒待つ（実際のAPI呼び出しの代わり）
        } finally {
            setIsLoading(false); // 成功・失敗どちらでも、ここでぐるぐる表示OFF
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form action={handleSubmit} noValidate className="flex flex-col bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-15">パスワードリセット</h1>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="email">メールアドレス</Label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-15">
                    {isLoading && <Loader2 className="animate-spin" size={18} />}
                    {isLoading ? "送信中..." : "パスワードリセット"}
                </button>
                <div className="w-full mt-2 text-right">
                    <a href="/login" className="text-blue-500 hover:underline">ログインページへ</a>
                </div>
            </form>
        </div>
    );
}
