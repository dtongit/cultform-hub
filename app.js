/* ==========================================================================
   CULTFORM Presentation Website - JavaScript Logic & Bilingual Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Current active language: 'ru' or 'tr'
  let currentLang = 'ru';

  // Complete Bilingual Dictionary (RU & TR) - RU is the source of truth
  const translations = {
    ru: {
      page_title: "CULTFORM — AI-Driven 3D Production & Micro-Factories Hub",
      meta_desc: "Цифровое контрактное производство и 3D-печать от CAD до серии за 4 дня без затрат на пресс-формы. Микро-фабрики в Турции и России.",

      nav_problem: "Проблема",
      nav_solution: "Решение",
      nav_process: "Процесс",
      nav_hubs: "Хабы",
      nav_products: "Продукция",
      nav_materials: "Материалы",
      nav_roadmap: "Стратегия",
      nav_rfq_btn: "Запросить расчет",

      hero_badge: "AI-Driven 3D Production | Micro-Factories Hub",
      hero_title: "Цифровое производство и 3D-печать.",
      hero_subtitle: "Умная фабрика нового поколения: от AI-идеи до серийного производства для вашего бренда за 4 дня.",
      hero_cta_primary: "Запросить расчет серии",
      hero_cta_secondary: "Каталог продукции",

      stat1_val: "96 ч",
      stat1_lbl: "Скорость от идеи до готовой серии",
      stat2_val: "$0",
      stat2_lbl: "Затраты на пресс-формы и оснастку",
      stat3_val: "10–1k",
      stat3_lbl: "Оптимальный размер партии (шт)",
      stat4_val: "-40%",
      stat4_lbl: "Сокращение R&D-бюджета",

      hero_visual_sub: "CULTFORM AI MICRO-FACTORY NETWORK",
      hero_visual_title: "Топологическая оптимизация & FDM/SLS Комплекс",

      problem_tag: "Сравнение технологий",
      problem_title: "AI + 3D-печать: новая эра быстрых мощностей",

      prob_card_title: "Традиционное производство",
      prob1_title: "Дорогой старт",
      prob1_desc: "от $15 000 за пресс-формы и 3 месяца ожидания.",
      prob2_title: "Замороженный капитал",
      prob2_desc: "минимальный заказ от 5 000 шт. на склад.",
      prob3_title: "Цена ошибки",
      prob3_desc: "любой дефект в чертеже — списанный бюджет и старт с нуля.",

      sol_tag: "Преимущество CULTFORM",
      sol_title: "Умная фабрика CULTFORM",
      sol_sub: "Закрываем потребность в мелких и средних сериях (от 10 до 1 000 штук) через связку AI + 3D-печать.",

      sol1_title: "$0 на оборудование",
      sol1_desc: "оплата только готовых изделий без вложений в формы.",
      sol2_title: "Отгрузка за 4 дня",
      sol2_desc: "от AI-модели до готовой партии — 96 часов.",
      sol3_title: "Правки за 1 час",
      sol3_desc: "мгновенные изменения конструкции без финансовых рисков.",

      flow_s1: "Ваша 3D-модель / Задача",
      flow_s2: "AI-Инжиниринг CULTFORM",
      flow_s3: "Готовая партия у вас через 4 дня",

      proc_tag: "Производственный цикл",
      proc_title: "Прозрачный процесс от цифры к объекту",
      proc_sub: "Четыре этапа высокоточного производства с полным контролем качества по стандарту ISO.",

      proc1_title: "AI-Дизайн и Концепт",
      proc1_desc: "Превращаем текстовое описание, эскиз или задачу в идеальную 3D-модель за несколько минут с помощью алгоритмов Generative AI.",
      proc2_title: "Умная Логистика",
      proc2_desc: "Цифровой файл мгновенно отправляется на ближайший к вам хаб (Турция или РФ) для максимального сокращения сроков и стоимости доставки.",
      proc3_title: "Автоматизированная Печать",
      proc3_desc: "Запускаем партию на парке скоростных печатных комплексов. Выполняем заказы от 10 до 1 000 штук за 24–48 часов.",
      proc4_title: "Контроль и Доставка",
      proc4_desc: "Проверяем геометрию и прочность каждого изделия, бережно упаковываем и доставляем курьером прямо к вашей двери за 96 часов.",

      log_tag: "География & Логистика",
      log_title: "Стратегия Micro-Factories: производство у клиента",
      log_sub: "Вместо перевозки готового пластика через границы мы масштабируем физические печатные мощности под локальный спрос.",

      hub_ru_title: "Цех в России (Ростов-на-Дону)",
      hub_ru_badge: "Внутренний рынок",
      hub_ru_desc: "Работает на российский сбыт, обеспечивая быструю локальную печать и оперативные поставки.",
      hub_tr_title: "Цех в Турции (Анталья)",
      hub_tr_badge: "Локальный рынок",
      hub_tr_desc: "Ориентирован на местное турецкое производство и оперативное обслуживание локального рынка.",
      hub_mf_title: "Глобальное масштабирование",
      hub_mf_badge: "Глобальное масштабирование",
      hub_mf_desc: "Будущие цеха в разных странах Европы, Азии и Америки будут запускаться непосредственно на местах для работы на локальные рынки.",

      prod_tag: "Продуктовая матрица",
      prod_title: "Что мы производим для вашего бизнеса",
      prod_sub: "От корпусов электроники до сложной промышленной оснастки для сборки.",

      p1_cat: "CONTRACT MANUFACTURING",
      p1_title: "Корпуса IoT-датчиков и приборов",
      p1_desc: "Защитные кожухи, компактные корпуса электроники и корпусные элементы медицинского оборудования.",
      p1_what: "Что делаем",
      p1_what_val: "Корпуса IoT-датчиков, приборов, медицинских устройств",
      p1_who: "Кому нужно",
      p1_who_val: "Разработчики электроники, Медтех-стартапы",

      p2_cat: "WHITE-LABEL / CTM",
      p2_title: "Предметный дизайн и интерьерный декор",
      p2_desc: "Дизайнерские светильники, вазы, архитектурные органайзеры, мебельная фурнитура и премиальный мерч.",
      p2_what_val: "Вазы, интерьерный свет, настольные аксессуары, CTM-коллекции",
      p2_who_val: "D2C-бренды, дизайнеры интерьера, ритейл-сети, шоурумы",

      p3_cat: "DIGITAL WAREHOUSE",
      p3_title: "Запасные части и компоненты (Spare Parts)",
      p3_desc: "Шестерни, форсунки, кронштейны, переходники и износостойкие детали для ликвидации простоя линий.",
      p3_what_val: "Шестерни, форсунки, кронштейны, детали оборудования",
      p3_who_val: "Промышленные фабрики и заводы",

      p4_cat: "TOOLING & JIGS",
      p4_title: "Промышленная оснастка и кондукторы",
      p4_desc: "Кондукторы для сверления, шаблоны сборки, ложементы и контрольные калибры.",
      p4_what_val: "Кондукторы для сверления, ложементы, шаблоны",
      p4_who_val: "Автопром, Сборочные цеха",

      mat_tag: "Инженерные полимеры",
      mat_title: "Материалы под задачи вашего бизнеса",
      mat_sub: "Подбираем пластик строго под условия эксплуатации: агрессивная среда, высокие нагрузки, уличные условия.",

      m1_code: "PETG / ABS / ASA",
      m1_title: "Ударопрочные и уличные пластики",
      m1_desc: "Не боятся воды, падений, бытовой химии и не выгорают под прямым ультрафиолетом.",
      m1_uses: "Применение: Декор, корпуса приборов, авто-аксессуары.",

      m2_code: "PETG-CF / PA-CF",
      m2_title: "Композиты с углеволокном (Карбон)",
      m2_desc: "Максимальная жесткость, матовая премиальная фактура, сверхлегкий вес. Прямая альтернатива алюминию.",
      m2_uses: "Применение: Прочные рамы БПЛА/дронов, нагруженные кронштейны, шестерни.",

      m3_code: "TPU Polymers",
      m3_title: "Гибкие и эластичные полимеры",
      m3_desc: "Гнутся, амортизируют удары, растягиваются и восстанавливают форму (полный аналог резины и силикона).",
      m3_uses: "Применение: Ручки инструмента, уплотнители, демпферы, бамперы.",

      road_tag: "Стратегия развития",

      r1_status: "Текущий этап",
      r1_phase: "Фаза 1: Тест и быстрое B2B-движение (Текущий этап)",
      r1_b1_title: "Запуск на парке FDM-принтеров (Creality Ender 3 V3):",
      r1_b1_desc: "Быстрое разворачивание мощностей с минимальным CapEx для мелкосерийного производства и R&D.",
      r1_b2_title: "Валидация спроса и пилотные B2B-контракты:",
      r1_b2_desc: "Отработка корпоративных гипотез, изготовление оснастки, корпусов и элементов оборудования для локального бизнеса.",
      r1_b3_title: "Оцифровка и формирование базы:",
      r1_b3_desc: "Создание библиотеки AI-моделей и готового каталога проверенных SKU для быстрой продажи по модели White-Label и повторных B2B заказов.",

      r2_status: "Месяцы 6–18",
      r2_phase: "Фаза 2: Промышленный AM-хаб и CapEx-масштабирование (Месяцы 6–18)",
      r2_b1_title: "Запуск собственного AM-хаба:",
      r2_b1_desc: "Привлечение раунда / лизинг и запуск промышленных SLS / MJF установок для серийного производства.",
      r2_b2_title: "Экономика масштаба:",
      r2_b2_desc: "Снижение себестоимости печати до 40% за счет высокой загрузки промышленных мощностей.",
      r2_b3_title: "Географический рост:",
      r2_b3_desc: "Выход на прямые контракты с промышленными предприятиями и заводами Европы и Турции.",

      r3_status: "Месяцы 18–36",
      r3_phase: "Фаза 3: Сеть цифровых фабрик и интеграция (Месяцы 18–36)",
      r3_b1_title: "Экспансия в регион GCC:",
      r3_b1_desc: "Выход на рынки ОАЭ и Саудовской Аравии, развертывание локальных микро-фабрик.",
      r3_b2_title: "Платформенная интеграция:",
      r3_b2_desc: "Включение мощностей в международные RFQ-системы (Xometry, Hubs).",
      r3_b3_title: "Автономная экосистема:",
      r3_b3_desc: "Переход на модель «заказчик - нейросеть - микрофабрика» с минимальным участием человека в распределении заказов.",

      cta_title: "Готовы запустить серию за 96 часов?",
      cta_sub: "Отправьте 3D-модель или текстовое описание задачи. Наш AI-инженер рассчитает стоимость и сроки за 15 минут.",
      cta_btn: "Рассчитать стоимость проекта",

      modal_title: "Запрос расчета проекта",
      modal_sub: "Заполните форму и наши инженеры свяжутся с вами в течение 15 минут.",
      lbl_name: "Ваше имя / Компания",
      ph_name: "Алексей / TechDevice LLC",
      lbl_contact: "Email или Телефон / WhatsApp",
      ph_contact: "contact@company.com",
      lbl_cat: "Категория изделия",
      opt_cat1: "Contract Manufacturing (Корпуса IoT/Приборов)",
      opt_cat2: "White-Label / СТМ (Аксессуары/Органайзеры)",
      opt_cat3: "Digital Warehouse (Запасные части/Шестерни)",
      opt_cat4: "Tooling & Jigs (Промышленная оснастка/Кондукторы)",
      lbl_qty: "Планируемый тираж (шт)",
      lbl_notes: "Описание задачи или ссылка на 3D-модель",
      ph_notes: "Габариты, требования к прочности, условия эксплуатации...",
      btn_submit: "Отправить заявку",
      submit_success: "Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.",

      footer_brand_desc: "AI-Driven 3D Production & Micro-Factories Network. On-demand digital manufacturing across EU, GCC, and CIS markets.",
      footer_nav_title: "Навигация",
      footer_prod_title: "Продукция",
      footer_hubs_title: "Операционные хабы",
      footer_hub_tr: "Стамбул, Турция (EU & GCC)",
      footer_hub_ru: "Москва, Россия (CIS)",
      footer_copy: "© 2026 CULTFORM Inc. All rights reserved.",
      footer_tagline: "Серийное цифровое контрактное производство 3D-печати"
    },
    tr: {
      page_title: "CULTFORM — Yapay Zeka Destekli 3D Üretim ve Mikro Fabrika Ağı",
      meta_desc: "CAD çiziminden 4 günde seri üretime çelik kalıp maliyeti olmadan dijital fason üretim ve 3D baskı. Türkiye ve Rusya'da mikro fabrikalar.",

      nav_problem: "Sorun",
      nav_solution: "Çözüm",
      nav_process: "Süreç",
      nav_hubs: "Merkezler",
      nav_products: "Ürünler",
      nav_materials: "Malzemeler",
      nav_roadmap: "Strateji",
      nav_rfq_btn: "Teklif Al",

      hero_badge: "Yapay Zeka Destekli 3D Üretim | Mikro Fabrika Ağı",
      hero_title: "Dijital üretim ve 3D baskı.",
      hero_subtitle: "Yeni nesil akıllı fabrika: Yapay zeka fikrinden markanız için 4 günde seri üretime.",
      hero_cta_primary: "Seri Üretim Teklifi Al",
      hero_cta_secondary: "Ürün Kataloğu",

      stat1_val: "96 sa",
      stat1_lbl: "Fikirden hazır seriye ulaşma hızı",
      stat2_val: "$0",
      stat2_lbl: "Kalıp ve aparat maliyetleri",
      stat3_val: "10–1k",
      stat3_lbl: "Optimum parti boyutu (adet)",
      stat4_val: "-40%",
      stat4_lbl: "Ar-Ge bütçesinde tasarruf",

      hero_visual_sub: "CULTFORM AI MİKRO-FABRİKA AĞI",
      hero_visual_title: "Topolojik Optimizasyon & FDM/SLS Kompleksi",

      problem_tag: "Teknoloji Karşılaştırması",
      problem_title: "AI + 3D Baskı: Hızlı Kapasitelerin Yeni Çağı",

      prob_card_title: "Geleneksel Üretim",
      prob1_title: "Pahalı Başlangıç",
      prob1_desc: "Kalıplar için 15.000$'dan başlayan maliyet ve 3 ay bekleme süresi.",
      prob2_title: "Dondurulmuş Sermaye",
      prob2_desc: "Depo için en az 5.000 adetlik minimum sipariş.",
      prob3_title: "Hata Maliyeti",
      prob3_desc: "Çizimdeki her kusur — çöpe giden bütçe ve sıfırdan başlangıç.",

      sol_tag: "CULTFORM Avantajı",
      sol_title: "CULTFORM Akıllı Fabrikası",
      sol_sub: "Üretken Yapay Zeka + 3D baskı bileşimi ile küçük ve orta ölçekli seri (10 ila 1.000 adet) ihtiyacını karşılıyoruz.",

      sol1_title: "Ekipman İçin $0",
      sol1_desc: "Kalıplara yatırım yapmadan sadece bitmiş ürünler için ödeme.",
      sol2_title: "4 Günde Teslimat",
      sol2_desc: "Yapay zeka modelinden hazır partiye — 96 saat.",
      sol3_title: "1 Saatte Düzeltme",
      sol3_desc: "Finansal risk olmadan anında konstrüksiyon değişiklikleri.",

      flow_s1: "3D Modeliniz / Görev",
      flow_s2: "CULTFORM Yapay Zeka Mühendisliği",
      flow_s3: "Hazır parti 4 gün içinde sizde",

      proc_tag: "Üretim Döngüsü",
      proc_title: "Dijital Veriden Fiziksel Nesneye Şeffaf Süreç",
      proc_sub: "ISO standardında tam kalite kontrolü ile dört aşamalı yüksek hassasiyetli üretim.",

      proc1_title: "Yapay Zeka Tasarımı ve Konsept",
      proc1_desc: "Üretken Yapay Zeka algoritmaları ile metin açıklamasını, taslağı veya görevi birkaç dakika içinde mükemmel bir 3D modele dönüştürüyoruz.",
      proc2_title: "Akıllı Lojistik",
      proc2_desc: "Teslimat süresini ve maliyetini en aza indirmek için dijital dosya anında size en yakın merkeze (Türkiye veya Rusya) gönderilir.",
      proc3_title: "Otomatik Baskı",
      proc3_desc: "Yüksek hızlı baskı kompleksleri parkında partiyi başlatıyoruz. 10 ila 1.000 adet arasındaki siparişleri 24–48 saat içinde tamamlıyoruz.",
      proc4_title: "Kontrol ve Teslimat",
      proc4_desc: "Her ürünün geometrisini ve dayanıklılığını kontrol ediyor, özenle paketliyor ve 96 saat içinde kurye ile doğrudan kapınıza teslim ediyoruz.",

      log_tag: "Coğrafya ve Lojistik",
      log_title: "Micro-Factories Stratejisi: Müşterinin Yanında Üretim",
      log_sub: "İşlenmiş plastiği sınırlar ötesine taşımak yerine, fiziksel baskı kapasitelerini yerel talebe göre ölçeklendiriyoruz.",

      hub_ru_title: "Rusya Atölyesi (Rostov-na-Donu)",
      hub_ru_badge: "İç Pazar",
      hub_ru_desc: "Rusya pazarına hizmet vererek hızlı yerel baskı ve operasyonel teslimat sağlar.",
      hub_tr_title: "Türkiye Atölyesi (Antalya)",
      hub_tr_badge: "Yerel Pazar",
      hub_tr_desc: "Yerel Türkiye üretimine ve yerel pazarın hızlı hizmet almasına odaklanmıştır.",
      hub_mf_title: "Küresel Ölçeklendirme",
      hub_mf_badge: "Küresel Ölçeklendirme",
      hub_mf_desc: "Avrupa, Asya ve Amerika'nın farklı ülkelerindeki gelecekteki atölyeler, yerel pazarlara hizmet etmek üzere doğrudan sahada kurulacaktır.",

      prod_tag: "Ürün Matrisi",
      prod_title: "İşletmeniz İçin Ne Üretiyoruz?",
      prod_sub: "Elektronik kasalarından karmaşık montaj sanayi aparatlarına kadar.",

      p1_cat: "FASON ÜRETİM",
      p1_title: "IoT Sensör ve Cihaz Kasaları",
      p1_desc: "Koruyucu kılıflar, kompakt elektronik kasaları ve tıbbi cihaz gövde elemanları.",
      p1_what: "Ne üretiyoruz",
      p1_what_val: "IoT sensör kasaları, cihazlar, tıbbi cihazlar",
      p1_who: "Kime gerekli",
      p1_who_val: "Elektronik geliştiricileri, Medtek girişimleri",

      p2_cat: "WHITE-LABEL / ÖZEL MARKA",
      p2_title: "Ürün Tasarımı ve İç Mekan Dekoru",
      p2_desc: "Tasarım aydınlatmalar, vazolar, mimari düzenleyiciler, mobilya aksesuarları ve premium ürünler.",
      p2_what_val: "Vazolar, iç mekan aydınlatması, masaüstü aksesuarları, özel marka koleksiyonları",
      p2_who_val: "D2C markaları, iç mimarlar, perakende zincirleri, showroomlar",

      p3_cat: "DİJİTAL DEPO",
      p3_title: "Yedek Parçalar ve Bileşenler (Spare Parts)",
      p3_desc: "Hat duruşlarını ortadan kaldırmak için dişliler, nozullar, braketler, adaptörler ve aşınmaya dayanıklı parçalar.",
      p3_what_val: "Dişliler, nozullar, braketler, ekipman parçaları",
      p3_who_val: "Endüstriyel fabrikalar ve tesisler",

      p4_cat: "SANAYİ APARATLARI & KALIPLAR",
      p4_title: "Endüstriyel Aparatlar ve Delme Şablonları",
      p4_desc: "Delme şablonları, montaj kalıpları, sabitleme yuvaları ve kontrol kalibreleri.",
      p4_what_val: "Delme şablonları, sabitleme yuvaları, kalıplar",
      p4_who_val: "Otomotiv sanayi, Montaj atölyeleri",

      mat_tag: "Mühendislik Polimerleri",
      mat_title: "İşinizin İhtiyaçlarına Uygun Malzemeler",
      mat_sub: "Plastiği doğrudan kullanım koşullarına göre seçiyoruz: agresif ortamlar, yüksek yükler, dış mekan koşulları.",

      m1_code: "PETG / ABS / ASA",
      m1_title: "Darbeye ve Dış Mekana Dayanıklı Plastikler",
      m1_desc: "Sudan, düşmelerden, evsel kimyasallardan etkilenmez ve doğrudan ultraviyole altında solmaz.",
      m1_uses: "Uygulama: Dekor, cihaz kasaları, oto aksesuarları.",

      m2_code: "PETG-CF / PA-CF",
      m2_title: "Karbon Fiber Kompozitler (Karbon)",
      m2_desc: "Maksimum rijitlik, mat premium doku, ultra hafif ağırlık. Alüminyuma doğrudan alternatif.",
      m2_uses: "Uygulama: Dayanıklı İHA/dron gövdeleri, yüklü braketler, dişliler.",

      m3_code: "TPU Polymers",
      m3_title: "Esnek ve Elastik Polimerler",
      m3_desc: "Bükülür, darbeleri emer, esner ve şeklini geri kazanır (kauçuk ve silikonun tam muadili).",
      m3_uses: "Uygulama: Alet sapları, contalar, sönümleyiciler, tamponlar.",

      road_tag: "Gelişim Stratejisi",

      r1_status: "Mevcut Aşama",
      r1_phase: "Aşama 1: Test ve Hızlı B2B İlerleme (Mevcut Aşama)",
      r1_b1_title: "FDM Yazıcı Filosu Kurulumu (Creality Ender 3 V3):",
      r1_b1_desc: "Küçük seri üretim ve Ar-Ge için minimum CapEx ile hızlı kapasite dağıtımı.",
      r1_b2_title: "Talep Doğrulama ve Pilot B2B Sözleşmeleri:",
      r1_b2_desc: "Kurumsal hipotezlerin test edilmesi, yerel işletmeler için kalıp, gövde ve ekipman elemanlarının üretimi.",
      r1_b3_title: "Dijitalleşme ve Veri Tabanı Oluşturma:",
      r1_b3_desc: "White-Label modeli ve tekrarlayan B2B siparişleri için AI model kütüphanesi ve SKU kataloğu oluşturulması.",

      r2_status: "6–18. Aylar",
      r2_phase: "Aşama 2: Endüstriyel AM Merkezi ve CapEx Ölçekleme (6–18 Ay)",
      r2_b1_title: "Kendi AM Merkezimizin Kurulması:",
      r2_b1_desc: "Seri üretim için yatırım/finansal kiralama ile endüstriyel SLS / MJF sistemlerinin kurulumu.",
      r2_b2_title: "Ölçek Ekonomisi:",
      r2_b2_desc: "Endüstriyel kapasitelerin yüksek kullanımı sayesinde baskı birim maliyetinde %40'a varan düşüş.",
      r2_b3_title: "Coğrafi Büyüme:",
      r2_b3_desc: "Avrupa ve Türkiye'deki sanayi kuruluşları ve fabrikalarla doğrudan sözleşmelere çıkış.",

      r3_status: "18–36. Aylar",
      r3_phase: "Aşama 3: Dijital Fabrika Ağı ve Entegrasyon (18–36 Ay)",
      r3_b1_title: "GCC Bölgesine Genişleme:",
      r3_b1_desc: "BAE ve Suudi Arabistan pazarlarına giriş, yerel mikro fabrikaların kurulması.",
      r3_b2_title: "Platform Entegrasyonu:",
      r3_b2_desc: "Kapasitelerin uluslararası RFQ sistemlerine entegrasyonu (Xometry, Hubs).",
      r3_b3_title: "Otonom Ekosistem:",
      r3_b3_desc: "Sipariş dağıtımında insan müdahalesini en aza indiren 'müşteri - yapay zeka - mikro fabrika' modeline geçiş.",

      cta_title: "96 Saatte Seriye Başlamaya Hazır mısınız?",
      cta_sub: "3D modelinizi veya proje fikrinizi gönderin. Yapay zeka mühendisimiz 15 dakika içinde maliyet ve teslimat süresini hesaplasın.",
      cta_btn: "Proje Hesaplaması İste",

      modal_title: "Proje Hesaplama İsteği",
      modal_sub: "Formu doldurun, mühendislerimiz 15 dakika içinde sizinle iletişime geçsin.",
      lbl_name: "Adınız / Şirket Unvanı",
      ph_name: "Ahmet / TechDevice LLC",
      lbl_contact: "E-posta veya Telefon / WhatsApp",
      ph_contact: "iletisim@sirket.com",
      lbl_cat: "Ürün Kategorisi",
      opt_cat1: "Contract Manufacturing (IoT / Cihaz Kasaları)",
      opt_cat2: "White-Label / Özel Marka (Aksesuarlar / Düzenleyiciler)",
      opt_cat3: "Digital Warehouse (Yedek Parçalar / Dişliler)",
      opt_cat4: "Tooling & Jigs (Endüstriyel Aparatlar / Delme Şablonları)",
      lbl_qty: "Planlanan Seri Adedi (Adet)",
      lbl_notes: "Görev Açıklaması veya 3D Model Bağlantısı",
      ph_notes: "Boyutlar, mukavemet gereksinimleri, çalışma koşulları...",
      btn_submit: "Başvuruyu Gönder",
      submit_success: "Talebiniz başarıyla alındı! 15 dakika içinde sizinle iletişime geçeceğiz.",

      footer_brand_desc: "Yapay Zeka Destekli 3D Üretim ve Mikro Fabrika Ağı. AB, GCC ve BDT pazarlarında isteğe bağlı dijital üretim.",
      footer_nav_title: "Navigasyon",
      footer_prod_title: "Ürünler",
      footer_hubs_title: "Operasyonel Merkezler",
      footer_hub_tr: "İstanbul, Türkiye (AB ve KİK)",
      footer_hub_ru: "Moskova, Rusya (BDT)",
      footer_copy: "© 2026 CULTFORM Inc. Tüm hakları saklıdır.",
      footer_tagline: "Üretken Yapay Zeka 3D Fason Üretim"
    }
  };

  // Language switch function
  const updateLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const dict = translations[lang];
    if (!dict) return;

    if (dict.page_title) document.title = dict.page_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta_desc) metaDesc.setAttribute('content', dict.meta_desc);

    document.querySelectorAll('[data-i18n]').forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      if (dict[key]) {
        elem.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(elem => {
      const key = elem.getAttribute('data-i18n-ph');
      if (dict[key]) {
        elem.placeholder = dict[key];
      }
    });
  };

  // Attach language toggle click events
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
    });
  });

  // Modal Dialog Handlers
  const modalOverlay = document.getElementById('rfqModal');
  const openModalBtns = document.querySelectorAll('.open-rfq-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const rfqForm = document.getElementById('rfqForm');
  const formFeedback = document.getElementById('formFeedback');

  const openModal = () => {
    if (modalOverlay) modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Handle Form Submission
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dict = translations[currentLang];
      formFeedback.style.display = 'block';
      formFeedback.textContent = dict.submit_success;
      formFeedback.style.color = '#27ae60';
      rfqForm.reset();

      setTimeout(() => {
        closeModal();
        formFeedback.style.display = 'none';
      }, 3000);
    });
  }

  // Navbar scroll background shift & Image Parallax effect
  const navbar = document.querySelector('.navbar');
  const parallaxImg = document.getElementById('parallaxImage');
  const parallaxFrame = document.getElementById('parallaxImageFrame');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 8px 24px rgba(25, 24, 23, 0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    if (parallaxFrame && parallaxImg) {
      const rect = parallaxFrame.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate relative position within viewport (0 to 1)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // Translate image vertically inside full-width container with increased speed & height
        const translateY = (progress - 0.5) * 320 - 35; 
        parallaxImg.style.transform = `translateY(${translateY}px)`;
      }
    }
  });

  // Initialize default language
  updateLanguage('ru');
});
