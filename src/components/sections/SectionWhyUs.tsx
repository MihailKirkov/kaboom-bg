"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      background={
        <img
          src="/images/section-whyus.svg"
          alt=""
          className="absolute inset-0 object-cover w-full h-full opacity-30"
        />
      }
    >
      <div className="text-center mb-12">
        <motion.h3
          className="text-lg text-white/60 font-bold tracking-[0.375rem] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("heading1")}
        </motion.h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 font-display">
          {heading2Lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < heading2Lines.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>

      <div className="space-y-3 w-full max-w-xl mx-auto">
        {WHY_US_ITEMS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                backgroundColor: isOpen ? "#111" : "#222",
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
                    width={10}
                    height={10}
                  />
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {isOpen && (
                  <div className="pt-4 pb-2 text-sm text-white/80 leading-relaxed font-legacy">
                    {t(`items.${item.id}.content`)}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
