"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { categories, industries, faqItems } from "@/data/templates"
import { getRelatedTemplates, getTemplatePriceDisplay } from "@/lib/portfolio-data"
import {
  ArrowLeft, ArrowUpRight, Check, Clock, Eye, Layout, ShoppingCart, Star, Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

const categoryGradients = {
  restaurant: "from-emerald-500/30 to-green-600/30",
  medical: "from-sky-500/30 to-blue-600/30",
  education: "from-violet-500/30 to-purple-600/30",
  corporate: "from-indigo-500/30 to-violet-600/30",
  portfolio: "from-pink-500/30 to-rose-600/30",
  ecommerce: "from-amber-500/30 to-orange-600/30",
  agency: "from-indigo-500/30 to-blue-600/30",
  realestate: "from-teal-500/30 to-cyan-600/30",
  startup: "from-fuchsia-500/30 to-pink-600/30",
  landing: "from-cyan-500/30 to-sky-600/30",
  default: "from-accent/20 to-accent-secondary/20",
}

const badgeStyles = {
  "BEST SELLER": "bg-amber-500/20 text-amber-700 border-amber-500/30",
  POPULAR: "bg-accent/20 text-accent border-accent/30",
  NEW: "bg-sky-500/20 text-sky-700 border-sky-500/30",
  TRENDING: "bg-purple-500/20 text-purple-700 border-purple-500/30",
}

function TemplatePreview({ template, gradient }) {
  const thumbnail = template.thumbnail
  const previewImages = (template.previewImages || []).filter(Boolean)
  const gallery = (template.gallery || []).filter(Boolean)
  const images = [...(thumbnail ? [thumbnail] : []), ...previewImages, ...gallery]

  return (
    <div className="relative rounded-[28px] overflow-hidden border border-border/30 bg-[#0D0D18]">
      <div className="absolute -inset-[2px] rounded-[28px] opacity-40 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(139, 92, 246, 0.06))",
        filter: "blur(8px)",
      }} />
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        {images.length > 0 ? (
          <img src={images[0]} alt={template.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-3xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center">
                <Layout className="w-10 h-10 text-foreground/40" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(13,13,24,0.6)] to-transparent" />
          </div>
        )}
      </div>
    </div>
  )
}

