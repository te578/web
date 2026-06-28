const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function apiPost(url: string, body: object) {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  
  return response;
}

