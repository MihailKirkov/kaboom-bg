"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MinusCircle, MinusCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/section-wrapper";

const WHY_US_ITEMS = [
    {
        id: "competence",
        title: "КОМПЕТЕНТНОСТ",
        content:
        "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок. Малко обяснително текстче към този текстови блок.",
    },
    {
        id: "qa",
        title: "QUALITY ASSURANCE",
        content:
        "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок.",
    },
    {
        id: "kaizen",
        title: "КАЙЗЕН",
        content:
        "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок.",
    },
    {
        id: "heart",
        title: "РАБОТИМ СЪС СЪРЦЕ",
        content:
        "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок.",
    },
    {
        id: "cool",
        title: "ГОТИНИ ХОРА",
        content:
        "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок.",
    },
];

export default function SectionWhyUs() {
    const [openId, setOpenId] = useState("competence");

    return (
        <SectionWrapper
            aria-label="Why Us"
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
                    ЗАЩО KABOOM
                </motion.h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-red-600">
                КАК ПОСТИГАМЕ <br /> РЕЗУЛТАТИ?
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
                        borderColor: isOpen ? "#f00" : "#444",
                    }}
                    className={`rounded-md overflow-hidden border px-4 py-2 transition-all`}
                    >
                    <button
                        className="w-full flex justify-between items-center text-center text-white font-bold text-sm tracking-wide"
                        onClick={() =>
                        setOpenId((prev) => (prev === item.id ? "" : item.id))
                        }
                    >
                        {item.title}
                        {isOpen ? <MinusIcon className="rounded-xl bg-white" color="black" size={20} /> : <PlusIcon className="rounded-xl bg-black" size={20} />}
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {isOpen && (
                        <div className="pt-4 pb-2 text-sm text-white/80 leading-relaxed">
                            {item.content}
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