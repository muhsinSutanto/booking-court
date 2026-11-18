export function PerformanceChart({ points }) {
  const width = 320;
  const height = 88;
  const padX = 10;
  const padY = 12;
  const values = points.map((point) => point.value);
  const min = Math.min(...values) - 0.12;
  const max = Math.max(...values) + 0.08;
  const coords = points.map((point, index) => {
    const x = padX + (index / (points.length - 1)) * (width - padX * 2);
    const y = padY + ((max - point.value) / (max - min)) * (height - padY * 2);
    return { x, y, last: index === points.length - 1 };
  });
  const line = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const area = [
    `M ${coords[0].x},${height - 2}`,
    ...coords.map((point) => `L ${point.x},${point.y}`),
    `L ${coords[coords.length - 1].x},${height - 2}`,
    "Z",
  ].join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-6 h-[104px] w-full" aria-hidden="true">
      <path d={area} fill="#173026" opacity="0.08" />
      <polyline
        points={line}
        fill="none"
        stroke="#173026"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {coords.map((point) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={point.last ? 4.5 : 4}
          fill={point.last ? "#173026" : "#f7f6f2"}
          stroke="#173026"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
