"use client"

import { useState, useRef } from "react"
import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { services } from "@/data/services"
import { cn } from "@/lib/utils"
import { ArrowRight, Clock, DollarSign, Globe, ShoppingCart, UtensilsCrossed, HeartPulse, GraduationCap, Package, CreditCard, Building2, CalendarCheck, Users, LayoutDashboard, Code2, Bot, Network, Wrench, ListChecks } from "lucide-react"

const iconMap = {
  Globe, ShoppingCart, UtensilsCrossed, HeartPulse, GraduationCap,
  Package, CreditCard, Building2, CalendarCheck, Users,
  LayoutDashboard, Code2, Bot, Network, Wrench,
}

function getIcon(name) {
  return iconMap[name] || ListChecks
}

function ServiceCard({ service, index, onSelect }) {
  const Icon = getIcon(service.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
        "bg-white/30 border border-border/30",
        "hover:bg-white/4555 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
      )}
      onClick={() => onSelect(service.id)}
    >
      <div className="p-6 md:p-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mb-3">{service.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{service.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.features.slice(0, 3).map((feat) => (
            <span key={feat} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/45 text-muted-foreground border border-border/30">
              {feat}
            </span>
          ))}
          {service.features.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/45 text-muted">+{service.features.length - 3}</span>
          )}
        </div>

        <div className="pt-4 border-t border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {service.timeline}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              {service.startingPrice}
            </span>
          </div>
          <motion.div
            className="w-8 h-8 rounded-lg bg-white/45 border border-border/35 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function WhatWeBuild({ onSelectService }) {
  return (
    <section id="services-grid" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(43,33,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(180, 83, 9, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Build"
          title="Solutions That Drive Results"
          description="From websites to enterprise systems — every product is crafted with precision, performance, and purpose."
          align="center"
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onSelect={onSelectService} />
          ))}
        </div>
      </div>
    </section>
  )
}
