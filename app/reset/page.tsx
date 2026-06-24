"use client";

export default function ResetPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form className="flex flex-col items-center bg-white p-8 rounded shadow-md w-96">
                <input type="email" name="email" placeholder="メールアドレス" className="mb-2 w-full px-3 py-2 border rounded" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    パスワードリセット
                </button>
                <div className="w-full mt-2 text-right">
                    <a href="/login" className="text-blue-500 hover:underline">ログインページへ</a>
                </div>
            </form>
        </div>
    );
}