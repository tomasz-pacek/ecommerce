"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductImage({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevImage = () => {
    if (!product) return;
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!product) return;
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-muted group relative aspect-square overflow-hidden rounded-3xl">
        <Image
          src={product.images[selectedImage] || product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <Button
              onClick={handlePrevImage}
              className="bg-background/80 hover:bg-background absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNextImage}
              className="bg-background/80 hover:bg-background absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Discount Badge */}
        {product.discountPercentage > 10 && (
          <span className="bg-primary text-secondary-foreground absolute top-4 left-4 rounded-full px-3 py-1.5 text-sm font-bold">
            -{Math.round(product.discountPercentage)}% OFF
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
