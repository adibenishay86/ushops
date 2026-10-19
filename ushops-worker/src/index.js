const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  }
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/submit") {
      if (request.method !== "POST") return json({ error: "Method Not Allowed" }, 405);
      if (!env.SUBMISSIONS) return json({ error: "Storage binding SUBMISSIONS is not configured" }, 500);

      try {
        const x = await request.json();
        const required = ["fullName", "packagesTracking", "paymentDate", "stuckGoodsValue", "shippingPaid", "contentsDescription"];
        if (required.some(k => String(x[k] ?? "").trim() === "")) return json({ error: "Missing required fields" }, 400);

        const goods = Number(x.stuckGoodsValue);
        const shipping = Number(x.shippingPaid);
        if (!Number.isFinite(goods) || !Number.isFinite(shipping) || goods < 0 || shipping < 0) return json({ error: "Invalid amounts" }, 400);

        const record = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          fullName: String(x.fullName).trim().slice(0, 200),
          packagesTracking: String(x.packagesTracking).trim().slice(0, 1500),
          paymentDate: String(x.paymentDate).trim().slice(0, 20),
          stuckGoodsValue: goods,
          shippingPaid: shipping,
          contentsDescription: String(x.contentsDescription).trim().slice(0, 1000)
        };

        await env.SUBMISSIONS.put(record.id, JSON.stringify(record));
        return json({ ok: true, id: record.id });
      } catch {
        return json({ error: "Invalid request" }, 400);
      }
    }

    if (url.pathname === "/api/health") return json({ ok: true });
    return env.ASSETS.fetch(request);
  }
};
