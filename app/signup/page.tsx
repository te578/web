"use client";

import React from "react";
import { useState } from "react";
import { apiPost }  from "@/lib/api";

type SignupReq = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignupPage() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(formData: FormData) {
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if(!username){
            setError("ユーザー名を入力してください");
            return;
        }
        if(!email){
            setError("メールアドレスを入力してください");
            return;
        }
        if(!password){
            setError("パスワードリセットを入力してください");
            return;
        }
        if(!confirmPassword){
            setError("確認用パスワードを入力してください");
            return;
        }
        if(password !== confirmPassword){
            setError("パスワードと確認用パスワードが一致しまsせん");
            return;
        }

        const body: SignupReq = { username, email, password, confirmPassword };

        try {
            const response = await apiPost("auth/signup", body);
            
            setSuccess(true);

        } catch (error) {
            setError("サインアップに失敗しました");
            return;
        }
    }

    if (success) {
        return (
            <div>
                <p>サインアップ成功</p>
            </div>
        )
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form action={handleSubmit} noValidate className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-96 rounded-lg">
                <h1 className="text-2xl font-bold">新規作成</h1>
                <div className="flex flex-col gap-1">
                    <p>ユーザー名</p>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border rounded"/>
                </div>
                <div className="flex flex-col gap-1">
                    <p>メールアドレス</p>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded"/>
                </div>
                <div className="flex flex-col gap-1">
                    <p>パスワード</p>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded"/>
                </div>
                <div className="flex flex-col gap-1">
                    <p>確認用パスワード</p>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border rounded"/>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-10">
                    サインアップ
                </button>
                <div >
                    <a href="/login" className="text-blue-500 underline">
                        ログイン画面へ
                    </a>
                </div>
            </form>
        </div>
    )
}