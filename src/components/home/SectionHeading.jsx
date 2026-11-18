export function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-[14px] font-medium text-ink/80">{children}</h2>
      <span className="h-px flex-1 bg-[#dddcd6]" />
    </div>
  )
}
