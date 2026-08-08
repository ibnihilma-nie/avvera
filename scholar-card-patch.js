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

  const enhanceScholarCard = (source) => {
    let html = source;

    const scholarBank = `  scholar: [
    {
      id: 1,
      scholar: "Ibnu Sina",
      level: "C2 — Memahami",
      format: "Pilihan Ganda",
      type: "single",
      q: "Ibnu Sina melalui karya Al-Qanun fi al-Tibb memberikan kontribusi besar dalam perkembangan ilmu kedokteran. Hal yang menunjukkan karakter ilmiah dari kontribusi Ibnu Sina adalah ....",
      options: [
        "Mengembangkan ilmu kedokteran melalui observasi, pengalaman, dan penyusunan pengetahuan secara sistematis",
        "Mengutamakan pendapat pribadi tanpa melakukan pengujian",
        "Mengembangkan pengobatan hanya berdasarkan tradisi masyarakat",
        "Membatasi ilmu kedokteran agar tidak berkembang mengikuti zaman"
      ],
      answer: 0
    },
    {
      id: 2,
      scholar: "Al-Khawarizmi",
      level: "C3 — Menerapkan",
      format: "Pilihan Ganda",
      type: "single",
      q: "Al-Khawarizmi dikenal melalui kontribusinya dalam aljabar dan metode penyelesaian masalah secara sistematis. Seorang mahasiswa yang menerapkan nilai keteladanan Al-Khawarizmi dalam menyelesaikan tugas penelitian akan ....",
      options: [
        "Menyelesaikan masalah berdasarkan langkah yang terstruktur dan logis",
        "Mengambil kesimpulan berdasarkan perkiraan tanpa analisis",
        "Mengikuti jawaban orang lain tanpa memahami prosesnya",
        "Menghindari penggunaan metode ilmiah dalam penelitian"
      ],
      answer: 0
    },
    {
      id: 3,
      scholar: "Harun Nasution",
      level: "C2 — Memahami",
      format: "Benar/Salah",
      type: "single",
      q: "Pemikiran Harun Nasution menekankan pentingnya pendekatan rasional dan kritis dalam memahami Islam sehingga kajian Islam dapat berkembang sebagai kajian akademik.",
      options: ["Benar", "Salah"],
      answer: 0
    },
    {
      id: 4,
      scholar: "KH Hasyim Asy’ari",
      level: "C3 — Menerapkan",
      format: "Pilihan Ganda Kompleks",
      type: "multiple",
      q: "Nilai keteladanan KH Hasyim Asy’ari dalam pendidikan dapat diterapkan mahasiswa melalui ....",
      options: [
        "Menjaga kejujuran dalam proses belajar",
        "Menghargai guru dan sumber ilmu",
        "Menggunakan ilmu hanya untuk kepentingan pribadi",
        "Mengembangkan tanggung jawab akademik"
      ],
      answer: [0, 1, 3]
    },
    {
      id: 5,
      scholar: "Syekh Nawawi al-Bantani",
      level: "C2 — Memahami",
      format: "Pilih Pernyataan Tepat",
      type: "single",
      q: "Kontribusi Syekh Nawawi al-Bantani menunjukkan bahwa ....",
      options: [
        "Ulama Nusantara memiliki peran dalam perkembangan tradisi keilmuan Islam melalui karya-karya ilmiah",
        "Perkembangan ilmu Islam hanya berasal dari kawasan Timur Tengah",
        "Karya ulama hanya memiliki nilai sejarah tanpa manfaat pendidikan",
        "Pendidikan Islam tidak membutuhkan literatur keilmuan"
      ],
      answer: 0
    },
    {
      id: 6,
      scholar: "Buya Hamka",
      level: "C3 — Menerapkan",
      format: "Pilihan Ganda",
      type: "single",
      q: "Buya Hamka dikenal sebagai ulama dan pemikir yang menghubungkan ajaran Islam dengan kehidupan masyarakat. Dalam konteks akademik, sikap yang sesuai dengan keteladanan Buya Hamka adalah ....",
      options: [
        "Menghindari diskusi agar tidak terjadi perbedaan pendapat",
        "Mengembangkan pemikiran terbuka dengan tetap berpegang pada nilai keilmuan",
        "Menerima seluruh pendapat tanpa melakukan kajian kritis",
        "Menolak perubahan dalam perkembangan ilmu pengetahuan"
      ],
      answer: 1
    }
  ],
`;

    html = replaceSection(
      html,
      "  scholar: [",
      "  technology: [",
      scholarBank,
      "Bank soal Scholar Card tidak ditemukan."
    );

    html = html.replace(
      "  const [earnedBadge, setEarnedBadge] = useState(null);",
      `  const [earnedBadge, setEarnedBadge] = useState(null);\n  const [selectedComplexOptions, setSelectedComplexOptions] = useState([]);`
    );

    const newQuizHandlers = `  const advanceScholarQuestion = (gained) => {
    setTimeout(() => {
      setShowFeedback(null);
      setSelectedComplexOptions([]);
      if (step < scholarQuestions.length - 1) {
        setStep(s => s + 1);
      } else {
        finishWithScore(score + gained);
      }
    }, 1400);
  };

  const scoreScholarAnswer = (isCorrect) => {
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    let gained = 0;
    if (isCorrect) {
      const newStreak = streak + 1;
      const streakBonus = newStreak >= 3 ? 20 : 0;
      gained = 40 + streakBonus;
      setStreak(newStreak);
      setScore(s => s + gained);
    } else {
      setStreak(0);
    }
    advanceScholarQuestion(gained);
  };

  const handleQuizAnswer = (idx) => {
    if (showFeedback) return;
    scoreScholarAnswer(idx === scholarQuestions[step].answer);
  };

  const toggleComplexOption = (idx) => {
    if (showFeedback) return;
    setSelectedComplexOptions(current =>
      current.includes(idx)
        ? current.filter(item => item !== idx)
        : [...current, idx]
    );
  };

  const submitComplexAnswer = () => {
    if (showFeedback || selectedComplexOptions.length === 0) return;
    const correct = [...scholarQuestions[step].answer].sort((a, b) => a - b);
    const selected = [...selectedComplexOptions].sort((a, b) => a - b);
    const isCorrect = correct.length === selected.length && correct.every((value, index) => value === selected[index]);
    scoreScholarAnswer(isCorrect);
  };

`;

    html = replaceSection(
      html,
      "  const handleQuizAnswer = (idx) => {",
      "  const handleMatch = (rightId) => {",
      newQuizHandlers,
      "Logika jawaban Scholar Card tidak ditemukan."
    );

    const scholarView = `        {type === 'scholar' && (
          <div className="flex flex-col h-full">
            <div className="mb-5">
              <ProgressBar progress={((step + 1) / scholarQuestions.length) * 100} height="h-2" color="bg-blue-500" />
              <div className="flex items-center justify-between gap-3 mt-3">
                <p className="text-sm text-slate-500">Soal {step + 1} dari {scholarQuestions.length}</p>
                <div className="flex flex-wrap justify-end gap-2">
                  <Badge color="bg-blue-100 text-blue-700">{scholarQuestions[step].scholar}</Badge>
                  <Badge color="bg-violet-100 text-violet-700">{scholarQuestions[step].level}</Badge>
                  <Badge color="bg-amber-100 text-amber-700">{scholarQuestions[step].format}</Badge>
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-800 text-center leading-relaxed mb-6">
              {scholarQuestions[step].q}
            </h2>

            {scholarQuestions[step].type === 'multiple' && (
              <p className="text-sm text-center text-slate-500 mb-4">Pilih semua pernyataan yang tepat, lalu tekan <strong>Kunci Jawaban</strong>.</p>
            )}

            <div className="grid grid-cols-1 gap-3 mt-auto pb-2">
              {scholarQuestions[step].options.map((opt, idx) => {
                const isMultiple = scholarQuestions[step].type === 'multiple';
                const selected = selectedComplexOptions.includes(idx);
                const optionLabel = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!!showFeedback}
                    onClick={() => isMultiple ? toggleComplexOption(idx) : handleQuizAnswer(idx)}
                    className={
                      "w-full text-left rounded-2xl border-2 px-4 py-4 md:px-5 md:py-5 transition-all flex items-start gap-4 disabled:cursor-default " +
                      (isMultiple && selected
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40")
                    }
                  >
                    <span className={
                      "w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center font-bold " +
                      (isMultiple && selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600")
                    }>
                      {isMultiple ? (selected ? "✓" : "□") : optionLabel}
                    </span>
                    <span className="text-slate-700 font-medium leading-relaxed pt-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {scholarQuestions[step].type === 'multiple' && (
              <div className="mt-5 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={submitComplexAnswer}
                  disabled={selectedComplexOptions.length === 0 || !!showFeedback}
                >
                  Kunci Jawaban
                </Button>
              </div>
            )}

            {showFeedback && (
              <div className={
                "absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-center justify-center " +
                (showFeedback === 'correct' ? "bg-emerald-500 text-white" : "bg-red-500 text-white")
              } style={{animation: 'slideUp 0.3s ease-out forwards'}}>
                <div className="flex items-center text-center md:text-left">
                  {showFeedback === 'correct'
                    ? <CheckCircle2 className="w-9 h-9 mr-3 flex-shrink-0"/>
                    : <XCircle className="w-9 h-9 mr-3 flex-shrink-0"/>}
                  <div>
                    <h3 className="text-xl font-bold">{showFeedback === 'correct' ? 'Jawaban tepat!' : 'Jawaban belum tepat.'}</h3>
                    <p className="text-sm opacity-90">{showFeedback === 'correct' ? 'Pemahaman tokoh dan penerapannya sudah sesuai.' : 'Lanjutkan ke soal berikutnya dan perhatikan hubungan tokoh, kontribusi, serta penerapannya.'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

`;

    html = replaceSection(
      html,
      "        {type === 'scholar' && (",
      "        {type === 'technology' && (",
      scholarView,
      "Tampilan Scholar Card tidak ditemukan."
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
    const enhanced = enhanceScholarCard(source);
    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");

    return new Response(enhanced, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  };
})();
