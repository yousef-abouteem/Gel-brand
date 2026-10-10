export const brand = {
  name: "GEL",
  whatsapp: "97431121124",
  whatsappDisplay: "+974 3112 1124",
  email: "gelvoguee@gmail.com",
  instagram: { handle: "@gelvogue.qa", url: "https://www.instagram.com/gelvogue.qa/" },
  tiktok: { handle: "@gelvogue", url: "https://www.tiktok.com/@gelvogue" },
  siteUrl: "https://gel-brand.vercel.app",
};

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${brand.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
