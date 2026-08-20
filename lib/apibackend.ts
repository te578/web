import "server-only"
import { NextRequest } from "next/server"

// バックエンド側でDBスキーマを振り分けるために使っているサブドメイン名の一覧
// (バックエンドのapp.tenant.schemasと揃える)

export async function backendGet(request: NextRequest, path: string) {
  let url = ""
  // アクセスされたサブドメインから、バックエンドに渡すスキーマコードを決める
  const firstSegment = request.nextUrl.hostname.split(".")[0]

  url = getBackendUrl(firstSegment) + path
  
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
}

// ブラウザを介さず、サーバー同士でバックエンドAPIを呼ぶための共通処理
export async function backendPost(request: NextRequest, path: string, body: object) {
    let url = ""
  // アクセスされたサブドメインから、バックエンドに渡すスキーマコードを決める
  const firstSegment = request.nextUrl.hostname.split(".")[0]
  
  url = getBackendUrl(firstSegment) + path

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}


function getBackendUrl(subdomain: string): string {
  if (subdomain === "sun") {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.SCHEMA_SUN}`
  } else if (subdomain === "ran") {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.SCHEMA_RAN}`
  } else {
    return `${process.env.LOCALHOST}/${process.env.SCHEMA_SUN}`
  }
}