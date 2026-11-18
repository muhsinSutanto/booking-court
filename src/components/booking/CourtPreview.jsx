export function CourtPreview({ court }) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
      <img
        src={court.image}
        alt=""
        style={{ objectPosition: court.imagePosition }}
        className="size-16 shrink-0 rounded-[14px] object-cover"
      />
      <div className="min-w-0 pr-1">
        <span className="inline-flex h-5 items-center rounded-full bg-lime px-2 text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Booking
        </span>
        <p className="mt-1 truncate text-[14px] leading-tight font-bold tracking-[-0.03em] text-ink">
          {court.name}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-[#7d847e]">
          {court.type}
        </p>
      </div>
    </div>
  );
}
