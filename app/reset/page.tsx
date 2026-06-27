"use client";

import { useState } from "react"
import { apiPost } from "@/lib/api"

    type ResetRequest = {
        email: string;
    };

export default function ResetPage() {
    const [error, setError] = useState("");


    async function handleSubmit(formData: FormData) {
        const email = formData.get("email") as string;
        setError("");

        if (!email) {
            setError("メールアドレスを入力してください");
            return;
        }
        // パスワードリセットの受付完了をポップアップで通知する
        alert(`${email} 宛にパスワードリセット用のメールを送信しました`);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            
            <form action={handleSubmit} noValidate className="flex flex-col items-center bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">パスワードリセット</h1>
                <input type="email" name="email" placeholder="メールアドレス" className="mb-2 w-full px-3 py-2 border rounded" />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md4">
                    パスワードリセット
                </button>
                <div className="w-full mt-2 text-right">
                    <a href="/login" className="text-blue-500 hover:underline">ログインページへ</a>
                </div>
            </form>
        </div>
    );
}