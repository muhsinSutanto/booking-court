import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import { BrandHeader } from "@/components/layout/BrandHeader";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

export function AppShell() {
  return (
    <PhoneFrame>
      <BrandHeader />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </PhoneFrame>
  );
}
