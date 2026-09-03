"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { apiPost } from "@/lib/apiclient"
import { Loader2 } from "lucide-react"

type ResetConfirmRequest = {
    token: string;
    password: string;
};

export default function ConfirmPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 通信中かどうか
    const [success, setSuccess] = useState(false); // 更新成功かどうか

    async function handleSubmit(formData: FormData) {
        const password = formData.get("password") as string;
        setError("");

        if (!password) {
            setError("新しいパスワードを入力してください");
            return;
        }

        setIsLoading(true); // 通信開始、ぐるぐる表示ON
        try {
            const body: ResetConfirmRequest = { token, password };
            const response = await apiPost("/api/auth/reset/confirm", body);
            if (!response.ok) {
                setError("パスワードの更新に失敗しました")

            } else {
                setSuccess(true)
            }

        } finally {
            setIsLoading(false); // 成功・失敗どちらでも、ここでぐるぐる表示OFF
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-gray-500">
                <h1 className="text-2xl font-bold mb-4">新しいパスワードを設定</h1>
                <p>パスワードを更新しました。</p>
                <a href="/login" className="text-blue-500 hover:underline">ログインページへ</a>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmit(formData);
            }} noValidate className="flex flex-col bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-15">新しいパスワードを設定</h1>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="password">新しいパスワード</Label>
                    <input type="password" id="password" name="password" placeholder="••••••••" className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-15">
                    {isLoading && <Loader2 className="animate-spin" size={18} />}
                    {isLoading ? "更新中..." : "パスワードを更新"}
                </button>
            </form>
        </div>
    );
}
