# GEL

Bilingual (Arabic / English) storefront for GEL, a concept brand of minimalist everyday clothing from Qatar. Customers browse the collection, pick a size, build a bag, and send the order on WhatsApp. An AI assistant answers questions about products, sizing and ordering.

**Live:** [gel-brand.vercel.app](https://gel-brand.vercel.app)

Built with Next.js (App Router), React and TypeScript. Deployed on Vercel.

## Features

- Arabic-first, right-to-left layout with a one-click switch to English (direction, copy and number formatting all follow the language)
- Shop with category filters and a page per product with size selection
- Bag that persists across visits and stays in sync between browser tabs
- WhatsApp checkout: the order, sizes and total are written into the message automatically
- AI chat assistant powered by Gemini, answering from the same catalogue the shop uses
- Contact form that delivers to the brand inbox without a page reload

## Technical notes

**One catalogue, everywhere.** Products live in [`lib/products.ts`](lib/products.ts). The shop pages, the bag, the WhatsApp order message and the assistant's system prompt are all generated from it, so a price changes in one place and can never disagree between the page and the chat.

**The API key never reaches the browser.** The first version called Gemini from client-side JavaScript with the key in the source. The chat now goes through a server route ([`app/api/chat/route.ts`](app/api/chat/route.ts)) that reads the key from an environment variable, validates the conversation (roles, length, history size) and limits reply length so the endpoint can't be used as a free general-purpose chatbot.

**Safe rendering of AI replies.** Replies are HTML-escaped before the small amount of formatting (bold, line breaks) is applied, and phone numbers are wrapped in `<bdi dir="ltr">` so `+974 3112 1124` isn't reordered inside Arabic text.

**The bag stores references, not copies.** Only slug, size and quantity are saved in `localStorage`; names, prices and images are looked up from the catalogue on every render, so an old bag never shows a stale price or a broken image.

**Accessibility.** Keyboard focus is visible throughout, the bag is a modal dialog that traps attention and closes with Escape, form errors are announced, and animations respect `prefers-reduced-motion`.

## Running locally

```bash
npm install
cp .env.example .env.local   # add your GEMINI_API_KEY to use the assistant
npm run dev                  # http://localhost:3000
```

## Project structure

```
app/                 Routes (home, shop, product, about, contact) and the chat API
components/          UI: header, bag drawer, chat widget, page content
lib/products.ts      The catalogue
lib/i18n.ts          Arabic and English copy
lib/cart.tsx         Bag state
lib/language.tsx     Language and text direction
public/images/       Product photos and the owl mark
```
