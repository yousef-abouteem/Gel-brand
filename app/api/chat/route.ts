// Server-side chat endpoint. The Gemini key lives only in the server environment
// (Vercel → Settings → Environment Variables) and never reaches the browser.
import { brand } from "@/lib/brand";
import { CURRENCY, products } from "@/lib/products";

const MODEL = "gemini-3.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

// Built from the same catalogue the shop uses, so prices in chat always match the site.
const catalogue = products
  .map(
    (p) =>
      `- ${p.name.en} / ${p.name.ar}: ${p.price} ${CURRENCY}. Sizes: ${p.sizes.join(", ")}. ${p.description.en} Page: ${brand.siteUrl}/shop/${p.slug}`
  )
  .join("\n");

const SYSTEM_PROMPT = `
You are the GEL Brand assistant. GEL is a Qatari brand of premium, minimalist everyday clothing:
heavy cotton and fine linen, boxy fits, quiet tone-on-tone details. The owl is the brand mark.

Catalogue (the only products that exist; never invent others or other prices):
${catalogue}

How ordering works: the customer picks a piece and size on the website, adds it to the bag,
and sends the order on WhatsApp. The team confirms size and delivery there. International shipping is available.

Contact:
- WhatsApp (preferred): ${brand.whatsappDisplay}
- Instagram: ${brand.instagram.handle}
- TikTok: ${brand.tiktok.handle}
- Email: ${brand.email}

Rules:
- Reply in the same language the customer writes in (Arabic or English).
- Keep replies short: 2–4 sentences, warm and refined, no emojis.
- For sizing, suggest the customer's usual size for a relaxed boxy look, or one size down for a closer fit, and offer WhatsApp for exact measurements.
- If you don't know something (stock, delivery times, discounts), say so and point to WhatsApp.
- Only help with GEL, its products, styling and orders. Politely decline anything else.
`.trim();

type IncomingMessage = { role: "user" | "model"; text: string };

function isValidMessage(m: unknown): m is IncomingMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, text } = m as Record<string, unknown>;
  return (
    (role === "user" || role === "model") &&
    typeof text === "string" &&
    text.trim().length > 0 &&
    text.length <= (role === "user" ? MAX_MESSAGE_LENGTH : 2000)
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawHistory = (body as { history?: unknown })?.history;
  const recent: unknown[] = Array.isArray(rawHistory) ? rawHistory.slice(-MAX_HISTORY) : [];
  const history = recent.filter(isValidMessage);
  if (history.length === 0 || history.length !== recent.length || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }

  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
        generationConfig: { temperature: 0.6, maxOutputTokens: 300 },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Gemini error:", data?.error?.message);
      return Response.json({ error: "AI service error" }, { status: 502 });
    }

    const reply: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
    if (!reply.trim()) {
      return Response.json({ error: "Empty reply" }, { status: 502 });
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
