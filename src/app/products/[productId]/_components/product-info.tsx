"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const discountedPrice = product
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : 0;

  const handleShareButton = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Copied!");
  };

  return (
    <div className="space-y-6">
      {/* Brand & Category */}
      <div className="flex items-center gap-3">
        {product.brand && (
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {product.brand}
          </span>
        )}
        <span className="text-muted-foreground text-sm">
          {product.category
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-foreground font-serif text-3xl font-bold sm:text-4xl">
        {product.title}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.floor(product.rating)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted",
              )}
            />
          ))}
          <span className="text-foreground ml-2 text-sm font-medium">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <span className="text-muted-foreground text-sm">
          ({product.reviews?.length || 0} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-foreground text-4xl font-bold">
          ${discountedPrice}
        </span>
        {product.discountPercentage > 0 && (
          <span className="text-muted-foreground text-xl line-through">
            ${product.price}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            product.stock > 10
              ? "bg-green-500"
              : product.stock > 0
                ? "bg-amber-500"
                : "bg-red-500",
          )}
        />
        <span className="text-sm">
          {product.availabilityStatus ||
            (product.stock > 0 ? `${product.stock} in stock` : "Out of stock")}
        </span>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        {/* Quantity Selector */}
        <div className="border-border flex items-center rounded-full border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:bg-muted rounded-l-full p-3 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="hover:bg-muted rounded-r-full p-3 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 gap-2 rounded-full"
        >
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </Button>

        {/* Wishlist */}
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "rounded-full bg-transparent",
            isWishlisted && "border-primary text-primary",
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-primary")} />
        </Button>

        {/* Share */}
        <Button
          size="lg"
          variant="outline"
          className="rounded-full bg-transparent"
          onClick={handleShareButton}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Features */}
      <div className="border-border grid grid-cols-3 gap-4 border-t pt-6">
        <div className="bg-muted flex flex-col items-center rounded-xl p-4 text-center">
          <Truck className="text-primary mb-2 h-6 w-6" />
          <span className="text-muted-foreground text-xs">
            {product.shippingInformation || "Free Shipping"}
          </span>
        </div>
        <div className="bg-muted flex flex-col items-center rounded-xl p-4 text-center">
          <Shield className="text-primary mb-2 h-6 w-6" />
          <span className="text-muted-foreground text-xs">
            {product.warrantyInformation || "Warranty"}
          </span>
        </div>
        <div className="bg-muted flex flex-col items-center rounded-xl p-4 text-center">
          <RotateCcw className="text-primary mb-2 h-6 w-6" />
          <span className="text-muted-foreground text-xs">
            {product.returnPolicy || "30-day Returns"}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="border-border space-y-3 border-t pt-6">
        <h3 className="text-foreground font-semibold">Product Details</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">SKU</span>
          <span className="text-foreground">{product.sku || "N/A"}</span>
          <span className="text-muted-foreground">Weight</span>
          <span className="text-foreground">
            {product.weight ? `${product.weight}g` : "N/A"}
          </span>
          {product.dimensions && (
            <>
              <span className="text-muted-foreground">Dimensions</span>
              <span className="text-foreground">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth} cm
              </span>
            </>
          )}
          <span className="text-muted-foreground">Min. Order</span>
          <span className="text-foreground">
            {product.minimumOrderQuantity || 1} unit(s)
          </span>
        </div>
      </div>
    </div>
  );
}
