import "server-only"
import { NextRequest } from "next/server"

// バックエンド側でDBスキーマを振り分けるために使っているサブドメイン名の一覧
// (バックエンドのapp.tenant.schemasと揃える)


// ブラウザを介さず、サーバー同士でバックエンドAPIを呼ぶための共通処理
export async function callBackend(request: NextRequest, path: string, body: object) {
    let url = ""
  // アクセスされたサブドメインから、バックエンドに渡すスキーマコードを決める
  const firstSegment = request.nextUrl.hostname.split(".")[0]


  if (firstSegment === "sun") {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.SCHEMA_SUN}${path}`
  } else if (firstSegment === "ran") {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.SCHEMA_RAN}${path}`
  } else {
    url = `${process.env.LOCALHOST}/${process.env.SCHEMA_SUN}${path}`
  }

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}