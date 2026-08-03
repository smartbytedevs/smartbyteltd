"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { categories, industries } from "@/data/works"
import { findProjectBySlug, getRelatedProjects } from "@/lib/portfolio-data"
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Calendar, Check, CheckCircle,
  Clock, Code, Lightbulb, MapPin, Palette, Quote, Rocket, Search, Star,
  Target, Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

const categoryGradients = {
  restaurant: "from-emerald-500/30 to-green-600/30",
  medical: "from-sky-500/30 to-blue-600/30",
  education: "from-violet-500/30 to-purple-600/30",
  corporate: "from-slate-500/30 to-gray-600/30",
  portfolio: "from-pink-500/30 to-rose-600/30",
  ecommerce: "from-amber-500/30 to-orange-600/30",
  agency: "from-indigo-500/30 to-blue-600/30",
  realestate: "from-teal-500/30 to-cyan-600/30",
  default: "from-accent/20 to-accent-secondary/20",
}

const statusColors = {
  Live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "In Progress": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Completed: "bg-accent/10 text-accent border-accent/20",
}

function Section({ label, title, children, center = false, className }) {
  return (
    <section className={cn("relative py-16 md:py-20 overflow-hidden bg-background", className)}>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={label}
          title={title}
          align={center ? "center" : "left"}
          className={cn(center ? "mb-12" : "mb-8", !center && "max-w-2xl")}
          as="h2"
        />
        {children}
      </div>
    </section>
  )
}

function Body({ children }) {
  return <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">{children}</p>
}

function BulletList({ items, icon: Icon = Check }) {
  if (!items || items.length === 0) return null
  return (
    <ul className="space-y-3 mt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="w-3 h-3 text-accent" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StatGrid({ stats }) {
  if (!stats || stats.length === 0) return null
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <SafeReveal key={stat.label} delay={i * 0.06}>
          <div className="relative rounded-2xl p-5 sm:p-6 overflow-hidden">
            <div className="absolute inset-0 rounded-2xl border border-white/[0.06] transition-colors duration-300 hover:border-accent/15" style={{
              background: "rgba(15, 23, 42, 0.3)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }} />
            <div className="relative z-10">
              <span className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent block leading-none">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-xs text-muted mt-2 block leading-tight">{stat.label}</span>
            </div>
          </div>
        </SafeReveal>
      ))}
    </div>
  )
}

