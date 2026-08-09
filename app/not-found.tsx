import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="bg-gray-100">
        <div className="flex min-h-screen items-center justify-center">
            <Card className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
                <FileQuestion className="w-12 h-12 text-gray-400" />
                <h1 className="text-2xl font-bold">404</h1>
                <p className="text-gray-500">ページが見つかりませんでした</p>
                <Button asChild>
                    <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white">
                        トップに戻る
                    </Link>
                </Button>
            </Card>
        </div>
        </div>
    )
}