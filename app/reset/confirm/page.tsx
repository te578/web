import { Label } from "@/components/ui/label";

export default function ConfirmPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-15">新しいパスワードを設定</h1>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="password">新しいパスワード</Label>
                    <input type="password" id="password" name="password" placeholder="••••••••" className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-15">
                    パスワードを更新
                </button>
            </div>
        </div>
    );
}