function RelatedTemplateCard({ template, index }) {
  const gradient = categoryGradients[template.category] || categoryGradients.default
  return (
    <SafeReveal delay={index * 0.08}>
      <Link
        href={`/templates/${template.slug}`}
        className="group block rounded-2xl overflow-hidden bg-accent/[0.06] border border-accent/15 hover:bg-accent/[0.12] hover:border-accent/30 hover:-translate-y-1 transition-all duration-500 h-full"
      >
        <div className={cn("relative h-40 overflow-hidden bg-gradient-to-br", gradient)}>
          {template.thumbnail ? (
            <img src={template.thumbnail} alt={template.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center">
                <Layout className="w-7 h-7 text-foreground/40" />
              </div>
            </div>
          )}
          {template.badge && (
            <div className="absolute top-3 left-3">
              <span className={cn("inline-block px-2 py-0.5 rounded-full text-[9px] font-bold tracking-label uppercase border", badgeStyles[template.badge] || "bg-accent/[0.09] text-foreground border-border/50")}>
                {template.badge}
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">{template.title}</h3>
            <span className="text-sm font-bold text-foreground shrink-0">{getTemplatePriceDisplay(template)}</span>
          </div>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{template.shortDescription}</p>
        </div>
      </Link>
    </SafeReveal>
  )
}

function FaqItem({ item, index }) {
  return (
    <SafeReveal delay={index * 0.05}>
      <div className="rounded-2xl border border-accent/15 bg-accent/[0.06] p-5 sm:p-6 hover:border-accent/20 transition-colors">
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-2">{item.question}</h3>
        <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
      </div>
    </SafeReveal>
  )
}

export function TemplateDetails({ template }) {
  const gradient = categoryGradients[template.category] || categoryGradients.default
  const categoryLabel = categories.find((c) => c.id === template.category)?.label || template.category
  const industryLabel = industries.find((i) => i.value === template.industry)?.label || template.industry
  const price = getTemplatePriceDisplay(template)
  const related = getRelatedTemplates(template, 3)
  const { openQuoteModal } = useQuoteModal()

  const buyThisTemplate = () =>
    openQuoteModal({
      source: "template",
      projectType: "Website Template",
      template: template.title,
      heading: "Get This Template",
      subtitle: `Order "${template.title}" — we'll set it up and customize it for your business.`,
    })

  const liveHref = template.liveLink || ""
  const showLive = Boolean(liveHref)
  const showComingSoon = !liveHref && template.demoAvailable
  const showUnavailable = !liveHref && !template.demoAvailable

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* ── Breadcrumb ── */}
        <section className="relative pt-16 pb-6 overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <SafeSlideUp>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href="/templates" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> All Templates
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-muted-foreground">{categoryLabel}</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground font-medium">{template.title}</span>
              </div>
            </SafeSlideUp>
          </div>
        </section>

        {/* ── Hero ── */}
        <section className="relative py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
              background: "radial-gradient(circle, rgba(0, 240, 255, 0.04), transparent 70%)",
              filter: "blur(120px)",
            }} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
              <div>
                <SafeSlideUp>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {template.badge && (
                      <span className={cn("inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase border", badgeStyles[template.badge] || "bg-accent/[0.09] text-foreground border-border/50")}>
                        {template.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/[0.08] text-muted-foreground border border-accent/15">{categoryLabel}</span>
                    <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{industryLabel}</span>
                  </div>
                </SafeSlideUp>

                <SafeSlideUp delay={0.1}>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    {template.title}
                  </h1>
                </SafeSlideUp>

                <SafeSlideUp delay={0.15}>
                  <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                    {template.shortDescription}
                  </p>
                </SafeSlideUp>

                <SafeSlideUp delay={0.2}>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-600 fill-amber-500" />{template.rating || "4.9"}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" />{template.deliveryTime}</span>
                    <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-accent" />{(template.purchaseCount || 0).toLocaleString()} purchases</span>
                  </div>
                </SafeSlideUp>

                <SafeSlideUp delay={0.25}>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-xs text-muted-foreground">From</span>
                      <div className="font-display text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">{price}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {showLive ? (
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          <Eye className="w-4 h-4" /> Live Preview <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className={cn(
                          "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border cursor-not-allowed",
                          showComingSoon ? "bg-accent/[0.06] border-accent/15 text-muted-foreground" : "bg-accent/[0.06] border-accent/15 text-muted-foreground/60"
                        )}>
                          <Eye className="w-4 h-4" /> {showComingSoon || showUnavailable ? "Coming Soon" : "Unavailable"}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={buyThisTemplate}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-accent/15 text-foreground font-semibold text-sm hover:bg-accent/[0.12] hover:border-border/55 transition-all"
                      >
                        <ShoppingCart className="w-4 h-4 text-accent" /> Get This Template
                      </button>
                    </div>
                  </div>
                </SafeSlideUp>
              </div>

              <SafeReveal delay={0.15}>
                <TemplatePreview template={template} gradient={gradient} />
              </SafeReveal>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        {template.fullDescription && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-background">
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
                <SectionHeading
                  label="Overview"
                  title="What's Inside"
                  as="h2"
                />
                <SafeReveal delay={0.1} className="lg:col-span-2">
                  <p className="text-base sm:text-lg text-muted leading-relaxed mb-8">
                    {template.fullDescription}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-accent/15 bg-accent/[0.06] p-5">
                      <Clock className="w-5 h-5 text-accent mb-2" />
                      <p className="text-xs text-muted-foreground">Delivery</p>
                      <p className="text-sm font-semibold text-foreground">{template.deliveryTime}</p>
                    </div>
                    <div className="rounded-2xl border border-accent/15 bg-accent/[0.06] p-5">
                      <Zap className="w-5 h-5 text-accent mb-2" />
                      <p className="text-xs text-muted-foreground">Tech Stack</p>
                      <p className="text-sm font-semibold text-foreground">{template.technologies.length} technologies</p>
                    </div>
                    <div className="rounded-2xl border border-accent/15 bg-accent/[0.06] p-5">
                      <Check className="w-5 h-5 text-accent mb-2" />
                      <p className="text-xs text-muted-foreground">Features</p>
                      <p className="text-sm font-semibold text-foreground">{template.features.length} included</p>
                    </div>
                  </div>
                </SafeReveal>
              </div>
            </div>
          </section>
        )}

        {/* ── Features ── */}
        {template.features.length > 0 && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-background">
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                label="Features"
                title="Everything You Need to Launch"
                align="center"
                className="mb-12"
                  as="h2"
                />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                {template.features.map((feat, i) => (
                  <SafeReveal key={feat} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-2xl border border-accent/15 bg-accent/[0.06] p-5 h-full hover:border-accent/25 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-accent" />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{feat}</span>
                    </div>
                  </SafeReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Tech Stack ── */}
        {template.technologies.length > 0 && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-background">
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                label="Technology"
                title="Built on a Modern Stack"
                align="center"
                className="mb-12"
                  as="h2"
                />
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {template.technologies.map((tech) => (
                  <span key={tech} className="px-4 py-2 text-xs font-medium rounded-full bg-accent/[0.08] border border-accent/15 text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Templates ── */}
        {related.length > 0 && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-background">
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <SectionHeading
                label="Keep Exploring"
                title="Related Templates"
                align="center"
                className="mb-12"
                  as="h2"
                />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((t, i) => <RelatedTemplateCard key={t.slug} template={t} index={i} />)}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-background">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="FAQ"
              title="Frequently Asked Questions"
              align="center"
              className="mb-12"
              as="h2"
              asSafe
            />
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              {faqItems.map((item, i) => <FaqItem key={item.question} item={item} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.015]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <SafeSlideUp>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                Ready to launch with{' '}
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">{template.title}</span>?
              </h2>
              <p className="mx-auto max-w-xl mt-5 text-base sm:text-lg text-muted leading-relaxed mb-8">
                Get the template delivered and customized for your business — starting at {price}.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={buyThisTemplate}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ShoppingCart className="w-4 h-4" /> Get This Template
                </button>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-accent/15 text-foreground font-semibold text-sm hover:bg-accent/[0.12] hover:border-border/55 transition-all"
                >
                  Browse All Templates
                </Link>
              </div>
            </SafeSlideUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
