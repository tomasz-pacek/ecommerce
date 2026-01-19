import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Route } from "next";

interface Category {
  slug: string;
  name: string;
  url?: string;
}

const CATEGORIES_IMAGES: Record<string, string> = {
  "mens-watches":
    "https://images.unsplash.com/photo-1619225379807-e9002c44c462?q=80&w=2070&auto=format&fit=crop",
  fragrances:
    "https://images.unsplash.com/photo-1659415455925-8b8eef9f93d0?q=80&w=1170&auto=format&fit=crop",
  "mens-shoes":
    "https://images.unsplash.com/photo-1668069226492-508742b03147?q=80&w=1170&auto=format&fit=crop",
  "womens-watches":
    "https://images.unsplash.com/photo-1584208123923-cc027813cbcb?q=80&w=784&auto=format&fit=crop",
  "womens-bags":
    "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1170&auto=format&fit=crop",
  "womens-dresses":
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1170&auto=format&fit=crop",
};

const CATEGORIES: Category[] = [
  { slug: "mens-watches", name: "Men's Watches" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "mens-shoes", name: "Men's Shoes" },
  { slug: "womens-watches", name: "Women's Watches" },
  { slug: "womens-bags", name: "Women's Bags" },
  { slug: "womens-dresses", name: "Women's Dresses" },
];

const getCategoryImage = (slug: string, name: string): string => {
  return (
    CATEGORIES_IMAGES[slug] ||
    `/placeholder.svg?height=500&width=500&text=${encodeURIComponent(name)}`
  );
};

export default function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[250px] md:grid-cols-4">
        {CATEGORIES.map((category, index) => {
          const isLarge = index === 0 || index === 3;
          const imageUrl = getCategoryImage(category.slug, category.name);
          const categoryUrl = `/products/category/${category.slug}` as Route;

          return (
            <Link
              key={category.slug}
              href={categoryUrl}
              prefetch={true}
              className={`group bg-muted relative overflow-hidden rounded-2xl transition-shadow hover:shadow-xl ${
                isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={imageUrl}
                alt={`Category: ${category.name}`}
                fill
                sizes={
                  isLarge
                    ? "(max-width: 768px) 50vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 2}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <div className="flex items-end justify-between gap-2">
                  <h3
                    className={`font-bold text-white ${
                      isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <ArrowUpRight
                    className="shrink-0 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    size={isLarge ? 28 : 24}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
