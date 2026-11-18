export function useProfilePage() {
  return {
    name: "Member",
    club: "Sample Padel",
    level: "Level 3.42",
    avatar: "/avatar.jpg",
    initials: "SP",
    rating: {
      label: "Playtomic Level",
      value: "3.42",
      delta: "+0.17",
      progressLabel: "Menuju Target 4.0",
      progress: 58,
      from: "Level 3.0",
      target: "Target Level 4.0",
    },
    stats: [
      { id: "matches", icon: "whistle", value: "24", label: "Pertandingan" },
      { id: "wins", icon: "medal", value: "68%", label: "Menang" },
      { id: "rank", icon: "chart", value: "#14", label: "Club Rank" },
    ],
    trend: {
      range: "6 Bulan",
      points: [
        { label: "Okt 2023 (3.00)", value: 3 },
        { label: "Jan 2024 (3.24)", value: 3.24 },
        { label: "Hari ini (3.42)", value: 3.42 },
      ],
    },
    results: [
      {
        id: "dimas",
        when: "Kemarin • Center Court",
        opponent: "vs Dimas & Kevin",
        score: "Skor: 6–4, 6–3",
        result: "Menang",
        rating: "+0.08 Rating",
        won: true,
      },
      {
        id: "rian",
        when: "3 hari lalu • Panoramic Court",
        opponent: "vs Rian & Fajar",
        score: "Skor: 6–3, 6–2",
        result: "Menang",
        rating: "+0.09 Rating",
        won: true,
      },
      {
        id: "budi",
        when: "1 mgg lalu • Indoor Court 2",
        opponent: "vs Budi & Arya",
        score: "Skor: 4–6, 5–7",
        result: "Kalah",
        rating: "−0.04 Rating",
        won: false,
      },
    ],
  };
}
