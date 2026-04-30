export default {
  async fetch(request) {
    return new Response(JSON.stringify({
      ok: true,
      results: []
    }), {
      headers: { "content-type": "application/json" }
    });
  }
};
