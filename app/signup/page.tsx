import React from "react";




export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form noValidate className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-96 rounded-lg">
                <p>ユーザー名</p>
                <input type="text"  className="border-2 border-gray-300"/>
                <p>パスワード</p>
                <input type="password" className="border-2 border-gray-300"/>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    サインアップ
                </button>
            </form>
        </div>
    )
}