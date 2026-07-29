export function CategoryBadge({ category }) {
  return (
    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full bg-white/5 text-accent border border-white/5">
      {category}
    </span>
  )
}
