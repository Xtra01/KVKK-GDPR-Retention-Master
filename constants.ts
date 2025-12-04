import { CourseModule, QuizItem } from './types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: "Kavramsal Temel & Pivot Mantık",
    duration: "25 Dk",
    icon: "BookOpen",
    description: "Retention (Saklama) kavramının hukuki, mantıksal ve operasyonel temelleri.",
    theory: [
      {
        title: "Retention Nedir ve Neden Hayatidir?",
        content: [
          "Veri saklama (retention), verilerin sonsuza dek değil, yalnızca belirli bir amaca hizmet ettiği sürece saklanması ve bu amaç ortadan kalktığında güvenli bir şekilde yok edilmesidir.",
          "Bu sadece bir IT işi değil, hukuki bir zorunluluktur. GDPR m.5(1)(e) ve KVKK m.4 'İşlendikleri amaç için gerekli olan süre kadar muhafaza edilme' ilkesini getirir.",
          "Kurumlar genellikle 'her şeyi saklayalım, belki lazım olur' yanılgısına düşer. Ancak retention politikası olmayan veri, kurum için bir varlık değil, patlamaya hazır bir 'toksik atık'tır. Gereksiz veri, sızıntı durumunda riski ve cezayı artırır."
        ],
        bullets: [
          "Amaçla Sınırlılık: Veriyi tutma sebebiniz (Örn: Fatura kesmek) bittiği an, veriyi tutma hakkınız da biter.",
          "Veri Minimizasyonu: Süreç için 'olmazsa olmaz' olmayan hiçbir veriyi saklamayın.",
          "Süre Belirleme: 'İhtiyaç bitene kadar' hukuken geçersizdir. 'Son işlemden itibaren 2 yıl' gibi ölçülebilir bir parametre şarttır."
        ]
      },
      {
        title: "Pivot Mantık (5 Kritik Soru)",
        content: [
          "Bir verinin saklanıp saklanmayacağına karar verirken her bir veri kalemi için şu 5 soruyu yanıtlayan bir matris oluşturmalısınız. Buna 'Pivot Mantık' diyoruz:"
        ],
        bullets: [
          "(i) Hangi amaçla tutuyorum? (Pazarlama mı, yasal zorunluluk mu?)",
          "(ii) Hangi hukuki dayanağa sahibim? (Kanun mu, açık rıza mı?)",
          "(iii) İş süresi + Saklama süresi ne kadar? (Aktif kullanım ne kadar sürecek, sonrasında arşivde ne kadar kalacak?)",
          "(iv) Hangi yöntemle sileceğim? (Geri döndürülemez şekilde silme mi, anonimleştirme mi?)",
          "(v) Sorumlu birim kim? (Bu verinin sahibi IT değil, veriyi üreten departmandır.)"
        ]
      }
    ],
    practical: {
      scenario: "Vaka Analizi: Büyük bir E-Ticaret sitesi, müşteri alışveriş geçmişi ve loglarını 'analiz yaparız' diye 10 yıldır tutuyor.",
      steps: [
        "1. Analiz: Şirket verileri 'belirsiz' bir amaçla (analiz) ve 'sonsuz' bir süreyle tutuyor. Bu GDPR ve KVKK'ya aykırıdır.",
        "2. Hukuki Kontrol: Log kayıtları için 5651 Sayılı Kanun 2 yıl süre öngörür. Alışveriş verisi için Ticaret Kanunu 10 yıl diyebilir. Ancak 'davranışsal analiz' verisi için meşru menfaat süresi çok daha kısadır (ör. 2 yıl).",
        "3. Aksiyon Planı: Veriler kategorize edilmeli. Yasal zorunluluk olanlar 10 yıl saklanmalı, ancak pazarlama amaçlı tutulan davranış verileri, müşteri 2 yıl boyunca pasifse anonimleştirilmelidir."
      ],
      outcome: "Sonuç: Şirket, 'her şeyi tut' politikasından 'amaç bazlı saklama' (purpose-based retention) modeline geçerek hem riski azalttı hem de veritabanı maliyetlerini %40 düşürdü."
    },
    checklist: [
      "Veri minimizasyonu ilkesi tüm departmanlarca benimsendi mi?",
      "'Süre yoksa uyum yoktur' prensibi yönetim tarafından kabul edildi mi?",
      "Her veri seti için 5 soruluk Pivot Mantık testi uygulandı mı?"
    ]
  },
  {
    id: 2,
    title: "Katman 1: Veri Envanteri",
    duration: "30 Dk",
    icon: "Database",
    description: "Kurumun 'Data Defensibility' duruşunun temeli ve haritalama.",
    theory: [
      {
        title: "Envanter: Savunma Hattınız",
        content: [
          "Veri envanteri, uyum sürecinin omurgasıdır. Hangi verinin nerede, hangi formatta ve kimin sorumluluğunda olduğunu bilmeden onu yönetemezsiniz.",
          "İyi bir envanter sadece bir Excel listesi değildir; kurumun 'Data Defensibility' (Veri Savunulabilirliği) duruşunu gösterir. Denetçi sorduğunda, verinin neden orada olduğunu bu envanter üzerinden kanıtlarsınız."
        ],
        bullets: [
          "Veri Kategorisi: Kimlik, İletişim, Finans, Sağlık vb.",
          "Veri Kaynağı: Veri doğrudan kişiden mi, 3. taraftan mı geliyor?",
          "İşleme Amacı ve Hukuki Sebebi: Her satırın bir gerekçesi olmalı.",
          "Saklama Ortamı: Sunucu, Bulut, Fiziksel Arşiv, Çalışan Laptopları."
        ]
      },
      {
        title: "Gölge IT (Shadow IT) Riski",
        content: [
          "Kurumların en büyük kör noktası 'Shadow IT'dir. Departmanların IT'den habersiz kullandığı Excel dosyaları, WhatsApp grupları veya yetkisiz bulut araçları envantere dahil edilmezse, retention politikanız kağıt üzerinde kalır.",
          "Envanter çalışması sırasında mutlaka departmanlarla birebir görüşülmeli ve yerel bilgisayarlarda tutulan 'gizli' arşivler ortaya çıkarılmalıdır."
        ],
        warning: "Envanter statik bir belge değildir. Her yeni süreçte güncellenmesi gereken yaşayan bir dokümandır."
      }
    ],
    practical: {
      scenario: "İK Departmanı Envanter Çalışması",
      steps: [
        "1. Kategori Belirleme: Özgeçmişler, Bordrolar, Sağlık Raporları, Performans Değerlendirmeleri.",
        "2. Kaynak Tespiti: Özgeçmişler LinkedIn ve Kariyer.net'ten, Sağlık raporları hastaneden geliyor.",
        "3. Eşleştirme & Süre: Özgeçmiş -> İşe Alım Süreci (Mülakat olumsuzsa 6 ay sakla, sil). Bordro -> Yasal Yükümlülük (10 yıl sakla).",
        "4. Risk Tespiti: İK müdürünün masaüstünde şifresiz duran 'Yedek_CVler.xlsx' dosyası tespit edildi ve sunucuya taşınıp şifrelendi."
      ],
      outcome: "Sahipsiz ve riskli veri kalmadı. Her veri kaleminin yaşam döngüsü belirlendi."
    },
    checklist: [
      "Tüm departmanlarla (HR, IT, Satış vb.) envanter görüşmesi yapıldı mı?",
      "Gölge IT (Shadow IT) verileri ve yerel Excel dosyaları tespit edildi mi?",
      "Veri kategorileri VERBİS/GDPR kayıtlarıyla uyumlu mu?"
    ]
  },
  {
    id: 3,
    title: "Katman 2: Hukuki Dayanak Matrisi",
    duration: "25 Dk",
    icon: "Scale",
    description: "Saklama sürelerinin hukuki meşruiyetini sağlama.",
    theory: [
      {
        title: "Dayanak Yoksa Saklama Yoktur",
        content: [
          "Retention süreleri keyfi belirlenemez. Her saklama süresi KVKK m.5/6 veya GDPR Art.6 maddelerine dayanmalıdır.",
          "En sık yapılan hata, hukuki dayanağı yanlış seçmektir. Örneğin, yasal zorunluluk gereği tutulan bir veriyi 'açık rıza' ile ilişkilendirmek yanlıştır; çünkü kişi rızasını çekerse veriyi silmeniz gerekir, oysa kanun saklamanızı emretmektedir."
        ],
        bullets: [
          "Kanunlarda Açıkça Öngörülmesi: Vergi Usul Kanunu, TTK, İş Kanunu. (Kesin süreler vardır, örn: 10 yıl)",
          "Sözleşmenin İfası: Sözleşme süresince + Zamanaşımı süresince (Genelde 10 yıl).",
          "Açık Rıza: Rıza geri çekildiği an saklama hakkı biter. (Pazarlama verileri).",
          "Meşru Menfaat: Zaruriyet ve ölçülülük testi yapılmalıdır. (Örn: Siber güvenlik logları)."
        ],
        warning: "DİKKAT: Meşru menfaati 'sonsuz saklama' bahanesi olarak kullanmak, denetimlerde en çok ceza yenen konulardan biridir."
      }
    ],
    practical: {
      scenario: "Pazarlama departmanı eski müşterilere e-posta atmaya devam etmek istiyor.",
      steps: [
        "1. Durum Analizi: Müşteri 3 yıldır alışveriş yapmamış.",
        "2. Dayanak Sorgusu: Sözleşme bitmiş. Açık rıza var mı? Hayır, müşteri 'iletişim iznini' iptal etmiş.",
        "3. Meşru Menfaat? Şirket 'eski müşterim' diyerek meşru menfaat iddia edebilir mi? Hayır, rıza geri çekildiği için bu dayanak çöker.",
        "4. Karar: Veri pazarlama listesinden derhal çıkarılmalı ve anonimleştirilmelidir."
      ],
      outcome: "Hukuki dayanak matrisi sayesinde riskli veriler temizlendi, olası bir şikayet ve ceza önlendi."
    },
    checklist: [
      "Her veri kategorisine doğru bir hukuki dayanak (KVKK m.5/6) atandı mı?",
      "Genel zamanaşımı süreleri (TBK 146 - 10 yıl) dikkate alındı mı?",
      "Açık rıza ile işlenen veriler, diğerlerinden teknik olarak ayrıştırıldı mı?"
    ]
  },
  {
    id: 4,
    title: "Katman 3: Retention Schedule",
    duration: "40 Dk",
    icon: "Calendar",
    description: "Kurumsal Saklama Süreleri Takvimi (İç Politika) oluşturma.",
    theory: [
      {
        title: "Schedule: Kurumun Anayasası",
        content: [
          "Retention Schedule, kurumun hangi veriyi ne kadar tutacağını gösteren resmi belgedir. Yönetim kurulu tarafından onaylanmalı ve tüm çalışanlara tebliğ edilmelidir.",
          "Bu tablo statik bir süre değil, bir 'tetikleyici' mantığı içermelidir. Süre ne zaman başlar? (Örn: Sözleşme bittiğinde mi, yıl sonunda mı?)"
        ],
        bullets: [
          "Kırılım: Departman -> Süreç -> Veri Kategorisi.",
          "Aktif Kullanım vs. Arşiv Süresi: Veri ofiste ne kadar kalacak, soğuk depoda (arşivde) ne kadar kalacak?",
          "İmha Aksiyonu: Süre dolunca ne olacak? (Otomatik silme mi, yönetici onayıyla silme mi?)"
        ]
      },
      {
        title: "Legal Hold (Delil Saklama) İstisnası",
        content: [
          "Bir dava veya soruşturma başladığında, ilgili veriler için retention süresi durur (suspended). Buna 'Legal Hold' denir.",
          "Otomatik silme sistemleri, 'Legal Hold' etiketli verileri silmemelidir. Aksi takdirde delil karartma suçu oluşabilir."
        ]
      }
    ],
    practical: {
      scenario: "Finans departmanı için Fatura Saklama Politikası",
      steps: [
        "1. Veri Tipi: Satış Faturaları.",
        "2. Amaç: Vergi denetimi ve ticari uyuşmazlık ispatı.",
        "3. Takvim Kaydı: Aktif Kullanım (Cari yıl + 1 yıl ofiste) + Arşiv (9 yıl soğuk depoda) = Toplam 10 yıl.",
        "4. Tetikleyici: Fatura tarihini takip eden takvim yılı başından itibaren.",
        "5. Aksiyon: 10. yılın sonunda sistem otomatik uyarı verir, Finans Müdürü onayıyla imha edilir."
      ],
      outcome: "Kurumsal Retention Schedule oluşturuldu, intranet üzerinde yayınlandı ve ERP sistemine kural olarak girildi."
    },
    checklist: [
      "Schedule yönetim kurulu tarafından imzalanıp onaylandı mı?",
      "Aktif ve Pasif (Arşiv) süre ayrımları yapıldı mı?",
      "Dava süreçleri için 'Legal Hold' mekanizması tanımlandı mı?"
    ]
  },
  {
    id: 5,
    title: "Katman 4: Silme, İmha ve SOP",
    duration: "35 Dk",
    icon: "Trash2",
    description: "Veri yaşam döngüsünün sonu: Silme, Yok Etme, Anonimleştirme Teknikleri.",
    theory: [
      {
        title: "Güvenli İmha Yöntemleri",
        content: [
          "Süre dolduğunda verinin 'geri getirilemez' şekilde yok edilmesi gerekir. Çöp kutusuna atmak veya 'delete' tuşuna basmak (soft delete) yeterli değildir."
        ],
        bullets: [
          "Mantıksal Silme (Logical Delete): Veritabanında verinin üzerine null yazılması veya erişim anahtarlarının yok edilmesi.",
          "Fiziksel Silme (Purge/Wipe): Disk sektörlerinin üzerine 0 ve 1'ler yazılarak verinin okunamaz hale getirilmesi (Wiping).",
          "Fiziksel Yok Etme: Kağıtların kıyılması (shredding), disklerin degaussing (manyetik bozma) ile imhası.",
          "Anonimleştirme: Verinin kişiyle bağının tamamen koparılması. (DİKKAT: Maskeleme anonimleştirme değildir!)"
        ]
      },
      {
        title: "Yedeklerden Silme (Backup Sanitation) Sorunu",
        content: [
          "Canlı sistemden veriyi sildiniz, peki ya yedekler? Yedek kartuşlarında veriler yıllarca kalabilir.",
          "GDPR uyumu için 'Backup Rotation' politikanız olmalıdır. Örneğin, yedekleriniz 1 yıl sonra üzerine yazılıyorsa, silinen bir veri en geç 1 yıl sonra yedeklerden de kaybolacaktır. Bu süreci prosedüre (SOP) yazmalısınız."
        ]
      }
    ],
    practical: {
      scenario: "Eski çalışan verilerinin ve laptopunun imhası.",
      steps: [
        "1. Tetikleyici: İşten ayrılış tarihinden itibaren yasal 10 yıllık süre doldu.",
        "2. Dijital İmha: HR yazılımından kaydı sil (Mantıksal). Server yedeklerinden purge edilmesini bekle (Rotasyon).",
        "3. Fiziksel İmha: Özgeçmiş ve imzalı tutanakların olduğu fiziksel dosya, P-4 güvenlik seviyesindeki kağıt öğütücüden geçirildi.",
        "4. Cihaz İmhası: Eski çalışanın kullandığı ve depoya kaldırılan laptop diski 'Wiping' yazılımı ile temizlendi."
      ],
      outcome: "'Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik'e tam uyum sağlandı."
    },
    checklist: [
      "Hangi verinin hangi yöntemle (silme/anonimleştirme) yok edileceği belirlendi mi?",
      "Yedeklerden silme (Backup Sanitation) prosedürü yazılı hale getirildi mi?",
      "Fiziksel imha tutanakları (Örn: Kağıt imha tutanağı) hazırlanıyor mu?"
    ]
  },
  {
    id: 6,
    title: "Katman 5: Denetim & Loglama",
    duration: "20 Dk",
    icon: "ShieldCheck",
    description: "Hesap verebilirlik (Accountability) ilkesi ve ispat yükümlülüğü.",
    theory: [
      {
        title: "Sildiğini İspatla",
        content: [
          "KVKK ve GDPR'da 'biz sildik' beyanı yeterli değildir. Sildiğinizi kanıtlamanız gerekir. İşte burada Log Yönetimi devreye girer.",
          "İmha logları, silinen verinin kendisini içermemelidir! Sadece 'ne zaman, kim tarafından, hangi veri ID'si' silindi bilgisini içermelidir."
        ],
        bullets: [
          "Actor: İşlemi kim yaptı? (Sistem/Admin)",
          "Timestamp: Tam tarih ve saat.",
          "Object ID: Silinen kaydın benzersiz numarası (Verinin içeriği değil!).",
          "Action: Silme / Anonimleştirme / Yok Etme."
        ]
      },
      {
        title: "Periyodik Denetimler",
        content: [
          "Retention politikası bir kez yazılıp bırakılmaz. 6 ayda veya yılda bir 'İmha Denetimi' yapılmalıdır. Süresi dolan veriler gerçekten silinmiş mi kontrol edilmelidir."
        ]
      }
    ],
    practical: {
      scenario: "Kurula şikayet eden eski müşteri: 'Verilerimi sildiklerini söylüyorlar ama inanmıyorum'.",
      steps: [
        "1. İspat Talebi: Kurul, şirketten silme kanıtı ister.",
        "2. Log İnceleme: Şirket log yönetim sisteminden 'Delete_Action' raporunu çeker.",
        "3. Kanıt Sunumu: 'User_ID_9988, 12.05.2023 tarihinde 14:30'da sistem tarafından otomatik olarak anonimleştirilmiştir' log kaydı Kurul'a sunulur.",
        "4. Sonuç: Şirket, Accountability ilkesini yerine getirdiği için ceza almaz."
      ],
      outcome: "Güçlü loglama altyapısı sayesinde şirket idari para cezasından kurtulur."
    },
    checklist: [
      "Silme ve imha işlemleri değiştirilemez (immutable) loglarda tutuluyor mu?",
      "Log kayıtlarının içinde kişisel veri kalmadığından emin olundu mu?",
      "Yılda en az bir kez 'Retention Audit' yapılıyor mu?"
    ]
  }
];

