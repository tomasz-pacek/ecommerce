import { getProductById } from "@/actions/getProductById";
import { ArrowLeft } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import ProductImage from "./product-image";
import ProductInfo from "./product-info";
import ProductReviews from "./product-reviews";

type Props = {
  params: Promise<{ productId: number }>;
};

export default async function ProductContent({ params }: Props) {
  "use cache";
  cacheLife("hours");

  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <>
      <Link
        href={`/products/category/${product?.category}`}
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to{" "}
        {product?.category
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
      </Link>

      {/* prodcut section */}

      <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
        <ProductImage product={product!} />
        <ProductInfo product={product!} />
      </div>
      <ProductReviews product={product!} />
    </>
  );
}
