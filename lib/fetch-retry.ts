export async function fetchRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries = 1,
) {
  let response = await fetch(input, init);
  for (let attempt = 0; attempt < retries && response.status === 503; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    response = await fetch(input, init);
  }
  return response;
}
