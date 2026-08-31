/* ==========================================================================
   CULTFORM Presentation Website - JavaScript Logic & Dynamic Wealth Engine
   ========================================================================== */

let selectedCapital = 1000;
let selectedTermYears = 3;

// Полноэкранный канвас мерцающих и светящихся зеленых долларов
const canvas = document.getElementById('moneyCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resizeMoneyCanvas() {
  const activeCanvas = document.getElementById('moneyCanvas');
  if (!activeCanvas) return;
  const section = activeCanvas.parentElement || document.getElementById('calculator');
  if (section) {
    activeCanvas.width = section.clientWidth;
    activeCanvas.height = section.clientHeight;
  }
}

window.addEventListener('resize', resizeMoneyCanvas);

function spawnGlowingDollar(burst = false) {
  const activeCanvas = document.getElementById('moneyCanvas');
  if (!activeCanvas) return;
  
  // Разнокалиберность: от маленьких (14px) до гигантских акцентных (36px)
  const isGiant = Math.random() < 0.15;
  const isMedium = Math.random() < 0.45;
  const size = isGiant ? Math.random() * 12 + 26 : (isMedium ? Math.random() * 8 + 18 : Math.random() * 6 + 13);
  
  particles.push({
    x: Math.random() * activeCanvas.width,
    y: activeCanvas.height + 20,
    size: size,
    speedY: (size / 10) * (Math.random() * 0.8 + 0.9), // крупные летят чуть быстрее
    speedX: (Math.random() - 0.5) * 1.5,
    opacity: Math.random() * 0.5 + 0.35,
    glow: isGiant || Math.random() < 0.3, // часть долларов имеет неоновое свечение
    char: Math.random() > 0.35 ? '$' : '$$'
  });
}

function spawnBurst(count = 20) {
  for (let i = 0; i < count; i++) {
    spawnGlowingDollar(true);
  }
}

function renderParticlesLoop() {
  const activeCanvas = document.getElementById('moneyCanvas');
  const activeCtx = activeCanvas ? activeCanvas.getContext('2d') : null;
  if (!activeCtx || !activeCanvas) return;
  activeCtx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);

  // Фоновая генерация мягких частиц
  if (Math.random() < 0.3 && particles.length < 50) {
    spawnGlowingDollar();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.y -= p.speedY;
    p.x += p.speedX;
    p.opacity -= 0.0035; // плавное растворение

    activeCtx.save();
    activeCtx.font = `bold ${p.size}px Arial, sans-serif`;

    if (p.glow) {
      activeCtx.shadowColor = '#4ade80';
      activeCtx.shadowBlur = p.size * 0.8;
      activeCtx.fillStyle = `rgba(74, 222, 128, ${Math.max(0, p.opacity)})`;
    } else {
      activeCtx.shadowBlur = 0;
      activeCtx.fillStyle = `rgba(46, 204, 113, ${Math.max(0, p.opacity * 0.7)})`;
    }

    activeCtx.fillText(p.char, p.x, p.y);
    activeCtx.restore();

    if (p.opacity <= 0 || p.y < -40) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(renderParticlesLoop);
}

// Калькулятор
function handleCapitalChange(val) {
  selectedCapital = parseInt(val, 10);
  const modules = selectedCapital / 1000;
  
  const sliderElem = document.getElementById('capitalSlider');
  if (sliderElem && parseInt(sliderElem.value, 10) !== selectedCapital) {
    sliderElem.value = selectedCapital;
  }
  
  const sliderValElem = document.getElementById('sliderValueText');
  const slotsCountElem = document.getElementById('slotsCountText');
  if (sliderValElem) sliderValElem.textContent = `$${selectedCapital.toLocaleString('en-US')}`;
  if (slotsCountElem) {
    const isTr = document.documentElement.lang === 'tr';
    if (isTr) {
      slotsCountElem.textContent = `(${modules} modül)`;
    } else {
      slotsCountElem.textContent = `(${modules} ${getModuleWord(modules)})`;
    }
  }
  
  document.querySelectorAll('.preset-pill-dark, .preset-pill').forEach(btn => {
    const btnVal = parseInt(btn.textContent.replace(/\D/g, ''), 10);
    btn.classList.toggle('active', btnVal === selectedCapital);
  });

  // Взрыв светящихся долларов при движении
  spawnBurst(Math.min(18, Math.floor(selectedCapital / 1000) * 2));
  runCalculation();
}

function setFixedCapital(val, btn) {
  const sliderElem = document.getElementById('capitalSlider');
  if (sliderElem) sliderElem.value = val;
  handleCapitalChange(val);
}

