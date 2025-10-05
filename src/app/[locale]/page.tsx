'use client';

import { useRef } from 'react';
import SectionHero from "@/components/sections/SectionHero";
import SectionServices from "@/components/sections/SectionServices";
import SectionShowcase from "@/components/sections/SectionShowcase";
import SectionWhyUs from "@/components/sections/SectionWhyUs";
import SectionTestimonials from "@/components/sections/SectionTestimonials";
import SectionAwards from "@/components/sections/SectionAwards";
import SectionContactUs from "@/components/sections/SectionContactUs";
import Footer from "@/components/Footer"; // moved here

export default function Home() {
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <SectionHero />
      <SectionServices />
      <SectionShowcase />
      <SectionWhyUs />
      <SectionTestimonials />
      <SectionAwards />

      {/* Last section with ref */}
      <section ref={contactRef}>
        <SectionContactUs />
      </section>

      {/* Footer now has access to scroll target */}
      <Footer scrollToRef={contactRef} />
    </>
  );
}
