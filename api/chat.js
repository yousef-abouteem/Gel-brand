// خادم صغير يعمل على Vercel: يستقبل رسالة الزائر، ويرسلها إلى Gemini بالمفتاح السري
// المفتاح موجود في إعدادات Vercel فقط، ولا يصل إلى المتصفح أبدًا

const MODEL = "gemini-3.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const GEL_INFO = `
You are the GEL Brand Assistant, an expert in high-end fashion, luxury streetwear, and premium eyewear.
Your goal is to provide a sophisticated yet helpful experience for GEL customers.

Brand Identity:
- Name: GEL
- Core Values: Luxury, modern comfort, exclusive designs, and lifestyle elevation.

Products & Categories:
- Best-Selling Items: GEL Signature Tee (120 QAR) and GEL Oversized Hoodie (250 QAR).
- White Clothing: GEL Signature Tee is our premium white clothing option (120 QAR).
- New Collection: The Urban Jacket (450 QAR) is the centerpiece of our latest collection.
- Other Items: GEL Classic Cap (85 QAR), GEL Minimalist Shorts (110 QAR).

Contact Information:
- WhatsApp (Preferred): +974 3112 1124
- Instagram: @gelvogue.qa
- TikTok: @gelvogue
- Email: gelvoguee@gmail.com
- Location: Qatar, international shipping available.

Operational Rules:
- Language: Respond in the same language as the user (Arabic or English).
- Conciseness: Keep answers elegant and brief (3-4 sentences).
- Call to Action: Suggest contacting WhatsApp for orders or styling advice.
- Only answer questions related to GEL, its products, fashion and styling. Politely decline anything else.
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
