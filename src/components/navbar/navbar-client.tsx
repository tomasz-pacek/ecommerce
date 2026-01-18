"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Route } from "next";
import { Button } from "../ui/button";
import { Session } from "better-auth";
import { AuthSession } from "@/types/auth";

const navLinks: { name: string; href: Route }[] = [
  { name: "Sklep", href: "/" },
  { name: "Kolekcje", href: "/" },
  { name: "Nowości", href: "/" },
  { name: "O nas", href: "/" },
];

type Props = {
  session: AuthSession;
};

export function NavbarClient({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(linksRef.current?.children || [], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.from(mobileMenuRef.current.querySelectorAll("a"), {
        x: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span
                ref={logoRef}
                className="text-foreground font-serif text-2xl font-bold tracking-tight"
              >
                OneMarket
              </span>
            </Link>

            {/* Desktop Nav */}
            <div ref={linksRef} className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground group relative text-sm font-medium transition-colors"
                >
                  {link.name}
                  <span className="bg-foreground absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-muted cursor-pointer rounded-full p-2 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="hover:bg-muted relative rounded-full p-2 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="bg-primary text-secondary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                  3
                </span>
              </Link>
              {session?.user ? (
                <Link
                  href="/account/orders"
                  className="hover:bg-muted rounded-full p-2 transition-colors sm:flex"
                >
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Button
                  className="bg-background hover:bg-muted ml-2 cursor-pointer transition-all"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-muted rounded-full p-2 transition-colors md:hidden"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            "border-border overflow-hidden border-t transition-all duration-300",
            isSearchOpen ? "max-h-20" : "max-h-0 border-t-0",
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-muted focus:ring-secondary w-full rounded-full py-3 pr-4 pl-12 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="bg-background fixed inset-0 z-40 translate-x-full md:hidden"
      >
        <div className="flex h-full flex-col px-8 pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-border group border-b py-4"
            >
              <span className="text-foreground group-hover:text-secondary font-serif text-4xl font-bold transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
          <div className="mt-auto pb-8">
            <p className="text-muted-foreground text-sm">
              © 2026 One Market. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
