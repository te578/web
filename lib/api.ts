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


export async function apiGet(url: string) {
  const response = await fetch(API_URL + url, {
    method: "GET",
    headers: { "AuthToken": sessionStorage.getItem("AuthToken") ?? "" }
  });

  return response;
}




export async function apiPost(url: string, body: object) {
  let response;

  if (!((url === "login") || (url === "reset") || (url === "register"))) {
    response = await fetch(API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "AuthToken": sessionStorage.getItem("AuthToken") ?? ""
       },
      body: JSON.stringify(body)
    });
  }else {
    response = await fetch(API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "AuthToken": sessionStorage.getItem("AuthToken") ?? ""
       },
      body: JSON.stringify(body)
    });
  }

  return response;
}
