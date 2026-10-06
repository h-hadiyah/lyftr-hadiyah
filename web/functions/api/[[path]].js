// Cloudflare Pages Function: proxy /api/* to the Render backend so the app stays same-origin.
const BACKEND = 'https://lyftr-hadiyah-api.onrender.com'
export const onRequest = ({ request }) => {
  const url = new URL(request.url)
  return fetch(new Request(BACKEND + url.pathname + url.search, request))
}
