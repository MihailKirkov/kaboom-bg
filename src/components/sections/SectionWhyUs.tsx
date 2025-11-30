"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "@/components/layout/section-wrapper";
import { WHY_US_ITEMS } from "@/data/why-us-items";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SectionWhyUs() {
  const t = useTranslations("SectionWhyUs");
  const [openId, setOpenId] = useState("competence");
  const heading2Lines = t('heading2').split('\n');

  return (
    <SectionWrapper
      aria-label={t("ariaLabel")}
      className="bg-black text-white"
      // background={
      //   <img
      //     src="/images/section-whyus.svg"
      //     alt=""
      //     className="absolute inset-0 object-cover w-full h-full opacity-30"
      //   />
      // }
    >
      <div className="text-center mb-12 mt-4">
        <motion.h3
          className="text-xs text-[#4c4c4c] font-display font-bold tracking-[0.45rem] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("heading1")}
        </motion.h3>
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold text-red-600 font-display mt-2 lg:mt-4">
          {heading2Lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < heading2Lines.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>

      <div className="space-y-3 w-full max-w-lg mx-auto">
        {WHY_US_ITEMS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                backgroundColor: isOpen ? "#000000" : "#222",
                borderColor: isOpen ? "#f00" : "#222",
              }}
              className="rounded-md overflow-hidden px-2 py-2 transition-all relative border"
            >
              <button
                className="w-full h-full flex justify-center items-center text-center text-white text-sm tracking-wider font-display font-thin"
                onClick={() =>
                  setOpenId((prev) => (prev === item.id ? "" : item.id))
                }
              >
                {t(`items.${item.id}.title`)}
                <div
                  className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isOpen ? "bg-white" : "bg-black"
                  }`}
                >
                  <Image
                    src={isOpen ? "/icons/minus.svg" : "/icons/plus.svg"}
                    alt={isOpen ? "Close Icon" : "Open Icon"}
                    width={12}
                    height={12}
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  >
                    
                    <div className="separator mx-auto w-[80%] h-[2px] bg-white/10 mt-4" />
                    <div className="pt-4 pb-2 px-2 text-white text-[10px] sm:text-[11px] md:text-[12px] leading-relaxed font-verdana text-balance">
                      {t(`items.${item.id}.content`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
