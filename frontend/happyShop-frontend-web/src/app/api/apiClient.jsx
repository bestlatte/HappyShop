const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function createUrl(path, query) {
  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${cleanPath}`;

  if (!query) return url;

  //URLSearchParams() 會把key/value 存起來，並在輸出成字串時，自動用 URL 的 query string 規格把它格式化
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}

export async function apiRequest(path, options = {}) {
  //解構賦值
  const { method = "GET", query, body, headers, signal, token } = options;

  const normalizeMethod = String(method).toUpperCase();

  const requestHeaders = {
    Accept: "application/json",
    ...(headers ?? {}),
  };

  const fetchOptions = {
    method: normalizeMethod,
    headers: requestHeaders,
    signal,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    const isFormData = body instanceof FormData;
    if (!isFormData) {
      //default to JSON && set content-type
      requestHeaders["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(body);
    } else {
      fetchOptions.body = body;
    }
  }

  const response = await fetch(createUrl(path, query), fetchOptions);

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      `API ${normalizeMethod} ${path} failed: ${response.status}`,
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}
