export function CategoryBadge({ category }) {
  return (
    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full bg-accent/[0.08] text-accent border border-border/25">
      {category}
    </span>
  )
}
