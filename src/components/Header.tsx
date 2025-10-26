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
import { SERVICES } from "@/data/services";

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
        className="mx-auto w-[min(1200px,92vw)] px-4 md:px-6 h-14 flex items-center justify-between"
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

          {/** Menu Dropdown (below header) */}
          <SheetContent
            side="top"
            className="border-none bg-white text-black shadow-xl rounded-b-xl 
                        mt-[56px] p-0 w-full max-w-[min(1200px,92vw)] mx-auto pb-12"
          >
            <div className="relative py-6 px-4 md:px-8 overflow-hidden">
              {/* BG sketch */}
              <div className="absolute inset-0 -z-10 opacity-20">
                <Image
                  src="/images/header-bg.svg"
                  alt="Background sketch"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {SERVICES.map((service, i) => (
                  <button
                    key={service.id}
                    className="group flex items-center justify-between px-4 py-3 rounded-md transition-all 
                                border-b border-zinc-300 hover:bg-zinc-200/80"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={service.iconRedSrc}
                        alt=""
                        width={24}
                        height={24}
                        className="transition-all "
                      />
                      <span className="text-[13px] font-bold text-left group-hover:text-red-600 transition-colors">
                        {service.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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
