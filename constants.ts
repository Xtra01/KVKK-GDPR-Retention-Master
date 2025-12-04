import { CourseModule, QuizItem } from './types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: "Kavramsal Temel & Pivot Mantık",
    duration: "10 Dk",
    icon: "BookOpen",
    description: "Retention (Saklama) kavramının hukuki ve mantıksal temelleri.",
    theory: [
      {
        title: "Retention Nedir?",
        content: [
          "KVKK ve GDPR kapsamında veri saklama (retention), verinin sonsuza kadar değil, sadece amaç gerçekleşene kadar tutulması prensibidir.",
          "GDPR m.5(1)(e) ve KVKK m.4 açıkça belirtir: Veri için makul, ölçülü ve gerekçeli bir saklama süresi tanımlamak zorunludur."
        ],
        bullets: [
          "Amaçla Sınırlılık: Amaç biterse veri silinir.",
          "Veri Minimizasyonu: Süreç için minimum veri tutulur.",
          "Süre Belirleme: 'İhtiyaç bitene kadar' geçersizdir, net tarih gerekir."
        ]
      },
      {
        title: "Pivot Mantık (5 Soru)",
        content: [
          "Her kişisel veri için şu 5 soruyu cevaplamadan saklama süresi belirlenemez:"
        ],
        bullets: [
          "(i) Hangi amaçla tutuyorum?",
          "(ii) Hangi hukuki dayanağa sahibim?",
          "(iii) İş süresi + Saklama süresi ne kadar?",
          "(iv) Hangi yöntemle sileceğim/anonimleştireceğim?",
          "(v) Sorumlu birim kim?"
        ]
      }
    ],
    practical: {
      scenario: "Senaryo: Bir E-Ticaret sitesi 'belki lazım olur' diye 10 yıllık tüm müşteri loglarını tutuyor.",
      steps: [
        "1. Amaç Analizi: Loglar siber güvenlik için mi, pazarlama için mi tutuluyor?",
        "2. Dayanak Kontrolü: 5651 Sayılı Kanun (2 yıl) mu, Meşru menfaat (6 ay) mi?",
        "3. Karar: Pazarlama içinse ve rıza yoksa derhal silinmeli. Güvenlik içinse 2 yıl sonra silinmeli."
      ],
      outcome: "Sonuç: Şirket 'ihtiyaç bitene kadar' politikasından vazgeçip net süreli bir takvime geçiş yapar."
    },
    checklist: [
      "Veri minimizasyonu ilkesi anlaşıldı mı?",
      "'Süre yoksa uyum yoktur' prensibi kabul edildi mi?",
      "5 soruluk Pivot Mantık ezberlendi mi?"
    ]
  },
  {
    id: 2,
    title: "Katman 1: Veri Envanteri",
    duration: "15 Dk",
    icon: "Database",
    description: "Kurumun 'Data Defensibility' duruşunun temeli.",
    theory: [
      {
        title: "Envanterin Rolü",
        content: [
          "Veri envanteri sadece bir Excel tablosu değil, kurumun veri savunma hattıdır.",
          "Hangi verinin nerede olduğunu bilmeden onu silemezsiniz veya koruyamazsınız."
        ],
        bullets: [
          "Veri Kategorisi: Kimlik, İletişim, Finans vb.",
          "Kaynak: Veri nereden geliyor? (Doğrudan kişi, 3. taraf)",
          "İşleme Amacı: Neden topladık?"
        ]
      }
    ],
    practical: {
      scenario: "İK Departmanı için envanter çıkarılması.",
      steps: [
        "1. Kategori Belirleme: Özgeçmişler, Bordrolar, Sağlık Raporları.",
        "2. Kaynak: Çalışan, Hastane, Banka.",
        "3. Eşleştirme: Özgeçmiş -> İşe Alım Süreci. Bordro -> Yasal Yükümlülük."
      ],
      outcome: "Her veri kalemi için bir satır oluşturuldu ve sahipsiz veri kalmadı."
    },
    checklist: [
      "Tüm departmanlar gezildi mi?",
      "Gölge IT (Shadow IT) verileri tespit edildi mi?",
      "Veri kategorileri netleştirildi mi?"
    ]
  },
  {
    id: 3,
    title: "Katman 2: Hukuki Dayanak Matrisi",
    duration: "20 Dk",
    icon: "Scale",
    description: "Retention süreleri kafadan atılamaz, hukuka dayanmalıdır.",
    theory: [
      {
        title: "Dayanak Yoksa Saklama Yoktur",
        content: [
          "Her saklama süresi bir maddeye atıfta bulunmalıdır. 'Biz öyle uygun gördük' hukuki bir dayanak değildir."
        ],
        bullets: [
          "Sözleşme: Ticari ilişki bitimi + 10 yıl (TTK/Zamanaşımı).",
          "Yasal Zorunluluk: Vergi Usul Kanunu (5-10 yıl).",
          "Açık Rıza: Rıza geri çekildiği an (Pazarlama verileri).",
          "Meşru Menfaat: Makul süre (Örn: Loglar için 6-12 ay)."
        ],
        warning: "En büyük hata: Meşru menfaati 'sonsuz saklama' bahanesi olarak kullanmaktır."
      }
    ],
    practical: {
      scenario: "Pazarlama departmanı eski müşterilere e-posta atmaya devam etmek istiyor.",
      steps: [
        "1. Soru: Müşteri ile sözleşme bitti mi? Evet.",
        "2. Soru: Açık rızası var mı? Hayır, geri çekmiş.",
        "3. Soru: Ticari ileti izni (İYS) var mı? Hayır.",
        "4. Karar: Veri anonimleştirilmeli veya silinmeli. Dayanak kalmadı."
      ],
      outcome: "Hukuki dayanak matrisi sayesinde riskli veriler temizlendi."
    },
    checklist: [
      "Her veri kategorisine bir KVKK m.5/6 dayanağı atandı mı?",
      "Zamanaşımı süreleri (10 yıl vb.) kontrol edildi mi?",
      "Açık rıza ile işlenen veriler ayrıştırıldı mı?"
    ]
  },
  {
    id: 4,
    title: "Katman 3: Retention Schedule",
    duration: "25 Dk",
    icon: "Calendar",
    description: "Saklama Süreleri Takvimi (İç Politika) oluşturma.",
    theory: [
      {
        title: "Schedule Nedir?",
        content: [
          "Kurumun veri saklama anayasasıdır. Hangi verinin ne zaman öleceğini belirleyen tablodur."
        ],
        bullets: [
          "Departman bazlı kırılım (HR, IT, Sales).",
          "Aktif Kullanım Süresi vs. Saklama (Arşiv) Süresi ayrımı.",
          "Yönetim Kurulu tarafından onaylanmış resmi belge niteliği."
        ]
      }
    ],
    practical: {
      scenario: "Finans departmanı faturaları ne kadar saklayacağını bilmiyor.",
      steps: [
        "1. Veri: Fatura.",
        "2. Amaç: Vergi denetimi ve ticari ispat.",
        "3. Takvim Kaydı: Aktif Kullanım (1 yıl) + Arşiv (9 yıl) = Toplam 10 yıl.",
        "4. Aksiyon: 10. yılın sonunda otomatik imha uyarısı."
      ],
      outcome: "Kurumsal Retention Schedule oluşturuldu ve intranet üzerinde yayınlandı."
    },
    checklist: [
      "Schedule yönetim tarafından onaylandı mı?",
      "Aktif ve Pasif süreler ayrıldı mı?",
      "İstisnalar (dava süreçleri vb.) tanımlandı mı?"
    ]
  },
  {
    id: 5,
    title: "Katman 4: Silme & İmha (SOP)",
    duration: "15 Dk",
    icon: "Trash2",
    description: "Veri yaşam döngüsünün sonu: Silme, Yok Etme, Anonimleştirme.",
    theory: [
      {
        title: "İmha Yöntemleri",
        content: [
          "Süre dolduğunda verinin geri getirilemez şekilde yok edilmesi gerekir."
        ],
        bullets: [
          "Mantıksal Silme (Logical Delete): Yazılım üzerinden erişimin kesilmesi.",
          "Fiziksel Silme (Purge/Wipe): Disk sektörlerinin üzerine yazma.",
          "Yedekten Silme (Backup Sanitation): En zor kısım. Yedeklerin rotasyon süresi ayarlanmalı.",
          "Anonimleştirme: Maskeleme değildir. Kişiyle bağın tamamen koparılmasıdır."
        ]
      }
    ],
    practical: {
      scenario: "Eski çalışan verilerinin silinmesi.",
      steps: [
        "1. Tetikleyici: İşten ayrılış tarihinden itibaren 10 yıl geçti.",
        "2. İşlem: HR sisteminden kaydı sil (Mantıksal).",
        "3. İşlem: Server yedeklerinden purge et (Fiziksel).",
        "4. İşlem: Fiziksel özlük dosyasını kağıt öğütücüden geçir."
      ],
      outcome: "Veri 'Yok Etme' yönetmeliğine uygun şekilde imha edildi."
    },
    checklist: [
      "Silme yöntemleri (soft/hard delete) belirlendi mi?",
      "Yedeklerden silme prosedürü var mı?",
      "Anonimleştirme teknikleri (k-anonymity vb.) biliniyor mu?"
    ]
  },
  {
    id: 6,
    title: "Katman 5: Denetim & Loglama",
    duration: "10 Dk",
    icon: "ShieldCheck",
    description: "Hesap verebilirlik (Accountability) ve ispat.",
    theory: [
      {
        title: "Sildiğini İspatla",
        content: [
          "KVKK ve GDPR'da 'sildim' demek yetmez, sildiğinizi kanıtlamanız gerekir. Bunun için log kayıtları tutulur."
        ],
        bullets: [
          "Kim sildi? (Actor)",
          "Ne zaman sildi? (Timestamp)",
          "Hangi veriyi sildi? (Object ID - Verinin kendisi değil!)",
          "Hangi yöntemle sildi? (Method)"
        ]
      }
    ],
    practical: {
      scenario: "Denetçi geldi ve 'Geçen yıl rızasını çeken müşterileri sildiniz mi?' diye sordu.",
      steps: [
        "1. Aksiyon: Log yönetim sistemini aç.",
        "2. Arama: 'Delete_User_Action' filtresi.",
        "3. Kanıt: 'User_ID_12345, 12.05.2023 tarihinde admin_user tarafından anonimleştirildi' kaydını göster."
      ],
      outcome: "Denetim başarıyla geçildi (Accountability)."
    },
    checklist: [
      "Silme işlemleri loglanıyor mu?",
      "Loglar değiştirilemez (immutable) şekilde saklanıyor mu?",
      "Periyodik (3-6 ay) iç denetim yapılıyor mu?"
    ]
  }
];