function setContractTerm(years, btn) {
  selectedTermYears = parseInt(years, 10);
  const isTr = document.documentElement.lang === 'tr';
  const labelsRu = { 1: '1 год', 3: '3 года', 5: '5 лет' };
  const labelsTr = { 1: '1 yıl', 3: '3 yıl', 5: '5 yıl' };
  const labels = isTr ? labelsTr : labelsRu;
  
  const termYearsLabel = document.getElementById('termYearsLabel');
  const grandYearsCount = document.getElementById('grandYearsCount');

  if (termYearsLabel) termYearsLabel.textContent = labels[selectedTermYears] || `${selectedTermYears} лет`;
  if (grandYearsCount) grandYearsCount.textContent = labels[selectedTermYears] || `${selectedTermYears} лет`;
  
  document.querySelectorAll('.term-btn-dark, .term-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  runCalculation();
}

function getModuleWord(count) {
  if (count === 1) return 'модуль';
  if (count >= 2 && count <= 4) return 'модуля';
  return 'модулей';
}

function runCalculation() {
  const reinvestSwitch = document.getElementById('reinvestSwitch');
  const isReinvest = reinvestSwitch ? reinvestSwitch.checked : false;
  const monthlyRate = 0.06;
  const isTr = document.documentElement.lang === 'tr';
  
  const monthlyIncome = selectedCapital * monthlyRate;
  const annualIncome = monthlyIncome * 12;
  
  const payoutMonthVal = document.getElementById('payoutMonthVal');
  const payoutYearVal = document.getElementById('payoutYearVal');
  const aprVal = document.getElementById('aprVal');
  const grandTotalDisplay = document.getElementById('grandTotalDisplay');
  const badge = document.getElementById('reinvestBadge');

  if (payoutMonthVal) payoutMonthVal.textContent = `$${Math.round(monthlyIncome).toLocaleString('en-US')}`;
  if (payoutYearVal) payoutYearVal.textContent = `$${Math.round(annualIncome).toLocaleString('en-US')}`;
  
  let grandTotal = 0;
  
  if (!isReinvest) {
    if (badge) {
      badge.textContent = isTr ? 'Doğrudan Ödeme + Varlık İadesi' : 'Прямые выплаты + возврат актива';
      badge.style.background = 'rgba(34, 197, 94, 0.2)';
      badge.style.color = '#4ade80';
    }
    if (aprVal) aprVal.textContent = isTr ? '%72 APR' : '72% APR';
    grandTotal = (annualIncome * selectedTermYears) + selectedCapital;
  } else {
    if (badge) {
      badge.textContent = isTr ? 'Bileşik Faiz ile Sermaye Büyümesi' : 'Капитализация сложного процента';
      badge.style.background = 'rgba(255, 255, 255, 0.2)';
      badge.style.color = '#ffffff';
    }
    if (aprVal) aprVal.textContent = isTr ? '~%115 APR' : '~115% APR';
    grandTotal = selectedCapital * Math.pow((1 + monthlyRate), selectedTermYears * 12);
  }
  
  if (grandTotalDisplay) {
    grandTotalDisplay.textContent = `$${Math.round(grandTotal).toLocaleString('en-US')}`;
  }
}

// Global functions binding
window.handleCapitalChange = handleCapitalChange;
window.setFixedCapital = setFixedCapital;
window.setContractTerm = setContractTerm;
window.runCalculation = runCalculation;
window.spawnGlowingDollar = spawnGlowingDollar;
window.spawnBurst = spawnBurst;

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'ru';

  const translations = {
    ru: {
      page_title: "CULTFORM — Инвестиции в распределенные 3D-микрофабрики",
      meta_desc: "Инвестируйте в реальные производственные мощности 3D-печати. Доходность от 66% до 88% годовых с ежемесячными выплатами.",

      nav_process: "Как это работает",
      nav_calculator: "Калькулятор дохода",
      nav_products: "Продукция",
      nav_materials: "Материалы",
      nav_hubs: "Хабы",
      nav_roadmap: "Стратегия",
      nav_invest_btn: "Инвестировать $1 000",

      hero_title_p1: "Пассивный доход от",
      hero_title_accent: "$60 до $80",
      hero_title_p2: "в месяц на собственном 3D-принтере",
      hero_cinematic_lead: "Вкладываете $1 000 в оборудование, мы загружаем его заказами и управляем цехом — вы получаете стабильный денежный поток со 2-го месяца.",
      hero_btn_invest: "Купить принтер за $1 000",
      hero_btn_calc: "Рассчитать доходность",

      stat1_val: "$1 000",
      stat1_lbl: "Вход в 1 модуль",
      stat2_val: "$60–$80 / мес",
      stat2_lbl: "Доход в месяц",
      stat3_val: "66–88%",
      stat3_lbl: "APR за 1-й год",
      stat4_val: "100%",
      stat4_lbl: "Залог в сырье и цехе",

      calc_tag_pill: "ИНТЕРАКТИВНЫЙ РАСЧЕТ ПРИБЫЛИ",
      calc_mega_t1: "Вкладывайте от",
      calc_mega_val1: "$1 000",
      calc_mega_t2: "и получайте",
      calc_mega_val2: "6–8%",
      calc_mega_t3: "ежемесячно",
      calc_sub_hint: "Двигайте ползунок со значком $, чтобы рассчитать доходность и увидеть работу сложного процента",
      calc_btn_book: "Начать зарабатывать",

      model_tag_editorial: "Юнит-экономика и маржинальность",
      model_econ_title_p1: "Превращаем $0.73 пластика в $13.50 выручки.",
      model_econ_title_accent: "Чистая маржа до 70%.",
      model_econ_lead: "Один компактный станок Creality Ender 3 V3 работает без зарплаты и отпусков. Мы печатаем партии только под подтвержденный спрос: корпуса электроники, кастомные автозапчасти и дизайн-объекты.",
      math_lbl1: "сырье и свет",
      math_val2: "2 часа",
      math_lbl2: "печать детали",
      math_lbl3: "цена продажи",
      math_lbl4: "чистая прибыль",
      model_trust_note: "Прибыль с каждого отпечатанного тиража распределяется между инвесторами пула со 2-го месяца.",
      fsp_title: "100+ коммерческих SKU",
      fsp_sub: "Постоянная загрузка 24/7",

      pipe_tag: "Конвейер пассивного дохода",
      pipe_title: "От ваших $1 000 до первой выплаты на карту",
      pipe_subtitle: "Полный цикл под ключ: CULTFORM берет на себя закупку полимеров, круглосуточное обслуживание и продажу готовых изделий.",
      step1_title: "Фиксация оборудования",
      step1_desc: "Вносите $1 000. За вами закрепляется серийный номер конкретного станка Creality Ender 3 V3 и резерв полимеров.",
      step1_fact: "100% залог в активе",
      step2_title: "Загрузка контрактами",
      step2_desc: "CULTFORM направляет на ваш модуль пул оптовых заказов: B2B-партии, детали приборов и маркетплейсы.",
      step2_fact: "Без поиска клиентов",
      step3_title: "Автономное производство",
      step3_desc: "Станок безостановочно печатает тиражи в хабе (Турция / РФ). Команда хаба фасует и отгружает продукцию.",
      step3_fact: "Маржа партий до 70%",
      step4_title: "Выплата чистой прибыли",
      step4_desc: "Ежемесячно со 2-го месяца доход перечисляется на карту или счет в рублях, долларах или USDT.",
      step4_fact: "$60–$80 / мес на $1 000",

      hubs_tag: "Международная сеть микрофабрик",
      hubs_title: "Действующие производственные площадки",
      hubs_lead: "Вместо сложной трансграничной логистики мы открываем автономные цеха прямо в центрах регионального спроса.",
      hub_tr_title: "Турция (Анталья)",
      hub_tr_badge: "Активный цех",
      hub_tr_desc: "Обеспечивает поставки на турецкий e-commerce через Trendyol, Hepsiburada и прямые экспортные D2C-заказы в ЕС.",
      hub_ru_title: "Россия (Ростов-на-Дону)",
      hub_ru_badge: "Активный цех",
      hub_ru_desc: "Закрывает B2B-контракты внутреннего рынка: срочное прототипирование, корпуса приборов и партии для импортозамещения.",
      hub_gcc_title: "Экспансия в GCC (ОАЭ / Дубай)",
      hub_gcc_badge: "В пайплайне Q4",
      hub_gcc_desc: "Развертывание сети автономных микрофабрик на премиальном рынке ОАЭ и Саудовской Аравии.",

      prod_tag: "Диверсификация портфеля",
      prod_title: "Что ежедневно печатают наши фермы",
      prod_sub: "Работаем на 4 независимых рынках: от массовых продаж на маркетплейсах до закрытых B2B-контрактов для заводов.",
      p1_cat: "B2B-контракты",
      p1_title: "Корпуса IoT-датчиков и приборов",
      p1_desc: "Серийное производство защитных кожухов и корпусов электроники для приборостроителей и стартапов без затрат на пресс-формы.",
      p2_cat: "Маркетплейсы & СТМ",
      p2_title: "Предметный дизайн и интерьерный свет",
      p2_desc: "Параметрические вазы, светильники и настольные органайзеры. Продажи через Ozon, Wildberries и Trendyol с высокой наценкой.",
      p3_cat: "Импортозамещение",
      p3_title: "Запасные части и компоненты (Spare Parts)",
      p3_desc: "Шестерни, кронштейны, переходники и муфты из износостойкого карбона PA-CF для ремонта промышленного оборудования.",
      p4_cat: "Автопром и сборка",
      p4_title: "Промышленная оснастка и кондукторы",
      p4_desc: "Шаблоны для сверления, ложементы и калибры для сборочных цехов. Срочное изготовление за 24–48 часов под нужды производств.",

      mat_tag: "Инженерная база сырья",
      mat_title: "Сырье промышленного класса",
      mat_sub: "Не печатаем сувениры и хрупкий пластик: используем сертифицированные полимеры, выдерживающие нагрузки, влагу и перепады температур.",
      m1_badge: "Легче стали, прочнее пластика",
      m2_title: "Углеволокно и Карбон",
      m2_desc: "Сверхлегкий и жесткий материал для замены фрезерованного алюминия. Из него печатаются детали дронов, шестерни и кронштейны.",
      m2_badge: "Стойкость к UV и ударам",
      m1_title: "Ударопрочные полимеры",
      m1_desc: "Не выгорают на солнце, устойчивы к бытовой химии, маслам и падениям. Основа для уличных корпусов, приборов и предметов декора.",
      m3_badge: "Аналог резины и силикона",
      m3_title: "Гибкие полимеры и резина",
      m3_desc: "Материал легко гнется, восстанавливает форму и гасит вибрации. Идеален для производства ударопрочных бамперов и уплотнителей.",

      road_tag: "Стратегия роста",
      r1_status: "Текущий этап",
      r1_phase: "Фаза 1: Запуск пула FDM-ферм и P2P-привлечение (Текущий этап)",
      r1_b1_title: "Формирование пула инвесторов ($1 000/модуль):",
      r1_b1_desc: "развертывание парка принтеров Creality Ender 3 V3 с минимальным сроком запуска.",
      r1_b2_title: "Валидация спроса и B2B-контракты:",
      r1_b2_desc: "отработка серийных заказов на корпуса, оснастку и высокомаржинальные D2C-бандлы.",
      r1_b3_title: "Оцифровка и формирование базы:",
      r1_b3_desc: "создание каталога проверенных SKU для обеспечения стабильной загрузки оборудования 24/7.",

      r2_status: "Месяцы 6–18",
      r2_phase: "Фаза 2: Промышленный AM-хаб и CapEx-масштабирование",
      r2_b1_title: "Запуск промышленного AM-хаба:",
      r2_b1_desc: "привлечение институционального раунда и запуск установок SLS / MJF для серийного выпуска.",
      r2_b2_title: "Экономика масштаба:",
      r2_b2_desc: "снижение себестоимости печати до 40% за счет высокой автоматизации и оптовых закупок полимеров.",
      r2_b3_title: "Географический рост:",
      r2_b3_desc: "выход на прямые контракты с промышленными предприятиями Турции и Европы.",

      r3_status: "Месяцы 18–36",
      r3_phase: "Фаза 3: Сеть цифровых микрофабрик и глобальная экспансия",
      r3_b1_title: "Экспансия в регион GCC:",
      r3_b1_desc: "выход на рынки ОАЭ и Саудовской Аравии, развертывание локальных микрофабрик.",
      r3_b2_title: "Платформенная интеграция:",
      r3_b2_desc: "включение мощностей в международные RFQ-системы (Xometry, Hubs).",
      r3_b3_title: "Автономная экосистема:",
      r3_b3_desc: "переход на модель «заказчик — нейросеть — микрофабрика» с автоматическим распределением заказов.",

      cta_title: "Готовы стать инвестором фабрики CULTFORM?",
      cta_sub: "Забронируйте инвестиционный слот от $1 000 и получайте регулярный доход до 88% годовых.",
      cta_btn: "Забронировать инвест-слот ($1 000)",

      modal_title: "Бронирование инвест-слота",
      modal_sub: "Заполните форму, и мы пришлем инвестиционный договор и финансовую модель фермы.",
      lbl_name: "Ваше имя",
      ph_name: "Константин",
      lbl_contact: "Телефон / WhatsApp / Telegram",
      ph_contact: "+7 (999) 000-00-00",
      lbl_amount: "Сумма инвестиций ($)",
      opt_1000: "$1 000 (1 модуль / доход до $80/мес)",
      opt_3000: "$3 000 (3 модуля / доход до $240/мес)",
      opt_5000: "$5 000 (5 модулей / доход до $400/мес)",
      opt_10000: "$10 000 (10 модулей / доход до $800/мес)",
      opt_20000: "$20 000 (20 модулей / доход до $1 600/мес)",
      opt_30000: "$30 000 (30 модулей / доход до $2 400/мес)",
      btn_submit: "Получить договор и забронировать",
      submit_success: "Заявка успешно отправлена! Мы свяжемся с вами и вышлем инвестиционный договор.",

      footer_brand_desc: "AI-Driven 3D Production & Micro-Factories Network. Инвестиции в распределенные производственные мощности нового поколения.",
      footer_nav_title: "Навигация",
      footer_contacts_title: "Контакты для инвесторов",
      footer_hub_tr: "Стамбул / Анталья, Турция",
      footer_hub_ru: "Ростов-на-Дону / Москва, Россия",
      footer_copy: "© 2026 CULTFORM Inc. All rights reserved.",
      footer_tagline: "P2P Manufacturing Investment Platform"
    },
    tr: {
      page_title: "CULTFORM — Dağıtık 3D Mikro Fabrikalara Yatırım",
      meta_desc: "Gerçek 3D baskı üretim kapasitelerine yatırım yapın. Aylık ödemelerle yıllık %66 ila %88 getiri.",

      nav_process: "Nasıl Çalışır",
      nav_calculator: "Gelir Hesaplayıcı",
      nav_products: "Ürünler",
      nav_materials: "Malzemeler",
      nav_hubs: "Merkezler",
      nav_roadmap: "Strateji",
      nav_invest_btn: "$1.000 Yatırım Yap",

      hero_badge: "Havuz açık: 40 yatırım modülü",
      hero_title_p1: "Kendi 3D yazıcınızla ayda",
      hero_title_accent: "$60 ile $80 arası",
      hero_title_p2: "pasif gelir",
      hero_cinematic_lead: "Ekipmana $1.000 yatırıyorsunuz, biz siparişlerle doldurup atölyeyi yönetiyoruz — siz 2. aydan itibaren düzenli nakit akışı elde ediyorsunuz.",
      hero_btn_invest: "Yazıcıyı $1.000'a Satın Al",
      hero_btn_calc: "Getiriyi Hesapla",

      stat1_val: "$1.000",
      stat1_lbl: "1 modül giriş",
      stat2_val: "$60–$80 / ay",
      stat2_lbl: "Aylık gelir",
      stat3_val: "%66–88",
      stat3_lbl: "1. yıl APR",
      stat4_val: "%100",
      stat4_lbl: "Hammadde ve atölye teminatı",

      calc_tag_pill: "İNTERAKTİF KÂR HESAPLAMA",
      calc_mega_t1: "En az",
      calc_mega_val1: "$1.000",
      calc_mega_t2: "yatırın ve ayda",
      calc_mega_val2: "%6–8",
      calc_mega_t3: "kazanın",
      calc_sub_hint: "Getiriyi hesaplamak ve bileşik faizin gücünü görmek için $ simgeli kaydırıcıyı hareket ettirin",
      calc_btn_book: "Kazanmaya Başla",

      model_tag_editorial: "Birim Ekonomisi ve Kârlılık",
      model_econ_title_p1: "0.73$'lık plastiği 13.50$ gelire dönüştürüyoruz.",
      model_econ_title_accent: "%70'e varan net kâr marjı.",
      model_econ_lead: "Kompakt Creality Ender 3 V3 makinesi maaşsız ve tatilsiz çalışır. Sadece onaylanmış talep doğrultusunda üretim yapıyoruz: elektronik kasaları, özel oto parçaları ve tasarım ürünleri.",
      math_lbl1: "hammadde ve elektrik",
      math_val2: "2 saat",
      math_lbl2: "parça baskısı",
      math_lbl3: "satış fiyatı",
      math_lbl4: "net kâr",
      model_trust_note: "Basılan her partiden elde edilen kâr, 2. aydan itibaren havuz yatırımcıları arasında paylaştırılır.",
      fsp_title: "100+ ticari SKU",
      fsp_sub: "7/24 Kesintisiz Yükleme",

      pipe_tag: "Pasif Gelir Hattı",
      pipe_title: "1.000$'ınızdan Kartınıza İlk Ödemeye Kadar",
      pipe_subtitle: "Anahtar teslim tam döngü: CULTFORM polimer alımını, 24 saatlik bakımı ve hazır ürünlerin satışını üstlenir.",
      step1_title: "Ekipman Sabitleme",
      step1_desc: "1.000$ yatırıyorsunuz. Belirli bir Creality Ender 3 V3 makinesinin seri numarası ve polimer rezervi adınıza tahsis edilir.",
      step1_fact: "Varlıkta %100 Teminat",
      step2_title: "Sözleşmelerle Yükleme",
      step2_desc: "CULTFORM modülünüze toptan sipariş havuzunu yönlendirir: B2B partileri, cihaz parçaları ve pazaryerleri.",
      step2_fact: "Müşteri arama olmadan",
      step3_title: "Otonom Üretim",
      step3_desc: "Makine merkezde (Türkiye / Rusya) durmaksızın baskı yapar. Merkez ekibi paketler ve sevkiyatı gerçekleştirir.",
      step3_fact: "%70'e varan parti marjı",
      step4_title: "Net Kâr Ödemesi",
      step4_desc: "2. aydan itibaren gelir her ay karta veya hesaba ruble, dolar veya USDT olarak aktarılır.",
      step4_fact: "1.000$'a ayda $60–$80",

      hubs_tag: "Uluslararası Mikro Fabrika Ağı",
      hubs_title: "Aktif Üretim Tesisleri",
      hubs_lead: "Karmaşık sınır ötesi lojistik yerine, doğrudan bölgesel talep merkezlerinde otonom atölyeler açıyoruz.",
      hub_tr_title: "Türkiye (Antalya)",
      hub_tr_badge: "Aktif Atölye",
      hub_tr_desc: "Trendyol, Hepsiburada ve AB'ye doğrudan D2C ihracat siparişleri ile Türk e-ticaretine tedarik sağlar.",
      hub_ru_title: "Rusya (Rostov-na-Donu)",
      hub_ru_badge: "Aktif Atölye",
      hub_ru_desc: "İç pazar B2B sözleşmelerini karşılar: acil prototipleme, cihaz kasaları ve ithal ikame partileri.",
      hub_gcc_title: "GCC Genişlemesi (BAE / Dubai)",
      hub_gcc_badge: "Q4 Planlamasında",
      hub_gcc_desc: "BAE ve Suudi Arabistan'ın premium pazarında otonom mikro fabrika ağının kurulması.",

      prod_tag: "Portföy Çeşitlendirmesi",
      prod_title: "Çiftliklerimiz Günlük Olarak Ne Basıyor",
      prod_sub: "4 bağımsız pazarda faaliyet gösteriyoruz: pazaryerlerindeki kitlesel satışlardan fabrikalar için kapalı B2B sözleşmelerine kadar.",
      p1_cat: "B2B SÖZLEŞMELERİ",
      p1_title: "IoT Sensör ve Cihaz Kasaları",
      p1_desc: "Kalıp maliyeti olmadan cihaz üreticileri ve girişimler için koruyucu kılıf ve elektronik gövdelerin seri üretimi.",
      p2_cat: "PAZARYERLERİ & ÖZEL MARKA",
      p2_title: "Tasarım Ürünleri ve İç Mekan Aydınlatması",
      p2_desc: "Parametrik vazolar, lambalar ve masa düzenleyicileri. Trendyol, Hepsiburada ve D2C kanallarında yüksek kârla satış.",
      p3_cat: "İTHAL İKAME",
      p3_title: "Yedek Parçalar ve Bileşenler (Spare Parts)",
      p3_desc: "Endüstriyel ekipman onarımı için aşınmaya dayanıklı PA-CF karbondan dişliler, braketler, adaptörler ve kaplinler.",
      p4_cat: "OTOMOTİV VE MONTAJ",
      p4_title: "Endüstriyel Aparatlar ve Şablonlar",
      p4_desc: "Montaj atölyeleri için delme şablonları, sabitleme yuvaları ve kalibreler. Fabrika ihtiyaçlarına göre 24–48 saatte acil üretim.",

      mat_tag: "Hammadde Mühendislik Tabanı",
      mat_title: "Endüstriyel Sınıf Hammaddeler",
      mat_sub: "Hediyelik eşya ve kırılgan plastik basmıyoruz: yüklere, neme ve sıcaklık değişimlerine dayanıklı sertifikalı polimerler kullanıyoruz.",
      m1_badge: "Çelikten hafif, plastikten güçlü",
      m2_title: "Karbon Fiber ve Kompozit",
      m2_desc: "İşlenmiş alüminyumun yerini alan ultra hafif ve rijit malzeme. Dron parçaları, dişliler ve braketler basılmaktadır.",
      m2_badge: "UV ve Darbe Dayanımı",
      m1_title: "Darbeye Dayanıklı Polimerler",
      m1_desc: "Güneşte solmaz, ev kimyasallarına, yağlara ve darbelere dayanıklıdır. Dış mekan kasaları, cihazlar ve dekoratif ürünlerin temeli.",
      m3_badge: "Kauçuk ve Silikon Muadili",
      m3_title: "Esnek Polimerler ve Kauçuk",
      m3_desc: "Malzeme kolayca bükülür, şeklini geri kazanır ve titreşimleri sönümler. Darbeye dayanıklı tamponlar ve contalar için idealdir.",

      road_tag: "Büyüme Stratejisi",
      r1_status: "Mevcut Aşama",
      r1_phase: "Aşama 1: FDM Çiftlik Havuzu Başlangıcı ve P2P Yatırım (Mevcut)",
      r1_b1_title: "Yatırımcı havuzunun oluşturulması ($1.000/modül):",
      r1_b1_desc: "minimum başlangıç süresiyle Creality Ender 3 V3 yazıcı filosunun devreye alınması.",
      r1_b2_title: "Talep doğrulama ve B2B sözleşmeleri:",
      r1_b2_desc: "kasalar, aparatlar ve yüksek kârlı D2C paketleri için seri siparişlerin işlenmesi.",
      r1_b3_title: "Dijitalleşme ve veritabanı oluşturma:",
      r1_b3_desc: "ekipmanın 7/24 istikrarlı yüklenmesini sağlamak için test edilmiş SKU kataloğu oluşturulması.",

      r2_status: "6–18. Aylar",
      r2_phase: "Aşama 2: Endüstriyel AM Merkezi ve CapEx Ölçekleme",
      r2_b1_title: "Endüstriyel AM merkezinin kurulması:",
      r2_b1_desc: "kurumsal yatırım turu ve seri üretim için SLS / MJF sistemlerinin devreye alınması.",
      r2_b2_title: "Ölçek ekonomisi:",
      r2_b2_desc: "yüksek otomasyon ve toplu polimer alımıyla baskı maliyetinde %40'a varan düşüş.",
      r2_b3_title: "Coğrafi büyüme:",
      r2_b3_desc: "Türkiye ve Avrupa'daki sanayi kuruluşlarıyla doğrudan sözleşmeler.",

      r3_status: "18–36. Aylar",
      r3_phase: "Aşama 3: Dijital Mikro Fabrika Ağı ve Küresel Genişleme",
      r3_b1_title: "GCC bölgesine genişleme:",
      r3_b1_desc: "BAE ve Suudi Arabistan pazarlarına giriş, yerel mikro fabrikaların kurulması.",
      r3_b2_title: "Platform entegrasyonu:",
      r3_b2_desc: "kapasitelerin uluslararası RFQ sistemlerine (Xometry, Hubs) dahil edilmesi.",
      r3_b3_title: "Otonom ekosistem:",
      r3_b3_desc: "otomatik sipariş dağıtımıyla 'müşteri - yapay zeka - mikro fabrika' modeline geçiş.",

      cta_title: "CULTFORM Fabrikasının Yatırımcısı Olmaya Hazır mısınız?",
      cta_sub: "1.000$'dan başlayan yatırım slotunuzu ayırtın ve yıllık %88'e varan getiri elde edin.",
      cta_btn: "Yatırım Slotunu Rezerve Et ($1.000)",

      modal_title: "Yatırım Slotu Rezervasyonu",
      modal_sub: "Formu doldurun, yatırım sözleşmesini ve çiftliğin finansal modelini gönderelim.",
      lbl_name: "Adınız",
      ph_name: "Ahmet",
      lbl_contact: "Telefon / WhatsApp / Telegram",
      ph_contact: "+90 (555) 000-00-00",
      lbl_amount: "Yatırım Tutarı ($)",
      opt_1000: "$1.000 (1 modül / aylık $80'e kadar gelir)",
      opt_3000: "$3.000 (3 modül / aylık $240'a kadar gelir)",
      opt_5000: "$5.000 (5 modül / aylık $400'a kadar gelir)",
      opt_10000: "$10.000 (10 modül / aylık $800'a kadar gelir)",
      opt_20000: "$20.000 (20 modül / aylık $1.600'a kadar gelir)",
      opt_30000: "$30.000 (30 modül / aylık $2.400'a kadar gelir)",
      btn_submit: "Sözleşmeyi Al ve Rezerve Et",
      submit_success: "Başvurunuz alındı! Sizinle iletişime geçip yatırım sözleşmesini ileteceğiz.",

      footer_brand_desc: "Yapay Zeka Destekli 3D Üretim ve Mikro Fabrika Ağı. Yeni nesil dağıtık üretim kapasitelerine yatırım.",
      footer_nav_title: "Navigasyon",
      footer_contacts_title: "Yatırımcı İletişim",
      footer_hub_tr: "İstanbul / Antalya, Türkiye",
      footer_hub_ru: "Rostov-na-Donu / Moskova, Rusya",
      footer_copy: "© 2026 CULTFORM Inc. Tüm hakları saklıdır.",
      footer_tagline: "P2P Manufacturing Investment Platform"
    }
  };

  // Modal Dialog Handlers
  const modalOverlay = document.getElementById('investModal');
  const closeModalBtn = document.querySelector('#investModal .modal-close');
  const investForm = document.getElementById('investForm');
  const formFeedback = document.getElementById('formFeedback');

  window.openInvestModal = (amount) => {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (amount) {
        const select = document.getElementById('invAmountSelect');
        if (select) {
          const matchingOption = Array.from(select.options).find(opt => parseInt(opt.value, 10) === parseInt(amount, 10));
          if (matchingOption) {
            select.value = amount;
          }
        }
      }
    }
  };

  window.closeInvestModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', window.closeInvestModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) window.closeInvestModal();
    });
  }

  // Handle Form Submission from Modal
  window.handleInvestSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const dict = translations[currentLang];
    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.textContent = dict.submit_success;
      formFeedback.style.color = '#27ae60';
    }

    if (investForm) investForm.reset();

    setTimeout(() => {
      window.closeInvestModal();
      if (formFeedback) formFeedback.style.display = 'none';
    }, 3000);
  };

  // Handle Direct Lead Submission from Partnership Clean Stage
  window.submitDirectLead = (form) => {
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';
    
    if (btn) {
      btn.textContent = '✓ Заявка отправлена!';
      btn.style.background = '#16a34a';
      btn.disabled = true;
    }
    
    form.reset();

    setTimeout(() => {
      if (btn) {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }
    }, 3500);
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

    // Refresh term label and recalculate
    setContractTerm(selectedTermYears, document.querySelector('.term-btn.active'));
    handleCapitalChange(selectedCapital);
  };

  // Attach language toggle click events
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
    });
  });

  // Navbar scroll background shift & Image Parallax effect
  const navbar = document.querySelector('.navbar');
  const parallaxImg = document.getElementById('parallaxImage');
  const parallaxFrame = document.getElementById('parallaxImageFrame');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (navbar) navbar.style.boxShadow = '0 8px 24px rgba(25, 24, 23, 0.06)';
    } else {
      if (navbar) navbar.style.boxShadow = 'none';
    }

    if (parallaxFrame && parallaxImg) {
      const rect = parallaxFrame.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translateY = (progress - 0.5) * 320 - 35;
        parallaxImg.style.transform = `translateY(${translateY}px)`;
      }
    }
  });

  const stage = document.getElementById('heroStage');
  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      document.querySelectorAll('.floating-item').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || 20);
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });

    stage.addEventListener('mouseleave', () => {
      document.querySelectorAll('.floating-item').forEach((el) => {
        el.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  const hubStatusInfo = {
    turkey: 'Хаб: Турция (Анталья) — Действующее производство (E-Com & Экспорт в ЕС)',
    russia: 'Хаб: Россия (Ростов-на-Дону) — Действующее производство (B2B Контракты)',
    gcc: 'Хаб: ОАЭ (Дубай) — Подготовка к запуску Q4 (GCC Рынок)'
  };

  function selectCleanHub(hubKey, cardEl) {
    document.querySelectorAll('.hub-clean-card').forEach(c => c.classList.remove('active'));
    if (cardEl) {
      cardEl.classList.add('active');
    } else {
      const cards = document.querySelectorAll('.hub-clean-card');
      if (hubKey === 'turkey' && cards[0]) cards[0].classList.add('active');
      if (hubKey === 'russia' && cards[1]) cards[1].classList.add('active');
      if (hubKey === 'gcc' && cards[2]) cards[2].classList.add('active');
    }

    const header = document.getElementById('currentHubHeader');
    if (header && hubStatusInfo[hubKey]) {
      header.textContent = hubStatusInfo[hubKey];
    }
  }

  window.selectCleanHub = selectCleanHub;

  const hubData = {
    antalya: {
      tag: 'LIVE NODE: ANTALYA HUB',
      capacity: '60 модулей',
      load: '94% (High)',
      focus: 'Trendyol, Amazon, B2B',
      shipping: '48 часов (EU / TR)',
      activeBeacon: '.beacon-antalya'
    },
    moscow: {
      tag: 'LIVE NODE: MOSCOW HUB',
      capacity: '40 модулей',
      load: '88% (Normal)',
      focus: 'Ozon, Wildberries, РФ B2B',
      shipping: '24 часа (РФ / СНГ)',
      activeBeacon: '.beacon-moscow'
    }
  };

  function switchHubLocation(key, element) {
    const data = hubData[key];
    if (!data) return;

    document.querySelectorAll('.hub-nav-pill').forEach(pill => pill.classList.remove('active'));
    if (element) element.classList.add('active');

    const liveTag = document.getElementById('hubLiveTag');
    const cap = document.getElementById('hubCapacity');
    const load = document.getElementById('hubLoad');
    const focus = document.getElementById('hubFocus');
    const ship = document.getElementById('hubShipping');

    if (liveTag) liveTag.textContent = data.tag;
    if (cap) cap.textContent = data.capacity;
    if (load) load.textContent = data.load;
    if (focus) focus.textContent = data.focus;
    if (ship) ship.textContent = data.shipping;

    document.querySelectorAll('.radar-beacon').forEach(b => b.classList.remove('active'));
    const targetBeacon = document.querySelector(data.activeBeacon);
    if (targetBeacon) targetBeacon.classList.add('active');
  }

  window.switchHubLocation = switchHubLocation;

  // Interactive 3D Tilt for Brand Logo Card
  const brandStage = document.getElementById('brandStage');
  const logoCard = document.getElementById('logoCard');

  if (brandStage && logoCard) {
    brandStage.addEventListener('mousemove', (e) => {
      const rect = brandStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -8;
      const tiltY = (x / (rect.width / 2)) * 8;

      logoCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    brandStage.addEventListener('mouseleave', () => {
      logoCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // Поочередное включение шагов 01 -> 02 -> 03 -> 04 и плавное наполнение логотипа цветом
  const howSection = document.querySelector('#how');
  const steps = document.querySelectorAll('.how-col-step');

  if (howSection && steps.length) {
    const howObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Поочередно зажигаем шаги с задержкой 240мс
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add('step-lit');
            }, index * 240);
          });

          // После зажигания 4-го шага запускаем наполнение логотипа цветом
          setTimeout(() => {
            howSection.classList.add('is-active');
          }, steps.length * 240 + 100);

          howObserver.unobserve(howSection);
        }
      });
    }, { threshold: 0.25 });

    howObserver.observe(howSection);
  }

  // Активация лазерного выжигания манифеста
  const laserBox = document.querySelector('#laserTriggerWrap');
  if (laserBox) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          laserBox.classList.add('laser-active');

          setTimeout(() => {
            laserBox.classList.add('laser-finished');
          }, 2400);

          observer.unobserve(laserBox);
        }
      });
    }, { threshold: 0.35 });

    observer.observe(laserBox);
  }

  // Автоматический бегущий импульс по нишам
  const chips = document.querySelectorAll('.pfs-chip');
  if (chips.length > 0) {
    let currentIndex = 0;
    setInterval(() => {
      // Снимаем подсветку с предыдущей
      chips.forEach(c => c.classList.remove('is-highlighted'));

      // Подсвечиваем следующую
      chips[currentIndex].classList.add('is-highlighted');

      // Переходим к следующей по кругу
      currentIndex = (currentIndex + 1) % chips.length;
    }, 2200);
  }

  // Initialize Canvas & Engine
  resizeMoneyCanvas();
  renderParticlesLoop();
  updateLanguage('ru');
  handleCapitalChange(1000);
});
