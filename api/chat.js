// خادم صغير يعمل على Vercel: يستقبل رسالة الزائر، ويرسلها إلى Gemini بالمفتاح السري
// المفتاح موجود في إعدادات Vercel فقط، ولا يصل إلى المتصفح أبدًا

const MODEL = "gemini-3.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// One product list for the whole site: the same file the shop pages use
const { GEL_PRODUCTS } = require("../products.js");

const CATEGORY_NAMES = {
  tees: "T-shirts", hoodies: "Hoodies", jackets: "Jackets",
  shorts: "Shorts", accessories: "Accessories",
};

const productLines = GEL_PRODUCTS.map((p) => [
  `- ${p.name} | ${p.price} QAR | ${CATEGORY_NAMES[p.category] || p.category}`,
  `  Sizes: ${p.sizes.join(", ")}`,
  `  Material: ${p.material.en} | Fit: ${p.fit.en}`,
  `  About: ${p.desc.en}`,
  `  Page: product.html?id=${p.id}`,
].join("\n")).join("\n");

const GEL_INFO = `
You are the GEL Brand Assistant on the GEL website. GEL is a Qatar-based clothing brand:
heavyweight cotton and linen essentials, boxy and relaxed fits, a woven GEL label in every piece.
Motto: WEAR WONDER.

Products (this is the complete, current list; never mention products, colours or prices not listed here):
${productLines}

How ordering works:
- Customers add items to the bag on the website, choosing a size, then tap the "إتمام الطلب" (Checkout)
  button in the bag. There is no online payment on the site. That opens WhatsApp
  with the order already written. Orders are confirmed on WhatsApp.
- Shipping: from Qatar, worldwide. You do not know delivery times or shipping costs; say the team will
  confirm them on WhatsApp.

Contact:
- WhatsApp (best for orders): +974 3112 1124
- Instagram: @gelvogue.qa
- TikTok: @gelvogue
- Email: gelvoguee@gmail.com

Rules:
- Reply in the same language as the customer (Arabic or English). In Arabic, use a warm, simple Gulf-friendly tone.
- Keep replies short: 2-4 sentences.
- When you mention a product, link its page as a Markdown link with the product name, for example
  [GEL Signature Tee](product.html?id=tee). Use only the page links listed above. To link the shop, use [the shop](shop.html).
- For size help: all clothing comes in S-XXL; the fits run relaxed, so suggest the usual size for a roomy
  look or one size down for a closer fit. The cap is one size and adjustable.
- If you don't know something (stock, delivery time, discounts), say so and point to WhatsApp.
  A size being listed means it is offered, not that it is in stock right now; never promise availability.
- Do not end replies with the motto or a slogan. No sign-offs.
- Only help with GEL, its products, sizing, orders and styling. Politely decline anything else.
`;

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is not configured" });
    return;
  }

  // نتحقق من شكل البيانات القادمة من المتصفح، ونحدد طولها حتى لا يُستغل المفتاح
  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  const contents = history
    .slice(-MAX_HISTORY)
    .filter(
      (m) =>
        (m.role === "user" || m.role === "model") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0 &&
        m.text.length <= MAX_MESSAGE_LENGTH
    )
    .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  if (contents.length === 0 || contents[contents.length - 1].role !== "user") {
    res.status(400).json({ error: "Invalid message" });
    return;
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: GEL_INFO }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini error:", data.error?.message);
      res.status(502).json({ error: "AI service error" });
      return;
    }

    const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
    if (!reply) {
      res.status(502).json({ error: "Empty reply" });
      return;
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat function error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
