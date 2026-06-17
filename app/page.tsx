import { SmoothScroll } from "../components/layouts/smooth-scroll";
import { Navbar } from "../components/ui/navbar";
import { Hero } from "../components/sections/hero";
import { GrowthMorph } from "../components/sections/growth-morph";
import { WhyGroc } from "../components/sections/why-groc";
import { TransitionSection } from "../components/sections/transition";
import { CommunityNetwork } from "../components/sections/community-network";
import { Stakeholders } from "../components/sections/stakeholders";
import { ProofGrid } from "../components/sections/proof";
import { FAQ } from "../components/sections/faq";
import { FooterCTA } from "../components/sections/footer-cta";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Sticky Global Glassmorphic Navbar */}
      <Navbar />
      
      <main className="relative flex flex-col w-full bg-dark-bg text-white selection:bg-brand-green/30 selection:text-brand-glow">
        {/* Cinematic Section 1: Unified Hero & Zoom Scroller */}
        <Hero />

        {/* Cinematic Section 2: Growth Graph Morph */}
        <GrowthMorph />

        {/* Cinematic Section 3: Why GROC Cards */}
        <WhyGroc />

        {/* Cinematic Section 4: Atmospheric Transition (Repetition is Key) */}
        <TransitionSection />

        {/* Cinematic Section 5: Community Nodes & Live terminal */}
        <CommunityNetwork />

        {/* Cinematic Section 6: Stakeholder Ecosystem Hub */}
        <Stakeholders />

        {/* Cinematic Section 7: Proof Grid */}
        <ProofGrid />

        {/* Cinematic Section 8: FAQ Accordion */}
        <FAQ />

        {/* Cinematic Final Section: Footer & CTA */}
        <FooterCTA />
      </main>
    </SmoothScroll>
  );
}
