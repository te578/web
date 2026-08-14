"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { apiPost } from "@/lib/apiclient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type LoginRequest = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    const body: LoginRequest = { email, password }

    try {
      setIsLoading(true)
      const response = await apiPost("/api/auth/login", body)
      const data = await response.json();
      if (response.ok) {
        // ログイン成功時の処理
        sessionStorage.setItem("AuthToken", data.token);
        router.push("/dashboard"); // ログイン後にリダイレクトするページに変更してください

      } else if (response.status === 401) {
        setError("メールアドレスまたはパスワードが正しくありません")

      } else {
        setError("ログインに失敗しました")
      }
    } catch {
      setError("ログインに失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loader2 className="animate-spin text-white" size={60} />
        </div>
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-600">My App</h2>
        </div>
        <h1 className="text-lg font-bold text-center mb-6">ログイン</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" className="bg-gray-100 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" name="password" placeholder="••••••••" className="bg-gray-100 h-10" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white h-10">
            ログイン
          </Button>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/reset" className="text-gray-500 hover:underline">
              パスワードを忘れた場合
            </Link>
            <Link href="/signup" className="text-gray-500 hover:underline">
              新規登録
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
