import { NextRequest, NextResponse } from "next/server"
import { callBackend } from "@/lib/apibackend"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"

// バックエンド側でDBスキーマを振り分けるために使っているサブドメイン名の一覧
// (app.tenant.schemas と揃える)


export async function POST(request: NextRequest) {
  
  const body = await request.json()
  console.log("request body:", body)
  const BackendResponse = await callBackend(request, "/api/auth/login", body)

  if (!BackendResponse.ok) {
    const errorBody = await BackendResponse.json()
    return NextResponse.json(errorBody, { status: BackendResponse.status })
  }
  
  
  return NextResponse.json(await BackendResponse.json(), { status: BackendResponse.status })
}
