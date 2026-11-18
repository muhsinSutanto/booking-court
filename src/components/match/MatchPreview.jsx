import { Badge } from "@/components/ui/badge";

export function MatchPreview({ match }) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
      <img
        src={match.image}
        alt=""
        style={{ objectPosition: match.imagePosition }}
        className="size-16 shrink-0 rounded-[14px] object-cover"
      />
      <div className="min-w-0 pr-1">
        <Badge className="h-5 rounded-full bg-lime px-2 text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          {match.status}
        </Badge>
        <p className="mt-1 text-[14px] leading-tight font-bold tracking-[-0.03em] text-ink">
          {match.title}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-[#7d847e]">
          {match.place}
        </p>
      </div>
    </div>
  );
}
