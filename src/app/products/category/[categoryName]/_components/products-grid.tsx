import { cacheLife } from "next/cache";
import ProductBlock from "./product-block";
import { getProductsByCategory } from "@/actions/getProductsByCategory";
import CategoryHeader from "./category-header";

type Props = {
  params: Promise<{ categoryName: string }>;
};

export default async function ProdcutsGrid({ params }: Props) {
  "use cache";
  cacheLife("hours");

  const { categoryName } = await params;

  const products = await getProductsByCategory(categoryName);

  const prettyCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <CategoryHeader
        categoryName={prettyCategoryName}
        productsCount={products.length}
      />
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductBlock key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
