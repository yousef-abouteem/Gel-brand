// The single source of truth for the catalogue.
// Pages, the cart, the WhatsApp order message and the chat assistant all read from here,
// so a price or name only ever changes in one place.

export type Lang = "ar" | "en";
export type Localized = Record<Lang, string>;
export type Category = "tops" | "outerwear" | "bottoms" | "accessories";

export type Product = {
  slug: string;
  name: Localized;
  price: number; // QAR
  image: string;
  imageAlt: Localized;
  category: Category;
  sizes: string[];
  description: Localized;
  details: Localized[];
  featured?: boolean;
};

export const CURRENCY = "QAR";

export const products: Product[] = [
  {
    slug: "signature-tee",
    name: { ar: "تيشيرت GEL سيغنتشر", en: "GEL Signature Tee" },
    price: 120,
    image: "/images/tee.jpg",
    imageAlt: {
      ar: "تيشيرت أبيض معلّق قرب نافذة وأغصان مزهرة",
      en: "White tee hanging by a window with blossom branches",
    },
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    description: {
      ar: "قطعتنا الأساسية بالأبيض. قطن ثقيل بقصّة واسعة تحافظ على شكلها بعد كل غسلة.",
      en: "Our essential white piece. Heavyweight cotton in a boxy cut that keeps its shape wash after wash.",
    },
    details: [
      { ar: "قطن ثقيل", en: "Heavyweight cotton" },
      { ar: "قصّة واسعة (Boxy fit)", en: "Boxy fit" },
      { ar: "تطريز GEL صغير على الصدر", en: "Small GEL embroidery on the chest" },
    ],
    featured: true,
  },
  {
    slug: "oversized-hoodie",
    name: { ar: "هودي GEL أوفرسايز", en: "GEL Oversized Hoodie" },
    price: 250,
    image: "/images/hoodie.jpg",
    imageAlt: {
      ar: "قطعة بيضاء معلّقة على جدار في ضوء الشمس",
      en: "White piece hanging on a sunlit wall",
    },
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    description: {
      ar: "الأكثر طلبًا. هودي واسع بخامة ثقيلة وناعمة، للأمسيات الباردة والسفر.",
      en: "Our best seller. A roomy hoodie in a soft, heavy fabric for cool evenings and travel.",
    },
    details: [
      { ar: "قطن ثقيل ناعم من الداخل", en: "Heavy cotton, brushed inside" },
      { ar: "قصّة أوفرسايز", en: "Oversized fit" },
      { ar: "أكمام وأطراف مضلّعة", en: "Ribbed cuffs and hem" },
    ],
    featured: true,
  },
  {
    slug: "urban-jacket",
    name: { ar: "جاكيت GEL أوربن", en: "GEL Urban Jacket" },
    price: 450,
    image: "/images/jacket.jpg",
    imageAlt: {
      ar: "قطع بيضاء معلّقة على حامل خشبي بجانب نبتة",
      en: "White pieces on a wooden rack beside a plant",
    },
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    description: {
      ar: "قطعة المجموعة الجديدة. خطوط نظيفة وقصّة مستقيمة، تُلبس فوق أي شيء.",
      en: "The centrepiece of the new collection. Clean lines and a straight cut that layers over anything.",
    },
    details: [
      { ar: "كتان فاخر", en: "Fine linen" },
      { ar: "قصّة مستقيمة", en: "Straight cut" },
      { ar: "من المجموعة الجديدة", en: "From the new collection" },
    ],
    featured: true,
  },
  {
    slug: "minimalist-shorts",
    name: { ar: "شورت GEL مينيماليست", en: "GEL Minimalist Shorts" },
    price: 110,
    image: "/images/shorts.jpg",
    imageAlt: {
      ar: "تيشيرت أبيض بطباعة GEL زيتية على حامل خشبي",
      en: "White tee with an olive GEL print on a wooden rack",
    },
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    description: {
      ar: "بسيط ومريح لأيام الصيف. يكمّل التيشيرت والهودي بنفس الهدوء.",
      en: "Simple and easy for summer days. Pairs with the tee and hoodie in the same quiet style.",
    },
    details: [
      { ar: "قطن خفيف", en: "Light cotton" },
      { ar: "خصر مطاطي برباط", en: "Elastic drawstring waist" },
    ],
  },
  {
    slug: "classic-cap",
    name: { ar: "كاب GEL كلاسيك", en: "GEL Classic Cap" },
    price: 85,
    image: "/images/cap.jpg",
    imageAlt: {
      ar: "قطعتان بلون أزرق فاتح وكريمي أمام نافذة مقوّسة",
      en: "Light blue and cream pieces in front of an arched window",
    },
    category: "accessories",
    sizes: ["One size"],
    description: {
      ar: "اللمسة الأخيرة على أي إطلالة. شعار البومة مطرّز بخيط بنفس لون القماش.",
      en: "The finishing touch. The owl mark is embroidered tone on tone.",
    },
    details: [
      { ar: "مقاس واحد قابل للتعديل", en: "One adjustable size" },
      { ar: "تطريز البومة", en: "Embroidered owl" },
    ],
  },
];

export const categories: { id: Category | "all"; label: Localized }[] = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "tops", label: { ar: "تيشيرتات وهوديز", en: "Tees & hoodies" } },
  { id: "outerwear", label: { ar: "جاكيتات", en: "Outerwear" } },
  { id: "bottoms", label: { ar: "شورتات", en: "Bottoms" } },
  { id: "accessories", label: { ar: "إكسسوارات", en: "Accessories" } },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number, lang: Lang): string {
  return lang === "ar" ? `${amount} ر.ق` : `${amount} ${CURRENCY}`;
}
