import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import { Check, Star } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductReviews({ product }: Props) {
  return (
    <>
      {product.reviews && product.reviews.length > 0 && (
        <div className="border-border mt-16 border-t pt-16">
          <h2 className="text-foreground mb-8 text-2xl font-bold sm:text-3xl">
            Customer Reviews ({product.reviews.length})
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card border-border rounded-2xl border p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <span className="text-primary font-medium">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {review.reviewerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.comment}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
                  <Check className="h-3 w-3" />
                  Verified Purchase
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