export const MISTAKES_QUIZ: QuizItem[] = [
  {
    id: 1,
    question: "Politikaya 'Veriler ihtiyaç bitene kadar saklanır' yazmak.",
    isMistake: true,
    explanation: "HATA: Bu ifade muğlaktır. Denetimde ceza sebebidir. Net süre (ör. 'Son işlemden itibaren 2 yıl') verilmelidir."
  },
  {
    id: 2,
    question: "Yasal zorunluluk gereği faturaları 10 yıl saklamak.",
    isMistake: false,
    explanation: "DOĞRU: TTK ve Vergi Usul Kanunu gereği finansal veriler için yasal süre 10 yıldır. Dayanak sağlamdır."
  },
  {
    id: 3,
    question: "Pazarlama rızası çekilse bile veriyi 'belki ilerde yine üye olur' diye yedekte tutmak.",
    isMistake: true,
    explanation: "HATA: Rıza geri çekildiği an veya makul en kısa sürede veri silinmeli/anonimleştirilmelidir. 'Belki' hukuki bir dayanak değildir."
  },
  {
    id: 4,
    question: "Veri işleyen (Processor) sözleşmesine 'İş bitiminde verileri sil' maddesi eklememek.",
    isMistake: true,
    explanation: "HATA: En sık yapılan hatalardan biridir. Tedarikçi veriyi sonsuza kadar tutabilir, sorumluluk sizdedir (Data Controller)."
  },
  {
    id: 5,
    question: "Tüm departman verilerini tek bir havuza atıp hepsine standart 5 yıl saklama süresi vermek.",
    isMistake: true,
    explanation: "HATA: Her veri kategorisinin amacı farklıdır. İK verisi 10 yıl, Log verisi 2 yıl olabilir. Ayrıştırılmalıdır."
  },
  {
    id: 6,
    question: "Silme işleminin log kaydını tutmak.",
    isMistake: false,
    explanation: "DOĞRU: Accountability (Hesap verebilirlik) ilkesi gereği silme işlemi ispatlanabilir olmalıdır."
  },
  {
    id: 7,
    question: "Anonimleştirme yerine veriyi sadece Excel'de gizlemek (Hide Columns).",
    isMistake: true,
    explanation: "HATA: Maskeleme veya gizleme anonimleştirme değildir. Veri geri getirilebiliyorsa o hala kişisel veridir."
  }
];

export const DEPARTMENTS = ["HR (İnsan Kaynakları)", "IT (Bilgi İşlem)", "Finance (Finans)", "Marketing (Pazarlama)", "Sales (Satış)"];
export const LEGAL_BASES = ["Kanuni Yükümlülük", "Sözleşmenin İfası", "Açık Rıza", "Meşru Menfaat", "Bir Hakkın Tesisi"];