"use client"

import { useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function LoginPage() {
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })

    if (!response.ok) {
      alert("ログインに失敗しました")
      return
    }

    setSuccess(true)
  }

  if (success) {
    return <p>ログイン成功</p>
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form action={handleSubmit} noValidate className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-96 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <input type="email" name="email" placeholder="メールアドレス" />
        <input type="password" name="password" placeholder="パスワード" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ログイン
        </button>
      </form>
    </div>
  )
}
