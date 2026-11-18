import { cn } from "@/lib/utils";

export function InfoNote({ icon: Icon, title, children, className }) {
  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-[22px] bg-lime px-5 py-4 text-ink",
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-ink text-lime">
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        {title ? (
          <p className="text-[14px] leading-tight font-semibold">{title}</p>
        ) : null}
        <p
          className={cn(
            "text-[13px] leading-snug text-ink/75",
            title && "mt-0.5",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
