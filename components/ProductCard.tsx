"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { pick, lang } = useLanguage();

  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <span className="product-card__image">
        <Image
          src={product.image}
          alt={pick(product.imageAlt)}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
          priority={priority}
        />
      </span>
      <span className="product-card__info">
        <span className="product-card__name">{pick(product.name)}</span>
        <span className="price">{formatPrice(product.price, lang)}</span>
      </span>
    </Link>
  );
}
