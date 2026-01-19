"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductBlock({ product }: Props) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    setHoveredId(product.id);
    router.prefetch(`/products/${product.id}`);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="bg-muted relative mb-4 aspect-square overflow-hidden rounded-2xl">
        <Image
          src={product.thumbnail || ""}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* DISCOUNT BADGE */}
        {product.discountPercentage > 10 && (
          <span className="bg-primary text-secondary-foreground absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        {/* Quick Actions */}
        <div
          className={cn(
            "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
            hoveredId === product.id
              ? "translate-x-0 opacity-100"
              : "translate-x-4 opacity-0",
          )}
        >
          <Button size="icon" className="rounded-full">
            <Heart className="size-4" />
          </Button>
          <Button size="icon" className="rounded-full">
            <ShoppingBag className="size-4" />
          </Button>
        </div>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 transition-all duration-300",
            hoveredId === product.id
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          )}
        >
          <Button
            className="bg-primary hover:bg-primary/90 text-secondary-foreground w-full rounded-full"
            size="sm"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        {product.brand && (
          <span className="text-muted-foreground text-xs tracking-wider uppercase">
            {product.brand}
          </span>
        )}
        <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-foreground text-lg font-bold">
            ${product.price}
          </span>
          <div className="flex items-center gap-1">
            <Star className="fill-primary text-primary h-3 w-3" />
            <span className="text-muted-foreground text-xs">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
