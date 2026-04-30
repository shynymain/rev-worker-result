const headers = {
  "content-type": "application/json;charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

const races = Array.from({ length: 12 }, (_, i) => {
  const no = i + 1;
  const firstNo = String((i % 3) + 1);
  const secondNo = String(5 + (i % 8));
  const thirdNo = String(9 + (i % 6));
  const umaren = [firstNo, secondNo].sort((a, b) => Number(a) - Number(b)).join("-");
  const sanrenpuku = [firstNo, secondNo, thirdNo].sort((a, b) => Number(a) - Number(b)).join("-");
  return {
    race: { date: "2026/05/02", place: "東京", raceNo: String(no) },
    result: {
      firstNo,
      secondNo,
      thirdNo,
      umaren,
      sanrenpuku,
      umarenPay: String(800 + i * 410),
      sanrenpukuPay: String(2500 + i * 900)
    }
  };
});

export default {
  async fetch(req) {
    if (req.method === "OPTIONS") return new Response("{}", { headers });
    return new Response(JSON.stringify({ ok: true, races }), { headers });
  }
};
