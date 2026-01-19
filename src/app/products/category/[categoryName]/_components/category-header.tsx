"use client";

type Props = {
  categoryName: string;
  productsCount: number;
};

export default function CategoryHeader({ categoryName, productsCount }: Props) {
  return (
    <div className="mb-12">
      <h1 className="text-foreground mb-4 font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
        {categoryName}
      </h1>
      <p className="text-muted-foreground text-lg">
        {productsCount} {productsCount === 1 ? "product" : "products"} found
      </p>
    </div>
  );
}
