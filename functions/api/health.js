// GET /api/health — cek cepat bahwa Functions berjalan (tidak ada 404).
export function onRequestGet() {
  return new Response(JSON.stringify({ ok: true, service: 'nafai', stage: 5 }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}
