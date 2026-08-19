"use client"

const logos = [
  "Google",
  "Spotify",
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Slack",
]

function LogoItem({ name }) {
  return (
    <span className="flex-shrink-0 px-8 text-xl font-semibold text-gray-300 select-none pointer-events-none tracking-tight">
      {name}
    </span>
  )
}

export function ClientTicker() {
  return (
    <div className="w-full border-t border-gray-200/60 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-[0.12em] mb-5">
          Trusted by innovative companies
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F7F7F8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F7F7F8] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee whitespace-nowrap">
            {logos.map((name) => (
              <LogoItem key={`a-${name}`} name={name} />
            ))}
            {logos.map((name) => (
              <LogoItem key={`b-${name}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
