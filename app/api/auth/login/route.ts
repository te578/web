import { NextRequest, NextResponse } from "next/server"
import { callBackend } from "@/lib/apibackend"

// バックエンド側でDBスキーマを振り分けるために使っているサブドメイン名の一覧
// (app.tenant.schemas と揃える)


export async function POST(request: NextRequest) {
  
  const body = await request.json()
  console.log("request body:", body)
  const BackendResponse = await callBackend(request, "/api/auth/login", body)
  console.log("BackendResponse:", BackendResponse)

  
  //console.log(request)
  // アクセスされたサブドメインから、バックエンドに渡すスキーマコードを決める
  // 例: "demo.jpro.com" -> "demo" / "localhost" -> スキーマ無し
  
  // const firstSegment = request.nextUrl.hostname.split(".")[0]
  // const schemaCd = KNOWN_SCHEMAS.includes(firstSegment) ? firstSegment : ""
  // const schemaPath = schemaCd ? `/${schemaCd}` : ""

  // // ブラウザを介さず、サーバー同士でバックエンドAPIを呼ぶ
  // const backendResponse = await fetch(
  //   `${process.env.BACKEND_API_URL}${schemaPath}/api/auth/login`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   }
  // )

  // if (!backendResponse.ok) {
  //   // バックエンドが返したエラーを、そのままブラウザにも伝える
  //   return NextResponse.json(
  //     { message: "ログインに失敗しました" },
  //     { status: backendResponse.status }
  //   )
  // }

  // const { accessToken, refreshToken } = await backendResponse.json()

  // // アクセストークンはJSONでそのまま返す(フロントはメモリに保持する)
  // const response = NextResponse.json({ accessToken })

  // // リフレッシュトークンはブラウザのJSから読めないCookieとして返す
  // response.cookies.set("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "lax",
  //   path: "/",
  // })

  return NextResponse.json(await BackendResponse.json(), { status: BackendResponse.status })
}
