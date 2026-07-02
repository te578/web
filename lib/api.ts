let API_URL = "";

export function setURL() {
  const hostname = window.location.hostname;

  if (hostname === "localhost") {
    // ローカル開発環境
    API_URL = "http://localhost:3000";
  } else if (hostname === "jpro.localhost") {
    API_URL = "http://localhost:3000";
  } else if (hostname === "jpro.vercel.app") {
    if (!process.env.NEXT_PUBLIC_VERCEL_API_URL) throw new Error("NEXT_PUBLIC_VERCEL_API_URL が設定されていません");
    API_URL = process.env.NEXT_PUBLIC_VERCEL_API_URL;
  } else if (hostname === "jpro.com") {
    if (!process.env.NEXT_PUBLIC_PROD_API_URL) throw new Error("NEXT_PUBLIC_PROD_API_URL が設定されていません");
    API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;
  } else {
    throw new Error(`未対応のホスト: ${hostname}`);
  }
}

export async function apiPost(url: string, body: object) {
  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response;
}
