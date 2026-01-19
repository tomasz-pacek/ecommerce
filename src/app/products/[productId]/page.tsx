import NavbarServer from "@/components/navbar/navbar-server";
import { Suspense } from "react";
import ProductContent from "./_components/product-content";

type Props = {
  params: Promise<{ productId: number }>;
};

export default async function ProductDetailPage({ params }: Props) {
  return (
    <>
      <NavbarServer />
      <main className="container mx-auto min-h-screen pt-32 pb-12">
        <Suspense fallback={<p>Loading...</p>}>
          <ProductContent params={params} />
        </Suspense>
      </main>
    </>
  );
}
