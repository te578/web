import { Loader2 } from "lucide-react"

// ページのデータ取得中に表示する、共通のローディング画面
export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-gray-500">
            <Loader2 className="animate-spin" size={32} />
            <p>読み込み中...</p>
        </div>
    )
}
