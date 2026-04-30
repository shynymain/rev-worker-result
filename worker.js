const headers = {
  "content-type": "application/json;charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

const races = [8, 9, 10, 11, 12].map((no, i) => ({
  race: {
    date: "2026/05/02",
    place: "東京",
    raceNo: String(no)
  },
  result: {
    firstNo: String((i % 3) + 1),
    secondNo: String(5 + i),
    thirdNo: String(9 + i),
    umaren: [String((i % 3) + 1), String(5 + i)].sort((a, b) => Number(a) - Number(b)).join("-"),
    sanrenpuku: [String((i % 3) + 1), String(5 + i), String(9 + i)].sort((a, b) => Number(a) - Number(b)).join("-"),
    umarenPay: String(800 + i * 410),
    sanrenpukuPay: String(2500 + i * 900)
  }
}));

export default {
  async fetch(req) {
    if (req.method === "OPTIONS") return new Response("{}", { headers });
    return new Response(JSON.stringify({ ok: true, races }), { headers });
  }
};