function Testimonial({ testimonial }) {
  if (!testimonial) return null
  return (
    <div className="relative rounded-2xl p-6 sm:p-8 border border-white/[0.06] bg-white/[0.02]">
      <Quote className="w-6 h-6 text-accent/30 mb-3" />
      <p className="text-sm sm:text-base text-muted italic leading-relaxed mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-background font-bold text-sm shrink-0">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

function RelatedProjectCard({ project, index }) {
  const gradient = categoryGradients[project.category] || categoryGradients.default
  return (
    <SafeReveal delay={index * 0.08}>
      <Link
        href={`/works/${project.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-accent/30 hover:-translate-y-1 transition-all duration-500 h-full"
      >
        <div className={cn("relative h-40 overflow-hidden bg-gradient-to-br", gradient)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white/40" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-muted-foreground border border-white/[0.06]">
              {project.industry}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />{project.rating}
            </span>
          </div>
          <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{project.summary}</p>
        </div>
      </Link>
    </SafeReveal>
  )
}

export function ProjectCaseStudy({ project }) {
  const cs = project.caseStudy || {}
  const gradient = categoryGradients[project.category] || categoryGradients.default
  const categoryLabel = categories.find((c) => c.id === project.category)?.label || project.category
  const industryLabel = industries.find((i) => i.id === project.industry)?.label || project.industry

  const coverImage = project.coverImage || project.thumbnail || ""
  const gallery = (cs.gallery || []).filter(Boolean)

  const listedRelated = (cs.relatedProjects || [])
    .map((r) => (typeof r === "string" ? findProjectBySlug(r) : findProjectBySlug(r?.slug)))
    .filter(Boolean)
  const related = listedRelated.length > 0 ? listedRelated : getRelatedProjects(project, 3)

  const liveHref = project.liveLink || ""
  const githubHref = project.githubLink || ""
  const { openQuoteModal } = useQuoteModal()

  const startSimilarProject = () =>
    openQuoteModal({
      source: "project",
      heading: "Start a Similar Project",
      subtitle: `Tell us about a project like ${project.title} — we'll bring the same care and craft.`,
      description: `I'd like to start a project similar to "${project.title}"${project.client ? ` (built for ${project.client})` : ""}. Here's what I have in mind:`,
    })

  const heroMeta = [
    { icon: Clock, label: project.duration },
    { icon: Calendar, label: project.year },
    { icon: MapPin, label: project.location },
    { icon: Users, label: project.teamSize ? `${project.teamSize} team` : "" },
  ].filter((m) => m.label)

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* ── Breadcrumb ── */}
        <section className="relative pt-16 pb-6 overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <SafeSlideUp>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href="/works" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> All Projects
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-muted-foreground">{categoryLabel}</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground font-medium">{project.title}</span>
              </div>
            </SafeSlideUp>
          </div>
        </section>

        {/* ── Hero ── */}
        <section className="relative py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-[20%] -right-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
              filter: "blur(120px)",
            }} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
              <div>
                <SafeSlideUp>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase border", statusColors[project.status] || "bg-white/10 text-white border-white/20")}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-white/[0.06] text-muted-foreground border border-white/[0.06]">{categoryLabel}</span>
                    <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{industryLabel}</span>
                  </div>
                </SafeSlideUp>

                <SafeSlideUp delay={0.1}>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    {project.title}
                  </h1>
                </SafeSlideUp>

                {project.branding?.tagline && (
                  <SafeSlideUp delay={0.12}>
                    <p className="mt-2 text-base sm:text-lg text-accent">{project.branding.tagline}</p>
                  </SafeSlideUp>
                )}

                <SafeSlideUp delay={0.15}>
                  <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </SafeSlideUp>

                <SafeSlideUp delay={0.2}>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {heroMeta.map((m) => (
                      <span key={m.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <m.icon className="w-3.5 h-3.5 text-accent" />{m.label}
                      </span>
                    ))}
                  </div>
                </SafeSlideUp>

                <SafeSlideUp delay={0.25}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {liveHref ? (
                      <a
                        href={liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-background shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Live Website <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/[0.08] text-muted-foreground/60 cursor-not-allowed">
                        Coming Soon
                      </span>
                    )}
                    {githubHref && (
                      <a
                        href={githubHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/[0.08] text-foreground hover:bg-white/5 hover:border-white/20 transition-all"
                      >
                        <Code className="w-4 h-4 text-accent" /> View Source
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={startSimilarProject}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/[0.08] text-foreground hover:bg-white/5 hover:border-white/20 transition-all"
                    >
                      Start a Similar Project
                    </button>
                  </div>
                </SafeSlideUp>
              </div>

              <SafeReveal delay={0.15}>
                <div className="relative rounded-[28px] overflow-hidden border border-white/[0.06]">
                  <div className="absolute -inset-[2px] rounded-[28px] opacity-40 pointer-events-none" style={{
                    background: "linear-gradient(135deg, rgba(0, 194, 168, 0.12), rgba(56, 189, 248, 0.06))",
                    filter: "blur(8px)",
                  }} />
                  <div className="relative" style={{ aspectRatio: "16/10" }}>
                    {coverImage ? (
                      <img src={coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Rocket className="w-10 h-10 text-white/40" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(11,16,32,0.6)] to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              </SafeReveal>
            </div>
          </div>
        </section>

        {/* ── Stats Band ── */}
        {project.statistics && project.statistics.length > 0 && (
          <section className="relative py-10 md:py-16 overflow-hidden bg-background">
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <StatGrid stats={project.statistics} />
            </div>
          </section>
        )}

        {/* ── Overview ── */}
        {(cs.overview || (project.servicesProvided && project.servicesProvided.length > 0)) && (
          <Section label="Overview" title="Project Overview">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              <div className="lg:col-span-2">
                {cs.overview && <Body>{cs.overview}</Body>}
                {project.servicesProvided && project.servicesProvided.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-4">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.servicesProvided.map((s) => (
                        <span key={s} className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.04] border border-white/[0.06] text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <SafeReveal delay={0.1}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Client</p>
                    <p className="text-sm font-semibold text-foreground">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="text-sm font-semibold text-foreground">{categoryLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Industry</p>
                    <p className="text-sm font-semibold text-foreground">{industryLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-semibold text-foreground">{project.duration}</p>
                  </div>
                  {project.rating && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Rating</p>
                      <p className="text-sm font-semibold text-accent flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />{project.rating}</p>
                    </div>
                  )}
                </div>
              </SafeReveal>
            </div>
          </Section>
        )}

        {/* ── Client Problem ── */}
        {cs.clientProblem && (
          <Section label="Challenge" title="The Client's Problem">
            <Body>{cs.clientProblem}</Body>
          </Section>
        )}

        {/* ── Research ── */}
        {cs.research && (
          <Section label="Research" title="Understanding the Landscape">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
              <Body>{cs.research}</Body>
              <div className="lg:col-span-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <Search className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Research informed every decision — from information architecture to interaction details.
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── Strategy ── */}
        {cs.strategy && (
          <Section label="Strategy" title="Our Approach">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
              <Body>{cs.strategy}</Body>
              <div className="lg:col-span-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <Target className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A focused strategy kept scope tight and measurable — every feature tied to a business outcome.
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── Design Process ── */}
        {cs.designProcess && (
          <Section label="Design" title="Design Process">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
              <Body>{cs.designProcess}</Body>
              <div className="lg:col-span-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <Palette className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prototypes were validated with real users before a single line of production code was written.
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── Development ── */}
        {cs.development && (
          <Section label="Development" title="Engineering & Delivery">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
              <Body>{cs.development}</Body>
              <div className="lg:col-span-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <Code className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.technologies.length > 0 ? `Built with ${project.technologies.join(", ")}.` : "Built with a modern, scalable stack."}
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── Features ── */}
        {cs.features && cs.features.length > 0 && (
          <Section label="Features" title="Key Features">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {cs.features.map((feat, i) => (
                <SafeReveal key={feat} delay={i * 0.05}>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 h-full hover:border-accent/25 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">{feat}</span>
                  </div>
                </SafeReveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── Technical Challenges ── */}
        {cs.technicalChallenges && cs.technicalChallenges.length > 0 && (
          <Section label="Engineering" title="Technical Challenges">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {cs.technicalChallenges.map((challenge, i) => (
                <SafeReveal key={challenge.title || challenge} delay={i * 0.06}>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 h-full">
                    <Target className="w-5 h-5 text-accent mb-2" />
                    <h3 className="font-display text-sm font-bold text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{challenge.detail}</p>
                  </div>
                </SafeReveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── Results ── */}
        {(cs.results || (cs.metrics && cs.metrics.length > 0)) && (
          <Section label="Outcomes" title="Results" center>
            {cs.results && <p className="mx-auto max-w-3xl text-base sm:text-lg text-muted leading-relaxed mb-10 text-center">{cs.results}</p>}
            <StatGrid stats={cs.metrics && cs.metrics.length > 0 ? cs.metrics : project.statistics} />
          </Section>
        )}

        {/* ── Before / After ── */}
        {cs.beforeAfter && cs.beforeAfter.length === 2 && (
          <Section label="Transformation" title="Before & After">
            <div className="grid md:grid-cols-2 gap-6">
              {cs.beforeAfter.map((ba) => (
                <SafeReveal key={ba.label}>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
                    <h3 className="font-display text-sm font-bold text-foreground mb-4">{ba.label}</h3>
                    <BulletList items={ba.points} icon={ba.label === "Before" ? Target : CheckCircle} />
                  </div>
                </SafeReveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── Timeline ── */}
        {cs.timeline && cs.timeline.length > 0 && (
          <Section label="Process" title="Project Timeline">
            <div className="space-y-0">
              {cs.timeline.map((phase, i) => (
                <div key={phase.phase} className="relative flex gap-6 pb-8 last:pb-0">
                  {i < cs.timeline.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-accent/30 to-transparent" />
                  )}
                  <div className="relative shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-[10px] font-bold text-background z-10">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-display text-sm font-bold text-foreground">{phase.phase}</h3>
                      {phase.duration && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{phase.duration}</span>}
                    </div>
                    {phase.detail && <p className="text-sm text-muted leading-relaxed">{phase.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Testimonial ── */}
        {(cs.testimonial || project.testimonial) && (
          <Section label="Testimonial" title="What the Client Says" center>
            <div className="mx-auto max-w-2xl">
              <Testimonial testimonial={cs.testimonial || project.testimonial} />
            </div>
          </Section>
        )}

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
          <Section label="Gallery" title="Inside the Build" center>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {gallery.map((src, i) => (
                <SafeReveal key={src} delay={i * 0.06}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]" style={{ aspectRatio: "16/10" }}>
                    <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </SafeReveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── Lessons Learned ── */}
        {cs.lessonsLearned && cs.lessonsLearned.length > 0 && (
          <Section label="Reflections" title="Lessons Learned">
            <BulletList items={cs.lessonsLearned} icon={Lightbulb} />
          </Section>
        )}

        {/* ── Future Plans ── */}
        {cs.futurePlans && cs.futurePlans.length > 0 && (
          <Section label="What's Next" title="Future Plans">
            <BulletList items={cs.futurePlans} icon={Rocket} />
          </Section>
        )}

        {/* ── FAQ ── */}
        {cs.faq && cs.faq.length > 0 && (
          <Section label="FAQ" title="Common Questions">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
              {cs.faq.map((item, i) => (
                <SafeReveal key={item.question} delay={i * 0.05}>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-accent/20 transition-colors h-full">
                    <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
                  </div>
                </SafeReveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── Related Projects ── */}
        {related.length > 0 && (
          <Section label="More Work" title="Related Projects" center>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => <RelatedProjectCard key={p.slug} project={p} index={i} />)}
            </div>
          </Section>
        )}

        {/* ── Final CTA ── */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.015]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <SafeSlideUp>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {cs.CTA?.title || "Want Results Like These?"}
              </h2>
              <p className="mx-auto max-w-xl mt-5 text-base sm:text-lg text-muted leading-relaxed mb-8">
                {cs.CTA?.description || `Let's build a digital experience that grows your revenue the way ${project.title} did for ${project.client}.`}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={startSimilarProject}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-background font-semibold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {cs.CTA?.buttonText || "Let's Build Yours"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] text-foreground font-semibold text-sm hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <BookOpen className="w-4 h-4" /> View All Projects
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
