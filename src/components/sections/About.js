"use client"

import { values } from "@/components/about/aboutData"
import { TransformationJourney } from "@/components/about/TransformationJourney"
import { AboutValues } from "@/components/about/AboutValues"
import { CtaBanner } from "@/components/about/CtaBanner"
import { SectionHeading } from "@/components/ui/SectionHeading"

export function About() {
  return (
    <section
      id="about"
      className="relative py-[120px] sm:py-[160px] overflow-hidden bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <SectionHeading
            label="About SmartByte"
            title={
              <>
                More Than<br />
                Developers.<br />
                <span className="text-[#50FFAF]">
                  We&apos;re Your Technology Partner.
                </span>
              </>
            }
            description="We don't just build websites. We help businesses launch, grow and scale with modern technology. From business websites and SaaS products to inventory systems, restaurant platforms, AI automation and digital branding — we become your long-term technology partner."
            maxWidth="640px"
          />
        </div>

        {/* Main Grid */}
        <div className="lg:grid lg:grid-cols-[38%_58%] lg:gap-12 xl:gap-16">
          {/* LEFT — Story & Values */}
          <div>
            <TransformationJourney />
            <AboutValues values={values} />
          </div>

          {/* RIGHT — Placeholder for future content */}
          <div className="mt-12 lg:mt-0" />
        </div>

        {/* Bottom CTA Banner */}
        <CtaBanner />
      </div>
    </section>
  )
}
