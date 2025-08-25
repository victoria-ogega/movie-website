export async function GET() {
  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;
  if (!baseUrl || !apiKey) {
    return new Response('BASE_URL or API_KEY is not defined', { status: 500 });
  }
  try {
    const response = await fetch(`${baseUrl}/now_playing?api_key=${apiKey}`);
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(`Fetch error: ${error}`, { status: 500 });
  }
  
}
