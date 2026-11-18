import { cn } from "@/lib/utils";

export function SlotGrid({ slots, selectedId, onSelect }) {
  if (slots.length === 0) {
    return (
      <p className="mt-2.5 text-[13px] text-[#8a918b]">
        Tidak ada jam pada hari ini.
      </p>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-4">
      {slots.map((slot) => {
        const closed = !slot.available && !slot.booked;
        const selected = slot.id === selectedId;
        const label = slot.booked ? "Terpesan" : closed ? "Penuh" : "Tersedia";

        return (
          <button
            key={slot.id}
            type="button"
            disabled={closed}
            onClick={() => onSelect(slot.id)}
            className={cn(
              "rounded-[20px] border px-4 py-4 text-left",
              selected && "border-ink bg-[#f7f8e8]",
              !selected && !closed && "border-[#e4e2da] bg-white",
              closed && "border-[#eceae4] bg-[#f6f5f1] text-[#a1a79f]",
            )}
          >
            <span className="block text-[13px] font-medium tracking-[-0.01em]">
              {slot.start} – {slot.end}
            </span>
            <span
              className={cn(
                "mt-2 block text-[12px]",
                closed ? "text-[#a1a79f]" : "text-[#8b918b]",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
