const API_ROOT = "http://localhost:3000";
const HEADERS = { "Content-Type": "application/json" };

async function request(url, options = {}) {
  const headers = options.headers
    ? { ...options.headers, ...HEADERS }
    : HEADERS;
  const response = await fetch(url, {
    ...options,
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Bad request");
  }
  return response;
}
export async function login(values) {
  const response = await request(`${API_ROOT}/login`, {
    method: "POST",
    body: JSON.stringify(values)
  });
  const data = await response.json();
  return data;
}