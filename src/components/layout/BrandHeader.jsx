import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrandMark } from "@/components/layout/BrandMark";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background/95 px-6 pt-[max(1.15rem,env(safe-area-inset-top))] pb-4 backdrop-blur">
      <Link to="/" className="flex items-center gap-2 text-ink">
        <BrandMark className="size-5" />
        <span className="text-[15px] font-semibold tracking-[-0.03em]">
          sample<span className="text-olive">padel</span>
        </span>
      </Link>
      <Link to="/profile" aria-label="Profil" className="rounded-full">
        <Avatar className="size-11">
          <AvatarImage src="/avatar.jpg" alt="" />
          <AvatarFallback className="bg-ink text-xs font-semibold text-primary-foreground">
            SP
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
