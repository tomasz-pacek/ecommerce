import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-background container mx-auto flex flex-col pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-foreground font-serif text-5xl leading-tight font-medium tracking-tight text-balance md:text-6xl lg:text-7xl">
          Exceptional Style
          <br />
          <span className="italic">at Your Fingertips</span>
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty md:text-lg">
          Discover a carefully curated collection of products that combine
          quality, functionality, and timeless design.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group h-12 px-8 text-sm font-medium"
            asChild
          >
            {/* TODO: Change route to products when it's done */}
            <Link href="/">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 bg-transparent px-8 text-sm font-medium"
            asChild
          >
            <Link href={"/login"}>Join us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
