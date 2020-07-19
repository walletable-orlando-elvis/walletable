const API_ROOT = "http://localhost:3000";
const HEADERS = { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.user).token}`};

async function request(url, options = {}) {
  const headers = options.headers
    ? { ...options.headers, ...HEADERS }
    : HEADERS;
  const response = await fetch(url, {
    ...options,
    headers: headers
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


export async function signUp(values) {
  const response = await request(`${API_ROOT}/users`,{
    method: "POST",
    body: JSON.stringify(values)
  });
  const data = await response.json();
  return data;
}

export async function getTransactions() {
  const response = await request(`${API_ROOT}/transactions`,{
    method: "GET",
  });
  const data = await response.json();
  return data;
}