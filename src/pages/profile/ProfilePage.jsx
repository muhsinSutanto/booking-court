import { ChartColumn, Medal, Search, Whistle } from "lucide-react";
import { PerformanceChart } from "@/components/profile/PerformanceChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useProfilePage } from "@/pages/profile/hooks/useProfilePage";

const statIcons = {
  whistle: Whistle,
  medal: Medal,
  chart: ChartColumn,
};

export function ProfilePage() {
  const profile = useProfilePage();
  const { rating } = profile;

  return (
    <section className="flex flex-col gap-8 px-6 pt-7 pb-12">
      <h1 className="text-[22px] leading-none font-bold tracking-[-0.04em] text-ink">
        Profil
      </h1>

      <div className="flex items-center gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(23,48,38,0.05)]">
        <Avatar className="size-14 after:border-0">
          <AvatarImage src={profile.avatar} alt="" />
          <AvatarFallback className="bg-ink font-semibold text-primary-foreground">
            {profile.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[16px] font-bold tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="mt-1 text-[13px] text-[#8a918b]">{profile.club}</p>
          <p className="mt-1 text-[13px] font-medium text-ink">{profile.level}</p>
        </div>
      </div>

      <article className="rounded-[24px] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(23,48,38,0.05)]">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-medium tracking-[0.12em] text-[#8b918b] uppercase">
            {rating.label}
          </p>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#f3f2ec] text-ink">
            <Search className="size-4" strokeWidth={1.75} />
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <p className="text-[34px] leading-none font-bold tracking-[-0.04em] text-ink">
            {rating.value}
          </p>
          <span className="rounded-full bg-[#e7f6ea] px-2 py-0.5 text-[12px] font-semibold text-[#1f7a3a]">
            {rating.delta}
          </span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 text-[12px] text-[#6e766f]">
          <span>{rating.progressLabel}</span>
          <span className="font-semibold text-ink">{rating.progress}%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eceae4]">
          <div
            className="h-full rounded-full bg-ink"
            style={{ width: `${rating.progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#8a918b]">
          <span>{rating.from}</span>
          <span>{rating.target}</span>
        </div>
      </article>

      <div className="grid grid-cols-3 gap-4">
        {profile.stats.map((stat) => {
          const Icon = statIcons[stat.icon];
          return (
            <article
              key={stat.id}
              className="rounded-[22px] bg-white px-3 py-5 text-center shadow-[0_8px_24px_rgba(23,48,38,0.05)]"
            >
              <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-[#f3f2ec] text-ink">
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-[18px] leading-none font-bold tracking-[-0.03em] text-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] text-[#8a918b]">{stat.label}</p>
            </article>
          );
        })}
      </div>

      <article className="rounded-[24px] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(23,48,38,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-bold tracking-[-0.03em] text-ink">
            Tren Performa
          </h2>
          <span className="rounded-full bg-[#f3f2ec] px-3 py-1 text-[12px] font-medium text-[#6e766f]">
            {profile.trend.range}
          </span>
        </div>
        <PerformanceChart points={profile.trend.points} />
        <div className="mt-4 flex justify-between gap-3 text-[11px] leading-snug text-[#8a918b]">
          {profile.trend.points.map((point) => (
            <span key={point.label} className="max-w-[33%] text-center">
              {point.label}
            </span>
          ))}
        </div>
      </article>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-bold tracking-[-0.03em] text-ink">
            Pertandingan Terakhir
          </h2>
          <span className="text-[13px] font-medium text-[#8b908a]">
            Lihat Semua
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {profile.results.map((match) => (
            <article
              key={match.id}
              className="rounded-[22px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(23,48,38,0.05)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] text-[#8a918b]">{match.when}</p>
                  <p className="mt-1.5 text-[14px] font-bold tracking-[-0.02em] text-ink">
                    {match.opponent}
                  </p>
                  <p className="mt-1 text-[12px] text-[#6e766f]">{match.score}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={cn(
                      "inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-semibold",
                      match.won
                        ? "bg-[#e7f6ea] text-[#1f7a3a]"
                        : "bg-[#fdecec] text-[#c44545]",
                    )}
                  >
                    {match.result}
                  </span>
                  <p
                    className={cn(
                      "mt-1.5 text-[12px] font-medium",
                      match.won ? "text-[#1f7a3a]" : "text-[#c44545]",
                    )}
                  >
                    {match.rating}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
