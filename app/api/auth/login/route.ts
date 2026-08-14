import { NextRequest, NextResponse } from "next/server"
import { callBackend } from "@/lib/apibackend"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const backendResponse = await callBackend(request, "/api/auth/login", body)

  if (!backendResponse.ok) {
    const errorBody = await backendResponse.json()
    return NextResponse.json(errorBody, { status: backendResponse.status })
  }

  const { accessToken, refreshToken } = await backendResponse.json()

  // accessTokenはレスポンスbodyで返す(フロント側はメモリ上に保持する想定)
  const response = NextResponse.json({ accessToken })

  // refreshTokenはブラウザのJSから読めないhttpOnly Cookieとして返す
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })

  return response
}