export const MISTAKES_QUIZ: QuizItem[] = [
  {
    id: 1,
    question: "Politikaya 'Veriler ihtiyaç bitene kadar saklanır' yazmak.",
    isMistake: true,
    explanation: "HATA: Bu ifade muğlaktır ve hukuken geçersizdir. Denetimde ceza sebebidir. Net, ölçülebilir bir süre (ör. 'Son işlemden itibaren 2 yıl') verilmelidir."
  },
  {
    id: 2,
    question: "Yasal zorunluluk gereği faturaları 10 yıl saklamak.",
    isMistake: false,
    explanation: "DOĞRU: TTK ve Vergi Usul Kanunu gereği finansal veriler için yasal süre 10 yıldır. Bu sağlam bir hukuki dayanaktır."
  },
  {
    id: 3,
    question: "Pazarlama rızası çekilse bile veriyi 'belki ilerde yine üye olur' diye yedekte tutmak.",
    isMistake: true,
    explanation: "HATA: Rıza geri çekildiği an veya makul en kısa sürede (örn. bir sonraki periyodik imhada) veri silinmeli/anonimleştirilmelidir. 'Belki' hukuki bir dayanak değildir."
  },
  {
    id: 4,
    question: "Veri işleyen (Processor - örn: Bulut sağlayıcı veya Çağrı Merkezi) sözleşmesine 'İş bitiminde verileri sil' maddesi eklememek.",
    isMistake: true,
    explanation: "KRİTİK HATA: En sık yapılan hatalardan biridir. Sözleşmede açıkça yazmazsa tedarikçi veriyi silmeyebilir ve Veri Sorumlusu (Siz) cezayı ödersiniz."
  },
  {
    id: 5,
    question: "Tüm departman verilerini tek bir havuza atıp hepsine standart 5 yıl saklama süresi vermek.",
    isMistake: true,
    explanation: "HATA: Her veri kategorisinin amacı ve tabi olduğu kanun farklıdır. İK verisi 10 yıl, Log verisi 2 yıl, Kamera kaydı 1 ay olabilir. Ayrıştırılmalıdır."
  },
  {
    id: 6,
    question: "Silme işleminin log kaydını tutmak.",
    isMistake: false,
    explanation: "DOĞRU: Accountability (Hesap verebilirlik) ilkesi gereği silme işlemi ispatlanabilir olmalıdır."
  },
  {
    id: 7,
    question: "Anonimleştirme yerine veriyi sadece Excel'de gizlemek (Hide Columns) veya erişimi kısıtlamak.",
    isMistake: true,
    explanation: "HATA: Maskeleme veya gizleme anonimleştirme değildir. Veri teknik bir müdahale ile geri getirilebiliyorsa o hala kişisel veridir ve saklama süresi ihlali devam eder."
  },
  {
    id: 8,
    question: "Dava konusu olan (Legal Hold) verileri, saklama süresi dolduğu için otomatik silme sistemiyle imha etmek.",
    isMistake: true,
    explanation: "HATA: Dava veya soruşturma başladığında, ilgili veriler için saklama süresi durur. Bu veriler silinirse 'delil karartma' suçu oluşabilir."
  },
  {
    id: 9,
    question: "Yedek (Backup) sistemlerinin 1 yıl içinde kendi kendini üzerine yazacak şekilde (Rotation) ayarlanması.",
    isMistake: false,
    explanation: "DOĞRU: Yedeklerden anlık silme yapmak teknik olarak zordur. Yedek rotasyon süresi belirlemek ve bunu politikaya yazmak kabul edilebilir bir yöntemdir."
  },
  {
    id: 10,
    question: "Veriyi silmek yerine, veritabanında 'deleted_at' kolonuna tarih atıp veriyi tutmaya devam etmek (Soft Delete).",
    isMistake: true,
    explanation: "HATA (Koşullu): Eğer bu veri sistemde hala okunabilir durumdaysa ve erişilebiliyorsa, bu gerçek bir imha değildir. GDPR 'Put beyond use' (kullanım dışı bırakma) ister. Soft delete sonrası belirli periyotlarla 'Hard Delete' yapılmalıdır."
  }
];

export const DEPARTMENTS = ["HR (İnsan Kaynakları)", "IT (Bilgi İşlem)", "Finance (Finans)", "Marketing (Pazarlama)", "Sales (Satış)", "Legal (Hukuk)"];
export const LEGAL_BASES = ["Kanuni Yükümlülük", "Sözleşmenin İfası", "Açık Rıza", "Meşru Menfaat", "Bir Hakkın Tesisi", "Fiili İmkansızlık"];