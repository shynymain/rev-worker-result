const corsHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), { status, headers: corsHeaders });
}

function sampleResults() {
  return [
    {
      id: "test1",
      raceId: "test1",
      date: "2026-05-01",
      place: "東京",
      raceNo: "11",
      raceName: "テストレース",
      firstNo: "1",
      first: "",
      secondNo: "2",
      second: "",
      thirdNo: "3",
      third: "",
      umaren: "1-2",
      umarenPay: 1200,
      sanrenpuku: "1-2-3",
      sanrenpukuPay: 3500
    }
  ];
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return json({ ok: true });

    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/api/health") {
      return json({ ok: true, service: "rev-worker-result", routes: ["/api/results", "/api/health"] });
    }

    if (url.pathname === "/api/results") {
      if (request.method === "GET") {
        return json({ ok: true, count: sampleResults().length, results: sampleResults() });
      }

      if (request.method === "POST") {
        let body = {};
        try {
          body = await request.json();
        } catch (e) {
          body = {};
        }

        const results = Array.isArray(body.results) ? body.results : sampleResults();
        return json({ ok: true, count: results.length, results });
      }

      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    return json({ ok: false, error: "Not found", path: url.pathname }, 404);
  }
};
