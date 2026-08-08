(() => {
  const previousFetch = window.fetch.bind(window);

  const replaceSection = (source, startMarker, endMarker, replacement, errorMessage) => {
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start);
    if (start === -1 || end === -1) {
      console.warn(errorMessage);
      return source;
    }
    return source.slice(0, start) + replacement + source.slice(end);
  };

  const enhanceScholarExam = (source) => {
    const learningStudio = `const SCHOLAR_EXAM_QUESTIONS = [
  {
    id: 1,
    scholar: "Ibnu Sina",
    level: "C2 — Memahami",
    q: "Karakter ilmiah yang paling tampak dalam kontribusi Ibnu Sina melalui Al-Qanun fi al-Tibb adalah ....",
    options: [
      "Mengandalkan tradisi tanpa pemeriksaan",
      "Menggabungkan observasi, pengalaman, dan penyusunan pengetahuan secara sistematis",
      "Menolak perubahan dalam ilmu kedokteran",
      "Mengutamakan pendapat pribadi di atas bukti"
    ],
    answer: 1
  },
  {
    id: 2,
    scholar: "Ibnu Sina",
    level: "C3 — Menerapkan",
    q: "Seorang mahasiswa membaca informasi kesehatan viral di media sosial. Sikap yang paling sesuai dengan pendekatan ilmiah Ibnu Sina adalah ....",
    options: [
      "Langsung mengikuti pengobatan yang disarankan",
      "Menyebarkan informasi tersebut kepada teman",
      "Memeriksa sumber, mengamati fakta secara hati-hati, dan berkonsultasi dengan pihak kompeten",
      "Menganggap semua informasi kesehatan di internet benar"
    ],
    answer: 2
  },
  {
    id: 3,
    scholar: "Al-Ghazali",
    level: "C2 — Memahami",
    q: "Menurut keteladanan Al-Ghazali, hubungan ilmu dan akhlak seharusnya dipahami sebagai ....",
    options: [
      "Ilmu cukup meningkatkan kemampuan berpikir tanpa membentuk karakter",
      "Akhlak tidak berkaitan dengan proses belajar",
      "Ilmu perlu berjalan bersama pembinaan diri dan tanggung jawab moral",
      "Ilmu hanya penting jika menghasilkan keuntungan"
    ],
    answer: 2
  },
  {
    id: 4,
    scholar: "Al-Ghazali",
    level: "C3 — Menerapkan",
    q: "Penerapan nilai Al-Ghazali dalam mengerjakan tugas kuliah ditunjukkan oleh mahasiswa yang ....",
    options: [
      "Menyalin karya orang lain agar cepat selesai",
      "Mencari nilai tinggi dengan cara apa pun",
      "Belajar sungguh-sungguh, jujur, dan menggunakan ilmu secara bertanggung jawab",
      "Menghindari kritik terhadap hasil pekerjaannya"
    ],
    answer: 2
  },
  {
    id: 5,
    scholar: "Ibnu Khaldun",
    level: "C2 — Memahami",
    q: "Dalam Muqaddimah, Ibnu Khaldun menjelaskan perkembangan peradaban dengan memperhatikan ....",
    options: [
      "Faktor sosial, ekonomi, politik, dan solidaritas masyarakat",
      "Satu faktor tunggal berupa kekuatan militer",
      "Pendapat penguasa tanpa melihat kondisi masyarakat",
      "Tradisi tanpa analisis sebab-akibat"
    ],
    answer: 0
  },
  {
    id: 6,
    scholar: "Ibnu Khaldun",
    level: "C3 — Menerapkan",
    q: "Jika meneliti perubahan perilaku mahasiswa di kampus, pendekatan yang sesuai dengan keteladanan Ibnu Khaldun adalah ....",
    options: [
      "Menilai hanya dari satu kejadian",
      "Menganalisis kondisi sosial, ekonomi, budaya, dan lingkungan yang saling berkaitan",
      "Mengabaikan data lapangan",
      "Menggunakan kesimpulan yang sudah ditentukan sejak awal"
    ],
    answer: 1
  },
  {
    id: 7,
    scholar: "Muhammad Abduh",
    level: "C2 — Memahami",
    q: "Gagasan pembaruan Muhammad Abduh menekankan pentingnya ....",
    options: [
      "Menutup diri dari perkembangan ilmu",
      "Pendidikan, penggunaan akal, dan keberanian melakukan perbaikan",
      "Menghindari pembaruan dalam masyarakat",
      "Mengutamakan hafalan tanpa pemahaman"
    ],
    answer: 1
  },
  {
    id: 8,
    scholar: "Muhammad Abduh",
    level: "C3 — Menerapkan",
    q: "Sikap mahasiswa yang paling sesuai dengan semangat pembaruan Muhammad Abduh adalah ....",
    options: [
      "Menerima metode lama tanpa evaluasi",
      "Menghindari diskusi tentang perubahan",
      "Mengembangkan cara belajar yang lebih efektif dengan tetap berpikir kritis",
      "Menolak penggunaan teknologi pendidikan"
    ],
    answer: 2
  },
  {
    id: 9,
    scholar: "Muhammad Iqbal",
    level: "C2 — Memahami",
    q: "Pemikiran Muhammad Iqbal mendorong manusia untuk ....",
    options: [
      "Bersikap pasif terhadap perubahan",
      "Mengembangkan potensi, kreativitas, dan keberanian bertindak",
      "Menyerahkan seluruh keputusan kepada orang lain",
      "Menghindari tantangan baru"
    ],
    answer: 1
  },
  {
    id: 10,
    scholar: "Muhammad Iqbal",
    level: "C3 — Menerapkan",
    q: "Dalam proyek kelompok, penerapan nilai Muhammad Iqbal terlihat ketika mahasiswa ....",
    options: [
      "Menunggu anggota lain menyelesaikan semua pekerjaan",
      "Menolak ide baru karena berisiko",
      "Aktif mengembangkan ide, mengambil inisiatif, dan memperbaiki hasil kerja",
      "Hanya meniru proyek kelompok lain"
    ],
    answer: 2
  },
  {
    id: 11,
    scholar: "Jamaluddin al-Afghani",
    level: "C2 — Memahami",
    q: "Jamaluddin al-Afghani dikenal mendorong ....",
    options: [
      "Persatuan, kebangkitan intelektual, dan kemandirian masyarakat",
      "Ketergantungan kepada kekuatan kolonial",
      "Pemisahan kelompok masyarakat",
      "Penolakan terhadap pendidikan"
    ],
    answer: 0
  },
  {
    id: 12,
    scholar: "Jamaluddin al-Afghani",
    level: "C3 — Menerapkan",
    q: "Nilai keteladanan al-Afghani dalam organisasi mahasiswa dapat diterapkan dengan ....",
    options: [
      "Membangun kerja sama dan solidaritas untuk menyelesaikan persoalan bersama",
      "Membentuk kelompok yang saling menjatuhkan",
      "Menghindari persoalan sosial di sekitar kampus",
      "Mengutamakan kepentingan pribadi"
    ],
    answer: 0
  },
  {
    id: 13,
    scholar: "Fazlur Rahman",
    level: "C2 — Memahami",
    q: "Pendekatan Fazlur Rahman menekankan bahwa pemahaman ajaran perlu mempertimbangkan ....",
    options: [
      "Konteks sejarah dan prinsip moral yang terkandung di dalamnya",
      "Teks tanpa melihat konteks apa pun",
      "Pendapat pribadi tanpa argumentasi",
      "Kebiasaan masyarakat sebagai satu-satunya sumber"
    ],
    answer: 0
  },
  {
    id: 14,
    scholar: "Fazlur Rahman",
    level: "C3 — Menerapkan",
    q: "Ketika membahas persoalan baru yang belum muncul pada masa lalu, pendekatan yang sesuai dengan Fazlur Rahman adalah ....",
    options: [
      "Mengabaikan nilai dasar ajaran",
      "Memahami konteks awal, menemukan prinsip moral, lalu menerapkannya secara bertanggung jawab pada konteks sekarang",
      "Menolak seluruh persoalan baru",
      "Mengambil kesimpulan hanya dari tren media sosial"
    ],
    answer: 1
  },
  {
    id: 15,
    scholar: "Seyyed Hossein Nasr",
    level: "C2 — Memahami",
    q: "Seyyed Hossein Nasr mengingatkan bahwa ilmu pengetahuan seharusnya ....",
    options: [
      "Terlepas sepenuhnya dari nilai dan tanggung jawab",
      "Memperlakukan alam hanya sebagai sumber eksploitasi",
      "Berjalan bersama kesadaran spiritual, etika, dan tanggung jawab terhadap alam",
      "Hanya digunakan untuk kepentingan ekonomi"
    ],
    answer: 2
  },
  {
    id: 16,
    scholar: "Seyyed Hossein Nasr",
    level: "C3 — Menerapkan",
    q: "Program kampus yang paling sesuai dengan pandangan Seyyed Hossein Nasr adalah ....",
    options: [
      "Meningkatkan penggunaan plastik sekali pakai",
      "Mengembangkan kebijakan hemat energi dan pengelolaan lingkungan sebagai bentuk tanggung jawab",
      "Mengabaikan dampak lingkungan dari kegiatan kampus",
      "Mengutamakan pembangunan tanpa kajian ekologis"
    ],
    answer: 1
  },
  {
    id: 17,
    scholar: "Ismail Raji al-Faruqi",
    level: "C2 — Memahami",
    q: "Gagasan Ismail Raji al-Faruqi menekankan pentingnya ....",
    options: [
      "Memisahkan ilmu dari nilai",
      "Mengintegrasikan ilmu pengetahuan dengan nilai dan kemaslahatan",
      "Mengembangkan teknologi tanpa mempertimbangkan dampaknya",
      "Mengurangi peran etika dalam pendidikan"
    ],
    answer: 1
  },
  {
    id: 18,
    scholar: "Ismail Raji al-Faruqi",
    level: "C3 — Menerapkan",
    q: "Dalam menilai sebuah inovasi digital, pendekatan yang sesuai dengan al-Faruqi adalah ....",
    options: [
      "Menilai hanya dari keuntungan finansial",
      "Mempertimbangkan manfaat, etika, dampak sosial, dan keberlanjutan",
      "Mengabaikan dampak bagi masyarakat",
      "Menganggap semua inovasi pasti baik"
    ],
    answer: 1
  },
  {
    id: 19,
    scholar: "Hamzah Fansuri",
    level: "C2 — Memahami",
    q: "Kontribusi Hamzah Fansuri menunjukkan bahwa penyebaran pengetahuan dapat dilakukan melalui ....",
    options: [
      "Bahasa dan karya sastra sebagai media pendidikan",
      "Larangan penggunaan bahasa lokal",
      "Pembatasan karya tulis",
      "Hanya komunikasi lisan"
    ],
    answer: 0
  },
  {
    id: 20,
    scholar: "Hamzah Fansuri",
    level: "C3 — Menerapkan",
    q: "Keteladanan Hamzah Fansuri dapat diterapkan mahasiswa masa kini dengan ....",
    options: [
      "Menggunakan media kreatif untuk menyampaikan gagasan akademik secara bertanggung jawab",
      "Menghindari penulisan dan publikasi",
      "Menolak penggunaan bahasa yang mudah dipahami masyarakat",
      "Membatasi ilmu hanya untuk kelompok tertentu"
    ],
    answer: 0
  },
  {
    id: 21,
    scholar: "Nuruddin ar-Raniri",
    level: "C2 — Memahami",
    q: "Peran Nuruddin ar-Raniri dalam tradisi keilmuan Aceh tampak melalui karya yang membahas ....",
    options: [
      "Agama, sejarah, pemerintahan, dan etika",
      "Hanya perdagangan",
      "Hanya ilmu hitung",
      "Hanya sastra hiburan"
    ],
    answer: 0
  },
  {
    id: 22,
    scholar: "Syekh Abdurrauf as-Singkili",
    level: "C2 — Memahami",
    q: "Kontribusi Syekh Abdurrauf as-Singkili penting bagi masyarakat Melayu karena ....",
    options: [
      "Membatasi akses masyarakat terhadap ilmu keislaman",
      "Mengembangkan pendidikan, dakwah, dan karya tafsir yang memperluas akses pengetahuan",
      "Menghindari kegiatan pendidikan",
      "Menolak penerjemahan ilmu"
    ],
    answer: 1
  },
  {
    id: 23,
    scholar: "Syekh Nawawi al-Bantani",
    level: "C2 — Memahami",
    q: "Kontribusi Syekh Nawawi al-Bantani menunjukkan bahwa ....",
    options: [
      "Ulama Nusantara berperan dalam tradisi keilmuan Islam melalui karya dan pengajaran",
      "Keilmuan Islam hanya berkembang di luar Nusantara",
      "Karya ulama tidak memiliki nilai pendidikan",
      "Tradisi menulis tidak penting dalam pendidikan Islam"
    ],
    answer: 0
  },
  {
    id: 24,
    scholar: "Syekh Nawawi al-Bantani",
    level: "C3 — Menerapkan",
    q: "Nilai yang dapat diteladani mahasiswa dari produktivitas ilmiah Syekh Nawawi al-Bantani adalah ....",
    options: [
      "Ketekunan membaca, menulis, dan membagikan ilmu",
      "Menghindari sumber pustaka",
      "Menyimpan pengetahuan hanya untuk diri sendiri",
      "Menulis tanpa memeriksa sumber"
    ],
    answer: 0
  },
  {
    id: 25,
    scholar: "KH Ahmad Dahlan",
    level: "C3 — Menerapkan",
    q: "Semangat pendidikan KH Ahmad Dahlan dapat diterapkan mahasiswa melalui ....",
    options: [
      "Menghubungkan pengetahuan dengan tindakan nyata yang bermanfaat bagi masyarakat",
      "Memisahkan proses belajar dari persoalan sosial",
      "Menghindari kegiatan pengabdian",
      "Menggunakan ilmu hanya untuk kepentingan pribadi"
    ],
    answer: 0
  },
  {
    id: 26,
    scholar: "KH Hasyim Asy’ari",
    level: "C3 — Menerapkan",
    q: "Dalam penggunaan AI generatif untuk tugas kuliah, sikap yang paling sesuai dengan keteladanan KH Hasyim Asy’ari adalah ....",
    options: [
      "Menyerahkan seluruh tugas kepada AI",
      "Menggunakan AI sebagai alat bantu, memverifikasi hasil, dan tetap menjaga kejujuran akademik",
      "Menyalin hasil AI tanpa membaca kembali",
      "Menyembunyikan sumber dan proses pengerjaan"
    ],
    answer: 1
  },
  {
    id: 27,
    scholar: "Harun Nasution",
    level: "C2 — Memahami",
    q: "Harun Nasution mendorong tradisi akademik yang ....",
    options: [
      "Tertutup terhadap perbedaan pendapat",
      "Rasional, kritis, terbuka, dan dialogis",
      "Menghindari argumentasi",
      "Mengutamakan hafalan tanpa analisis"
    ],
    answer: 1
  },
  {
    id: 28,
    scholar: "Harun Nasution",
    level: "C3 — Menerapkan",
    q: "Dalam diskusi kelas, penerapan nilai Harun Nasution ditunjukkan dengan ....",
    options: [
      "Menolak pendapat yang berbeda sebelum mendengarnya",
      "Membaca berbagai pandangan dan menyusun argumen berdasarkan alasan yang dapat dipertanggungjawabkan",
      "Mengikuti pendapat mayoritas tanpa kajian",
      "Menghindari pertanyaan kritis"
    ],
    answer: 1
  },
  {
    id: 29,
    scholar: "Nurcholish Madjid",
    level: "C3 — Menerapkan",
    q: "Sikap yang sesuai dengan pemikiran Nurcholish Madjid dalam kehidupan kampus yang beragam adalah ....",
    options: [
      "Menghindari dialog dengan kelompok berbeda",
      "Mengembangkan sikap terbuka, inklusif, dan menghargai perbedaan",
      "Menganggap perbedaan selalu sebagai ancaman",
      "Membatasi kerja sama hanya dengan kelompok sendiri"
    ],
    answer: 1
  },
  {
    id: 30,
    scholar: "Kuntowijoyo",
    level: "C3 — Menerapkan",
    q: "Dalam semangat ilmu sosial profetik Kuntowijoyo, kegiatan akademik sebaiknya diarahkan untuk ....",
    options: [
      "Memahami realitas sekaligus mendorong perubahan sosial yang bernilai dan bertanggung jawab",
      "Mengumpulkan data tanpa memikirkan manfaatnya",
      "Menghindari persoalan kemanusiaan",
      "Memisahkan ilmu sepenuhnya dari tanggung jawab sosial"
    ],
    answer: 0
  }
];

const LearningStudioView = () => {
  const [activeLesson, setActiveLesson] = useState(SCHOLARS_CURRICULUM[0].world[1]);
  const [showExam, setShowExam] = useState(false);
  const [examStep, setExamStep] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  const currentExamQuestion = SCHOLAR_EXAM_QUESTIONS[examStep];
  const answeredCount = Object.keys(examAnswers).length;
  const correctCount = SCHOLAR_EXAM_QUESTIONS.reduce(
    (total, question) => total + (examAnswers[question.id] === question.answer ? 1 : 0),
    0
  );
  const examScore = Math.round((correctCount / SCHOLAR_EXAM_QUESTIONS.length) * 100);
  const passedExam = examScore >= 70;

  const chooseExamAnswer = (answerIndex) => {
    if (examSubmitted) return;
    setExamAnswers(current => ({ ...current, [currentExamQuestion.id]: answerIndex }));
  };

  const resetExam = () => {
    setExamStep(0);
    setExamAnswers({});
    setExamSubmitted(false);
  };

  if (showExam) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        <div className="bg-gradient-to-r from-[#0E2A47] to-[#163a5f] rounded-3xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Badge color="bg-[#C99700] text-white mb-3">UJIAN MODUL SCHOLAR</Badge>
              <h2 className="text-3xl font-bold">Ujian Akhir Modul Scholar</h2>
              <p className="text-blue-100 mt-2">30 soal • Pilihan ganda • Nilai kelulusan 70</p>
            </div>
            <Button variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20" onClick={() => setShowExam(false)}>
              Kembali ke Materi
            </Button>
          </div>
        </div>

        {examSubmitted ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 text-center">
            <div className={"w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-5 " + (passedExam ? "bg-emerald-100" : "bg-amber-100")}>
              {passedExam ? <Trophy className="w-12 h-12 text-emerald-600" /> : <FileText className="w-12 h-12 text-amber-600" />}
            </div>
            <p className="text-sm uppercase tracking-[0.18em] font-bold text-slate-400">Hasil Ujian Scholar</p>
            <div className="text-6xl font-bold text-[#0E2A47] mt-2">{examScore}</div>
            <p className={"font-bold text-xl mt-2 " + (passedExam ? "text-emerald-600" : "text-amber-600")}>
              {passedExam ? "Lulus" : "Belum Lulus"}
            </p>
            <p className="text-slate-500 mt-3">Jawaban benar {correctCount} dari {SCHOLAR_EXAM_QUESTIONS.length} soal.</p>

            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mt-8">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                <div className="text-2xl font-bold text-emerald-700">{correctCount}</div>
                <div className="text-xs text-emerald-700">Benar</div>
              </div>
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                <div className="text-2xl font-bold text-red-700">{SCHOLAR_EXAM_QUESTIONS.length - correctCount}</div>
                <div className="text-xs text-red-700">Salah</div>
              </div>
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                <div className="text-2xl font-bold text-blue-700">70</div>
                <div className="text-xs text-blue-700">KKM</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <Button variant="secondary" onClick={resetExam}>Ulangi Ujian</Button>
              <Button variant="outline" onClick={() => setShowExam(false)}>Kembali ke Learning Studio</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-7">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <p className="font-bold text-[#0E2A47]">Progres Ujian</p>
                  <p className="text-sm text-slate-500">{answeredCount} dari 30 soal sudah dijawab</p>
                </div>
                <Badge color="bg-blue-100 text-blue-700">Soal {examStep + 1} / 30</Badge>
              </div>
              <ProgressBar progress={(answeredCount / SCHOLAR_EXAM_QUESTIONS.length) * 100} height="h-2" color="bg-blue-500" />

              <div className="flex flex-wrap gap-2 mt-5 max-h-28 overflow-y-auto">
                {SCHOLAR_EXAM_QUESTIONS.map((question, index) => {
                  const answered = examAnswers[question.id] !== undefined;
                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => setExamStep(index)}
                      className={
                        "w-9 h-9 rounded-lg text-sm font-bold border transition-colors " +
                        (index === examStep
                          ? "bg-[#0E2A47] text-white border-[#0E2A47]"
                          : answered
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-white text-slate-500 border-slate-200 hover:border-blue-300")
                      }
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge color="bg-blue-100 text-blue-700">{currentExamQuestion.scholar}</Badge>
                <Badge color="bg-violet-100 text-violet-700">{currentExamQuestion.level}</Badge>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-7">
                {currentExamQuestion.q}
              </h3>

              <div className="space-y-3">
                {currentExamQuestion.options.map((option, index) => {
                  const selected = examAnswers[currentExamQuestion.id] === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => chooseExamAnswer(index)}
                      className={
                        "w-full text-left rounded-2xl border-2 p-4 md:p-5 flex items-start gap-4 transition-all " +
                        (selected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/40")
                      }
                    >
                      <span className={
                        "w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0 " +
                        (selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600")
                      }>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-slate-700 font-medium leading-relaxed pt-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-100">
                <Button
                  variant="outline"
                  disabled={examStep === 0}
                  onClick={() => setExamStep(step => Math.max(0, step - 1))}
                >
                  ← Sebelumnya
                </Button>

                {examStep < SCHOLAR_EXAM_QUESTIONS.length - 1 ? (
                  <Button
                    variant="secondary"
                    onClick={() => setExamStep(step => Math.min(SCHOLAR_EXAM_QUESTIONS.length - 1, step + 1))}
                  >
                    Berikutnya →
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    disabled={answeredCount !== SCHOLAR_EXAM_QUESTIONS.length}
                    onClick={() => setExamSubmitted(true)}
                  >
                    Selesai & Lihat Nilai
                  </Button>
                )}
              </div>

              {examStep === SCHOLAR_EXAM_QUESTIONS.length - 1 && answeredCount !== SCHOLAR_EXAM_QUESTIONS.length && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 text-center">
                  Jawab semua soal terlebih dahulu. Masih ada {SCHOLAR_EXAM_QUESTIONS.length - answeredCount} soal yang belum dijawab.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]">
      <div className="flex-1 flex flex-col">
        <div className="bg-black rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden shadow-lg group">
          <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1200" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex justify-between items-end">
             <div>
                <Badge color="bg-[#C99700] text-white" className="mb-2 border border-white/20"><PlayCircle className="w-3 h-3 mr-1"/> Now Playing</Badge>
                <h2 className="text-2xl font-bold">{activeLesson.name}</h2>
             </div>
          </div>

          <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <ScholarAvatar scholar={activeLesson} size="w-16 h-16" textSize="text-lg" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{activeLesson.name}</h2>
                <p className="text-slate-500 mt-1">{activeLesson.desc}</p>
              </div>
            </div>
            <Button variant="success">Complete Lesson (+50 XP)</Button>
          </div>

          <div className="prose max-w-none text-slate-600">
            <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Learning Objectives</h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>Mengenal biografi dan perjalanan intelektual <strong>{activeLesson.name}</strong>.</li>
              <li>Menganalisis karya-karya penting dan pengaruhnya terhadap peradaban.</li>
              <li>Menghubungkan pemikiran klasik dengan relevansi di era modern.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Transcript & Ringkasan</h3>
            <p>Selamat datang di Modul Scholar. Pada sesi ini, kita akan menyelami kehidupan <strong>{activeLesson.name}</strong>, salah satu tokoh penting dalam sejarah peradaban Islam yang gagasan-gagasannya melintasi batas waktu dan ruang...</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[350px] bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col h-full">
        <h3 className="font-bold text-xl mb-4 text-[#0E2A47] flex items-center">
          <BookOpen className="w-5 h-5 mr-2" /> Kurikulum Scholar
        </h3>
        <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar pb-10">

          {SCHOLARS_CURRICULUM.map((eraBlock, eraIdx) => (
            <div key={eraIdx} className="space-y-3">
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-2 border-b border-slate-100">
                <h4 className="font-bold text-[#C99700] text-sm tracking-wider uppercase">{eraBlock.era}</h4>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 flex items-center ml-1"><Globe className="w-3 h-3 mr-1"/> Tokoh Ilmuwan Muslim Dunia</p>
                {eraBlock.world.map(scholar => (
                  <div
                    key={scholar.id}
                    onClick={() => setActiveLesson(scholar)}
                    className={
                      "p-3 rounded-xl border flex items-center cursor-pointer transition-colors " +
                      (activeLesson.id === scholar.id ? "bg-blue-50 border-blue-300 shadow-sm" : "border-slate-100 hover:bg-slate-50")
                    }
                  >
                    <ScholarAvatar scholar={scholar} size="w-9 h-9" textSize="text-[10px]" />
                    <div className="mx-3">
                      {scholar.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                       activeLesson.id === scholar.id ? <PlayCircle className="w-5 h-5 text-blue-600" /> :
                       <Lock className="w-5 h-5 text-slate-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={"text-sm font-semibold truncate " + (activeLesson.id === scholar.id ? "text-blue-900" : "text-slate-700")}>{scholar.name}</p>
                      <p className="text-xs text-slate-500">{scholar.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-4">
                <p className="text-xs font-semibold text-slate-400 flex items-center ml-1"><MapPin className="w-3 h-3 mr-1"/> Tokoh Ilmuwan Muslim Nusantara</p>
                {eraBlock.nusantara.map(scholar => (
                  <div
                    key={scholar.id}
                    onClick={() => setActiveLesson(scholar)}
                    className={
                      "p-3 rounded-xl border flex items-center cursor-pointer transition-colors " +
                      (activeLesson.id === scholar.id ? "bg-emerald-50 border-emerald-300 shadow-sm" : "border-slate-100 hover:bg-slate-50")
                    }
                  >
                    <ScholarAvatar scholar={scholar} size="w-9 h-9" textSize="text-[10px]" />
                    <div className="mx-3">
                      {scholar.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                       activeLesson.id === scholar.id ? <PlayCircle className="w-5 h-5 text-emerald-600" /> :
                       <Lock className="w-5 h-5 text-slate-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={"text-sm font-semibold truncate " + (activeLesson.id === scholar.id ? "text-emerald-900" : "text-slate-700")}>{scholar.name}</p>
                      <p className="text-xs text-slate-500">{scholar.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => { setShowExam(true); resetExam(); }}
            className="w-full p-4 rounded-xl border-2 border-amber-300 bg-amber-50 flex items-center cursor-pointer mt-4 text-left hover:bg-amber-100 transition-colors shadow-sm"
          >
            <div className="mr-3 w-10 h-10 rounded-xl bg-[#C99700] text-white flex items-center justify-center"><FileText className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900">Ujian Modul Scholar</p>
              <p className="text-xs text-amber-700">30 Pertanyaan • Nilai kelulusan 70</p>
            </div>
            <ChevronRight className="w-5 h-5 text-amber-700" />
          </button>

        </div>
      </div>
    </div>
  );
};

`;

    return replaceSection(
      source,
      "const LearningStudioView = () => {",
      "const DRIVE_MATERIALS = [",
      learningStudio,
      "Komponen Learning Studio tidak ditemukan; ujian Scholar tidak diterapkan."
    );
  };

  window.fetch = async (...args) => {
    const request = args[0];
    const url = typeof request === "string" ? request : (request && request.url) || "";
    const response = await previousFetch(...args);

    if (!response.ok || !url.includes("app-base.html")) {
      return response;
    }

    const source = await response.text();
    const enhanced = enhanceScholarExam(source);
    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");

    return new Response(enhanced, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  };
})();
