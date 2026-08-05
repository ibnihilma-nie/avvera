(() => {
  const nativeFetch = window.fetch.bind(window);

  const replaceSection = (source, startMarker, endMarker, replacement, errorMessage) => {
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start);
    if (start === -1 || end === -1) {
      console.warn(errorMessage);
      return source;
    }
    return source.slice(0, start) + replacement + source.slice(end);
  };

  const enhanceAverra = (source) => {
    let html = source;

    const newMockUser = `const MOCK_USER = {
  id: 1,
  name: "Muhamad Aprizal",
  email: "Aprizal@gmail.com",
  institution: "UIN Syarif Hidayatullah",
  class: "4E",
  group: "Al-Khawarizmi Squad",
  level: 5,
  xp: 2450,
  nextLevelXp: 3000,
  boardScore: 0,
  currentPhase: 1,
  streak: 12,
  badges: ["Scholar Explorer", "Early Bird", "Perfect Quiz"],
  avatarKey: "fox"
};

`;
    html = replaceSection(html, "const MOCK_USER = {", "const PHASES = [", newMockUser, "Data pengguna AVERRA tidak ditemukan.");

    const newLeaderboardData = `const LEADERBOARD_DATA = [
  { id: "bot-1", name: "Naila Cendekia", group: "Ibn Sina Team", score: 420, level: 4, avatarKey: "owl" },
  { id: "bot-2", name: "Raka Penjelajah", group: "Al-Biruni", score: 300, level: 3, avatarKey: "panda" },
  { id: "bot-3", name: "Dina Bintang", group: "Ibn Haytham", score: 180, level: 2, avatarKey: "cat" },
  { id: "bot-4", name: "Faisal Pintar", group: "Al-Jazari", score: 90, level: 1, avatarKey: "bear" }
];

`;
    html = replaceSection(html, "const LEADERBOARD_DATA = [", "const VR_ROOMS = [", newLeaderboardData, "Data leaderboard AVERRA tidak ditemukan.");

    const cartoonComponents = `const CARTOON_AVATARS = {
  fox: { emoji: "🦊", bg: "bg-orange-100", ring: "ring-orange-300" },
  owl: { emoji: "🦉", bg: "bg-violet-100", ring: "ring-violet-300" },
  panda: { emoji: "🐼", bg: "bg-slate-100", ring: "ring-slate-300" },
  cat: { emoji: "🐱", bg: "bg-pink-100", ring: "ring-pink-300" },
  bear: { emoji: "🐻", bg: "bg-amber-100", ring: "ring-amber-300" },
  rabbit: { emoji: "🐰", bg: "bg-blue-100", ring: "ring-blue-300" }
};

const CartoonAvatar = ({ avatarKey = "fox", size = "w-12 h-12", textSize = "text-3xl", className = "" }) => {
  const avatar = CARTOON_AVATARS[avatarKey] || CARTOON_AVATARS.fox;
  return (
    <div
      role="img"
      aria-label="Avatar kartun lucu"
      className={size + " " + textSize + " " + avatar.bg + " " + avatar.ring + " rounded-full ring-2 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 select-none " + className}
    >
      <span aria-hidden="true">{avatar.emoji}</span>
    </div>
  );
};

`;
    html = html.replace("const getInitials = (name) => name", cartoonComponents + "const getInitials = (name) => name");

    html = html.replace(
      '<img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-[#C99700]" />',
      '<CartoonAvatar avatarKey={user.avatarKey} size="w-10 h-10" textSize="text-2xl" />'
    );
    html = html.replace(
      '<img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-[#C99700] shadow-md" />',
      '<CartoonAvatar avatarKey={user.avatarKey} size="w-24 h-24" textSize="text-6xl" className="ring-4 ring-[#C99700]" />'
    );

    html = html.replace(
      '<div className="text-sm text-slate-500">Collected Cards</div>\n            <div className="text-2xl font-bold text-[#C99700]">12 <span className="text-sm text-slate-400">/ 40</span></div>',
      '<div className="text-sm text-slate-500">Poin Board Game</div>\n            <div className="text-2xl font-bold text-[#C99700]">{user.boardScore || 0} <span className="text-sm text-slate-400">poin</span></div>'
    );

    html = html.replace(
      '<div className="grid grid-cols-3 gap-4 text-center">',
      '<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">'
    );
    html = html.replace(
      `<div>
          <div className="text-2xl font-bold text-[#C99700]">{user.xp}</div>
          <div className="text-xs text-slate-500">XP</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#C99700]">{user.streak}</div>`,
      `<div>
          <div className="text-2xl font-bold text-[#C99700]">{user.xp}</div>
          <div className="text-xs text-slate-500">XP</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#C99700]">{user.boardScore || 0}</div>
          <div className="text-xs text-slate-500">Poin Board</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#C99700]">{user.streak}</div>`
    );

    const newLeaderboard = `const LeaderboardView = ({ user }) => {
  const rankings = [
    ...LEADERBOARD_DATA,
    {
      id: "current-user",
      name: user.name,
      group: user.group,
      score: user.boardScore || 0,
      level: user.level,
      avatarKey: user.avatarKey || "fox",
      isCurrent: true
    }
  ].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  const topThree = rankings.slice(0, 3);
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);
  const podiumHeights = ["h-32 bg-slate-200 text-slate-700", "h-40 bg-[#C99700] text-white", "h-24 bg-amber-100 text-amber-900"];
  const podiumRanks = [2, 1, 3];
  const podiumSizes = ["w-20 h-20", "w-28 h-28", "w-20 h-20"];
  const podiumTextSizes = ["text-5xl", "text-6xl", "text-5xl"];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#0E2A47]">Leaderboard Board Game</h2>
        <p className="text-slate-600 mt-2">Peringkat berubah otomatis berdasarkan total poin jawaban dari tantangan Board Game.</p>
        <Badge color="bg-amber-100 text-amber-700 mt-3"><Star className="w-3 h-3 mr-1" /> Poin kamu: {user.boardScore || 0}</Badge>
      </div>

      <div className="hidden md:flex justify-center items-end mb-12 space-x-4 h-64">
        {podiumOrder.map((entry, index) => (
          <div key={entry.id} className={(index === 1 ? "w-48" : "w-40") + " flex flex-col items-center group"}>
            <div className="relative">
              {index === 1 && <Crown className="w-10 h-10 text-amber-500 absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce" />}
              <CartoonAvatar avatarKey={entry.avatarKey} size={podiumSizes[index]} textSize={podiumTextSizes[index]} className="mb-4 group-hover:scale-110 transition-transform" />
              <div className={"absolute -bottom-2 -right-1 rounded-full flex items-center justify-center font-bold text-white border-2 border-white z-20 shadow " + (index === 1 ? "bg-amber-500 w-10 h-10 text-lg" : index === 0 ? "bg-slate-400 w-8 h-8" : "bg-amber-700 w-8 h-8")}>{podiumRanks[index]}</div>
            </div>
            <div className={podiumHeights[index] + " w-full rounded-t-xl flex flex-col items-center pt-4 shadow-sm"}>
              <span className="font-bold truncate w-full text-center px-2">{entry.name}</span>
              <span className={(index === 1 ? "bg-black/20 text-white" : "text-[#C99700]") + " font-bold mt-1 px-3 py-1 rounded-full text-sm"}>{entry.score} poin</span>
              {entry.isCurrent && <span className="mt-2 text-[10px] font-bold uppercase tracking-wide">Kamu</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {rankings.map((entry, idx) => (
          <div key={entry.id} className={"flex items-center p-4 md:px-8 border-b border-slate-50 last:border-0 transition-colors " + (entry.isCurrent ? "bg-amber-50 ring-1 ring-inset ring-amber-200" : "hover:bg-slate-50")}>
            <div className="w-9 font-bold text-slate-400 text-lg">{idx + 1}</div>
            <CartoonAvatar avatarKey={entry.avatarKey} size="w-12 h-12" textSize="text-3xl" className="mr-4" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 text-lg flex items-center">
                <span className="truncate">{entry.name}</span>
                {entry.isCurrent && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Kamu</span>}
              </h4>
              <p className="text-sm text-slate-500">{entry.group}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-[#C99700] text-lg">{entry.score} poin</div>
              <div className="text-sm text-slate-500">Level {entry.level}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 text-center mt-4">Poin dan posisi pengguna tersimpan pada browser perangkat ini.</p>
    </div>
  );
};

`;
    html = replaceSection(html, "const LeaderboardView = () => (", "const QRScannerView = () => (", newLeaderboard, "Komponen leaderboard AVERRA tidak ditemukan.");

    html = html.replace(
      "  const handleLogin = () => {\n    setUser(MOCK_USER);\n    setActiveView('dashboard');\n  };",
      `  const handleLogin = () => {
    try {
      const savedProgress = JSON.parse(localStorage.getItem("averra-user-progress") || "null");
      setUser(savedProgress ? { ...MOCK_USER, ...savedProgress } : { ...MOCK_USER });
    } catch (error) {
      console.warn("Progress tersimpan tidak dapat dibaca:", error);
      setUser({ ...MOCK_USER });
    }
    setActiveView("dashboard");
  };`
    );

    html = html.replace(
      "  const handleLogout = () => {\n    setUser(null);\n  };",
      `  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("averra-user-progress", JSON.stringify(user));
    }
  }, [user]);`
    );

    const newCompleteChallenge = `  const completeChallenge = (gainedXp, badgeName) => {
    setUser(prev => {
      let newXp = prev.xp + gainedXp;
      let newLevel = prev.level;
      let showedModal = false;

      if (newXp >= prev.nextLevelXp) {
        newLevel++;
        newXp = newXp - prev.nextLevelXp;
        showedModal = true;
      }

      if (showedModal) setShowLevelUp(true);

      const alreadyHasBadge = badgeName && prev.badges.includes(badgeName);
      if (badgeName && !alreadyHasBadge) {
        setTimeout(() => setNewBadgeToast(badgeName), showedModal ? 3200 : 300);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        boardScore: (prev.boardScore || 0) + gainedXp,
        badges: (badgeName && !alreadyHasBadge) ? [...prev.badges, badgeName] : prev.badges,
        currentPhase: prev.currentPhase < 4 ? prev.currentPhase + 1 : prev.currentPhase
      };
    });

    setActiveChallenge(null);
    setActiveView("leaderboard");

    if (showLevelUp) {
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

`;
    html = replaceSection(html, "  const completeChallenge = (gainedXp, badgeName) => {", "  useEffect(() => {\n    if (newBadgeToast)", newCompleteChallenge, "Fungsi penyelesaian Board Game tidak ditemukan.");

    html = html.replace(
      "    case 'leaderboard':\n      return <LeaderboardView />;",
      "    case 'leaderboard':\n      return <LeaderboardView user={user} />;"
    );
    html = html.replace(
      "  const finishWithScore = (finalScore) => {\n    setEarnedBadge(ACHIEVEMENT_RULES[type]);",
      "  const finishWithScore = (finalScore) => {\n    setScore(finalScore);\n    setEarnedBadge(ACHIEVEMENT_RULES[type]);"
    );

    return html;
  };

  window.fetch = async (...args) => {
    const request = args[0];
    const url = typeof request === "string" ? request : (request && request.url) || "";
    const response = await nativeFetch(...args);

    if (!response.ok || !url.includes("app-base.html")) {
      return response;
    }

    const source = await response.text();
    const enhanced = enhanceAverra(source);
    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");

    return new Response(enhanced, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  };
})();
