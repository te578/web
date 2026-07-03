"use client"

import { useState } from "react"
import { apiPost } from "@/lib/api"
import { setURL } from "@/lib/api"

type LoginRequest = {
  email: string
  password: string
}

export default function LoginPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    setURL();

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    const body: LoginRequest = { email, password }

    try {
      await apiPost("/auth/login", body)
      setSuccess(true)
    } catch {
      setError("ログインに失敗しました")
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>ログイン成功</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form action={handleSubmit} noValidate className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-96 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <div className="flex flex-col gap-1">
          <p>メールアドレス</p>
          <input type="email" name="email" className="mb-2 border rounded" />
        </div>
        <div className="flex flex-col gap-1">
          <p>パスワード</p>
          <input type="password" name="password" className="border rounded"/>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
          ログイン
        </button>
        <div className="flex justify-between">
        <a href="/reset" className="text-blue-500 underline">
          <p>パスワードを忘れた場合</p>
        </a>
        <a href="/signup" className=" text-blue-500 underline">
          <p>新規登録</p>
        </a>
        </div>
      </form>
    </div>
  )

  
}
