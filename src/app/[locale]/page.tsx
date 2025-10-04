import SectionHero from "@/components/sections/SectionHero";
import SectionServices from "@/components/sections/SectionServices";
import SectionShowcase from "@/components/sections/SectionShowcase";
import SectionWhyUs from "@/components/sections/SectionWhyUs";

export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionServices />
      <SectionShowcase />
      <SectionWhyUs />
    </>
  );
}
