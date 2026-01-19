import NavbarServer from "@/components/navbar/navbar-server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProdcutsGrid from "./_components/products-grid";
import { Suspense } from "react";

type Props = {
  params: Promise<{ categoryName: string }>;
};

export default async function ProductCategoryPage({ params }: Props) {
  return (
    <>
      <NavbarServer />
      <div className="container mx-auto pt-32">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Suspense fallback={<p className="">Loading...</p>}>
          <ProdcutsGrid params={params} />
        </Suspense>
      </div>
    </>
  );
}
