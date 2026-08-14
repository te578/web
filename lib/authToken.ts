// アクセストークンをメモリ上だけで保持する
// (ページを再読み込みすると消える。リロード後の再取得は別途対応が必要)
let accessToken: string | null = null

export function setAccessToken(token: string) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export function clearAccessToken() {
  accessToken = null
}
