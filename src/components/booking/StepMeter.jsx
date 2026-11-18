export function StepMeter({ step }) {
  return (
    <div className="mt-2 flex gap-1.5" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <span
          key={index}
          className={
            index < step
              ? "h-1 flex-1 rounded-full bg-lime"
              : "h-1 flex-1 rounded-full bg-[#e4e2da]"
          }
        />
      ))}
    </div>
  );
}
