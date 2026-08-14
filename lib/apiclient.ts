export async function apiGet(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  return response;
}




export async function apiPost(url: string, body: object) {
  let response;

  if (!((url === "/api/auth/login") || (url === "/api/auth/reset") || (url === "/api/auth/register"))) {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "AuthToken": sessionStorage.getItem("AuthToken") ?? ""
       },
      body: JSON.stringify(body)
    });

  }else {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
       },
      body: JSON.stringify(body)
    });
  }

  return response;
}
