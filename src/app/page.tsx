import BentoGrid from "@/components/grid/bento-grid";
import HeroSection from "@/components/hero/hero-section";
import NavbarServer from "@/components/navbar/navbar-server";

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4">
      <NavbarServer />
      <HeroSection />
      <BentoGrid />
    </div>
  );
}
