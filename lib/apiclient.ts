import { getAccessToken } from "@/lib/authToken"

// GETリクエストを送信する関数
export async function apiGet(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  return response;
}

// POSTリクエストを送信する関数
export async function apiPost(url: string, body: object) {
  let response;

  if (!((url === "/api/auth/login") || (url === "/api/auth/reset") || (url === "/api/auth/reset/confirm") || (url === "/api/auth/register"))) {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "AuthToken": getAccessToken() ?? ""
       },
      body: JSON.stringify(body)
    });

  }else {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"
       },
      body: JSON.stringify(body)
    });
  }

  return response;
}

export async function apiDelete(url: string, body: object) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  
  return response;
}
