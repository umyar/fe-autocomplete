type AvailableMethods = "get";

interface IHttpClientOptions {
  method: AvailableMethods;
}

// TODO: move this to .env
const API_URL = "https://be-autocomplete.vercel.app";
// const API_URL = "http://localhost:9000";

export function httpClient<T>(
  url: string,
  options?: IHttpClientOptions,
): Promise<T> {
  return fetch(`${API_URL}${url}`, { method: options?.method || "get" }).then(
    (response) => {
      if (!response.ok) {
        // TODO: better error handling
        throw new Error(response.statusText);
      }

      return response.json() as Promise<T>;
    },
  );
}
