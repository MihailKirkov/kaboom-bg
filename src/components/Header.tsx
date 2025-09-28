"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Locale } from "@/i18n";
import LangSwitcher from "./language-switcher";

const Header = ({ currentLocale }: { currentLocale: Locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-1" : "py-3"
      }`}
    >
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto w-[min(1200px,92vw)] rounded-b-xl backdrop-blur-md
                    px-4 md:px-6 h-14 flex items-center justify-between`}
      >
        {/* LEFT: Menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 text-white hover:bg-white/10"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="max-h-[80vh] p-0 border-x-0 border-t-0 bg-zinc-900 text-white"
          >
            <SheetHeader className="px-6 pt-4 pb-2">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            {/* TODO: menu items go here */}
          </SheetContent>
        </Sheet>

        {/* CENTER: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo-kaboom-text.svg"
            alt="Kaboom"
            width={120}
            height={40}
            priority
            className="select-none"
          />
        </div>

        {/* RIGHT: Language switcher */}
        <LangSwitcher current={currentLocale} />
      </motion.div>
    </div>
  );
};

export default Header;
