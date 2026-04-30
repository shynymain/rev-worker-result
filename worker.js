const headers = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return json({ ok: true });
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/api/health") {
      return json({ ok: true, service: "rev-worker-result", message: "result worker ok" });
    }

    if (url.pathname === "/api/results") {
      return json({
        ok: true,
        service: "rev-worker-result",
        results: [],
        message: "results API ok. results配列はフロントまたは後続実装で反映。"
      });
    }

    return json({ ok: false, error: "not_found", path: url.pathname }, 404);
  }
};
