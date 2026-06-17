import { SmoothScroll } from "../components/layouts/smooth-scroll";
import { Navbar } from "../components/ui/navbar";
import { Hero } from "../components/sections/hero";
import { GrowthMorph } from "../components/sections/growth-morph";
import { WhyGroc } from "../components/sections/why-groc";
import { CommunityNetwork } from "../components/sections/community-network";
import { ProofGrid } from "../components/sections/proof";
import { FooterCTA } from "../components/sections/footer-cta";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Sticky Global Glassmorphic Navbar */}
      <Navbar />
      
      <main className="relative flex flex-col w-full bg-dark-bg text-white selection:bg-brand-green/30 selection:text-brand-glow">
        {/* Cinematic Section 1: Unified Hero & Zoom Scroller */}
        <Hero />

        {/* Cinematic Section 3: Growth Graph Morph */}
        <GrowthMorph />

        {/* Cinematic Section 4: Why GROC Cards */}
        <WhyGroc />

        {/* Cinematic Section 5: Community Nodes */}
        <CommunityNetwork />

        {/* Cinematic Section 6: Proof Grid */}
        <ProofGrid />

        {/* Cinematic Final Section: Footer & CTA */}
        <FooterCTA />
      </main>
    </SmoothScroll>
  );
}
