"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import LangSwitcher from "./language-switcher";
import { SERVICES } from "@/data/services";
import { Locale } from "@/i18n";
import { useTranslations } from "next-intl";

export default function Header({ currentLocale }: { currentLocale: Locale }) {
  const t = useTranslations("SectionServices");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#kaboom-menu, #kaboom-menu-trigger")) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/70 backdrop-blur ${
        !scrolled && "py-2"
      }`}
    >
      <div className="relative mx-auto w-full md:w-[min(900px,75dvw)] lg:w-[min(900px,40dvw)] px-4 md:px-6 h-14 flex items-center justify-between">
        {/* LEFT: Menu button */}
        <div className="relative" id="kaboom-menu">
          <Button
            id="kaboom-menu-trigger"
            variant="ghost"
            className="h-10 w-10 p-0 text-white hover:bg-white/10"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Image
              src={menuOpen ? "/icons/arrow-down.svg" : "/icons/hamburger.svg"}
              alt="menu toggle"
              width={28}
              height={28}
            />
          </Button>

          {/* MENU PANEL */}
          <AnimatePresence>
            {menuOpen && (
                  <motion.div
      layout
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
        layout: {
          type: "spring",
          stiffness: 320,
          damping: 32,
        },
      }}
      className={`
        fixed
        left-0 right-0 top-[56px]
        md:absolute md:left-0 md:right-auto md:top-full
        w-screen max-w-none
        md:w-[min(900px,75dvw)]
        lg:w-[min(900px,40dvw)]
        ${scrolled ? "mt-0 md:mt-2" : "mt-4 md:mt-4"}
        rounded-b-xl bg-white text-black shadow-xl border border-zinc-200 pb-12
        z-40 
      `}
    >
                <div className="absolute inset-0 z-[-1] opacity-25 flex items-center justify-center overflow-hidden">
                  <div
                    className="relative max-w-none 
                    w-[100%] h-[100%] top-[25%] -right-[0%]
                    md:w-[100%] md:h-[100%] md:top-[25%] md:-right-[0%]
                    lg:w-[150%] lg:h-[150%] lg:top-[25%] lg:-right-[0%]"
                  >
                    <Image
                      src="/images/header-bg.svg"
                      alt="Background sketch"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="relative py-6 px-4 md:px-8 overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-y-2">
                    {SERVICES.map((service, id) => (
                      <div
                        key={service.id}
                        className="group flex flex-col items-center justify-end"
                      >
                        <button
                          onClick={() => {
                            setMenuOpen(false);

                            window.dispatchEvent(
                              new CustomEvent("jump-to-service", {
                                detail: service.id,
                              })
                            );
                          }}
                          className="group flex items-center justify-between px-4 py-3 rounded-md
                                      transition-all hover:bg-zinc-200/80 w-full text-left"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={service.iconRedSrc}
                              alt=""
                              width={24}
                              height={24}
                              className="transition-all"
                            />
                            <span className="text-[16px] md:text-[13px] lg:text-[13px] font-bold transition-colors leading-[1.05]">
                              {t(
                                `services.${SERVICES[id].id}.title`
                              )
                                .split("\n")
                                .map((line, i) => (
                                  <span key={i}>
                                    {line}
                                    <br />
                                  </span>
                                ))}
                            </span>
                          </div>
                        </button>
                        <div className="w-full h-1 border-b border-zinc-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Logo */}
        <div
          className="
            pointer-events-none
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            md:static md:translate-x-0 md:translate-y-0 md:pointer-events-auto
            flex items-center
          "
        >
          <Image
            src="/logo-kaboom-text.svg"
            alt="Kaboom"
            width={90}
            height={32}
            priority
            className="select-none"
          />
        </div>

        {/* RIGHT: Language switcher */}
        <LangSwitcher current={currentLocale} />
      </div>
    </header>
  );
}
