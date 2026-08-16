import { Lang } from './i18n';

type L<T> = Record<Lang, T>;

export interface Project {
  slug: string;
  num: string;
  title: L<string>;
  short: L<string>;
  sub: L<string>;
  tags: string[];
  context: L<string>;
  role: L<string>;
  challenges: L<string[]>;
  outcome: L<string>;
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'energy-audit-platform',
    num: '№ 01',
    title: {
      en: 'Energy Audit Platform',
      uz: 'Energiya auditi platformasi',
      ru: 'Платформа энергоаудита',
    },
    short: {
      en: 'A production platform that automates residential energy audits — from scanned utility bills to finished Word reports — used daily by a licensed audit firm.',
      uz: 'Uy-joy energiya auditini avtomatlashtiruvchi platforma — kommunal hisob-kitoblardan tayyor Word hisobotlarigacha. Litsenziyalangan audit kompaniyasi har kuni foydalanadi.',
      ru: 'Производственная платформа, автоматизирующая энергоаудит жилых домов — от сканирования счетов за коммунальные услуги до готовых отчётов в Word — используется ежедневно лицензированной аудиторской компанией.',
    },
    sub: {
      en: 'End-to-end automation of residential energy audits for a real client company: OCR bill scanning, tariff calculations, and automated report generation, deployed on production Ubuntu servers.',
      uz: 'Haqiqiy mijoz kompaniyasi uchun energiya auditini to‘liq avtomatlashtirish: hisob-kitoblarni OCR orqali skanerlash, tarif hisob-kitoblari va avtomatik hisobot yaratish — Ubuntu serverlarda ishlab turibdi.',
      ru: 'Полная автоматизация энергоаудита жилых домов для реальной клиентской компании: OCR-сканирование счетов, расчёт тарифов и автоматическая генерация отчётов, развёрнуто на production-серверах Ubuntu.',
    },
    tags: ['Python', 'Flask', 'PostgreSQL', 'python-docx', 'React Native', 'OCR', 'Ubuntu / Gunicorn'],
    context: {
      en: 'Energy auditors in Uzbekistan produce long, standardized Word reports for every residential audit. Done by hand, one report means hours of copying data from utility bills, calculating tiered electricity and gas tariffs, and filling a template with nearly two hundred fields. A licensed audit firm needed this automated.',
      uz: 'O‘zbekistonda energiya auditorlari har bir uy-joy auditi uchun uzun, standartlashtirilgan Word hisobotlarini tayyorlaydi. Qo‘lda qilinganda bitta hisobot bir necha soat vaqt oladi: kommunal hisob-kitoblardan ma’lumot ko‘chirish, bosqichli elektr va gaz tariflarini hisoblash, ikki yuzga yaqin maydonli shablonni to‘ldirish. Litsenziyalangan audit kompaniyasiga buni avtomatlashtirish kerak edi.',
      ru: 'Энергоаудиторы в Узбекистане составляют длинные стандартизированные отчёты в Word для каждого аудита жилого дома. Вручную один отчёт занимает часы: перенос данных со счетов за коммунальные услуги, расчёт ступенчатых тарифов на электричество и газ, заполнение шаблона почти из двухсот полей. Лицензированной аудиторской компании нужно было это автоматизировать.',
    },
    role: {
      en: 'Sole developer. I designed and built the entire system: a Flask + PostgreSQL backend, the report-generation engine, OCR pipeline for utility bill screenshots, deployment on Ubuntu servers with Gunicorn and systemd, and later a React Native mobile app that walks auditors through the full inspection flow with photo capture.',
      uz: 'Yagona dasturchi. Butun tizimni men loyihaladim va qurdim: Flask + PostgreSQL backend, hisobot yaratish mexanizmi, kommunal hisob-kitob skrinshotlari uchun OCR quvuri, Gunicorn va systemd bilan Ubuntu serverlarga joylashtirish, keyinroq esa auditorlarni to‘liq tekshiruv jarayonidan olib o‘tuvchi React Native mobil ilova.',
      ru: 'Единственный разработчик. Я спроектировал и построил всю систему: backend на Flask + PostgreSQL, движок генерации отчётов, OCR-конвейер для скриншотов счетов за коммунальные услуги, развёртывание на серверах Ubuntu с Gunicorn и systemd, а позже — мобильное приложение на React Native, которое проводит аудиторов через весь процесс осмотра с фотофиксацией.',
    },
    challenges: {
      en: [
        'Generating valid, formatted Word documents from a template with ~190 placeholders using python-docx — including conditional sections, photo insertion at the right anchors, and tables that survive re-formatting.',
        'OCR of utility-provider screenshots (bar charts, mixed Cyrillic/Latin text) — solved with Google Vision plus crop-based parsing of chart regions to extract monthly consumption values reliably.',
        'Implementing Uzbekistan’s tiered electricity and gas tariff logic so calculated costs match the official bills auditors compare against.',
        'Production concerns: HEIC photo uploads from iPhones, user authentication, and a stable systemd/Gunicorn deployment a non-technical client can rely on.',
      ],
      uz: [
        '~190 ta maydonli shablondan python-docx yordamida to‘g‘ri formatlangan Word hujjatlarini yaratish — shartli bo‘limlar, kerakli joylarga foto qo‘yish va formatlashda buzilmaydigan jadvallar bilan.',
        'Kommunal xizmat skrinshotlarini OCR qilish (ustunli diagrammalar, aralash kirill/lotin matn) — Google Vision va diagramma qismlarini kesib tahlil qilish orqali oylik iste’mol qiymatlarini ishonchli ajratib olish.',
        'O‘zbekistonning bosqichli elektr va gaz tariflari mantig‘ini joriy qilish — hisoblangan xarajatlar rasmiy hisob-kitoblarga mos kelishi uchun.',
        'Ishlab chiqarish masalalari: iPhone’dan HEIC formatdagi fotolar, foydalanuvchi autentifikatsiyasi va texnik bo‘lmagan mijoz ishonadigan barqaror systemd/Gunicorn joylashuvi.',
      ],
      ru: [
        'Генерация корректных, отформатированных Word-документов из шаблона с ~190 полями с помощью python-docx — включая условные разделы, вставку фото в нужные места и таблицы, устойчивые к переформатированию.',
        'OCR скриншотов от коммунальных служб (столбчатые диаграммы, смешанный кириллический/латинский текст) — решено с помощью Google Vision и покадрового разбора областей диаграмм для надёжного извлечения значений месячного потребления.',
        'Реализация логики ступенчатых тарифов на электричество и газ в Узбекистане, чтобы расчётные суммы совпадали с официальными счетами, с которыми сверяются аудиторы.',
        'Продакшн-нюансы: загрузка HEIC-фото с iPhone, аутентификация пользователей и стабильное развёртывание на systemd/Gunicorn, на которое может полагаться нетехнический клиент.',
      ],
    },
    outcome: {
      en: 'In production and used by a real client company for its residential audits. What took hours per report now takes minutes, and the mobile app lets auditors complete the entire flow — an 11-step inspection with photos — on site.',
      uz: 'Ishlab chiqarishda — haqiqiy mijoz kompaniyasi uy-joy auditlari uchun foydalanmoqda. Ilgari bir hisobotga soatlab vaqt ketardi, endi bir necha daqiqa kifoya. Mobil ilova auditorlarga 11 bosqichli tekshiruvni fotolar bilan joyida yakunlash imkonini beradi.',
      ru: 'В продакшене, используется реальной клиентской компанией для аудита жилых домов. То, что раньше занимало часы на один отчёт, теперь занимает минуты, а мобильное приложение позволяет аудиторам проходить весь процесс — 11-этапный осмотр с фото — прямо на месте.',
    },
  },
  {
    slug: 'mahalla-marketplace',
    num: '№ 02',
    title: {
      en: 'Local Marketplace App',
      uz: 'Mahalliy bozor ilovasi',
      ru: 'Приложение локального маркетплейса',
    },
    short: {
      en: 'A Karrot-inspired community marketplace for Uzbekistan — Django backend, Flutter mobile app, built around neighborhood trust.',
      uz: 'Karrot uslubidagi O‘zbekiston uchun mahalliy bozor — Django backend, Flutter mobil ilova, mahalla ishonchiga asoslangan.',
      ru: 'Маркетплейс сообщества в духе Karrot для Узбекистана — backend на Django, мобильное приложение на Flutter, построено на доверии внутри махалли.',
    },
    sub: {
      en: 'A full-stack local marketplace inspired by Korean community-commerce platforms, adapted to how Uzbek neighborhoods actually buy and sell.',
      uz: 'Koreys hamjamiyat savdo platformalaridan ilhomlangan, o‘zbek mahallalari qanday oldi-sotdi qilishiga moslashtirilgan to‘liq mahalliy bozor ilovasi.',
      ru: 'Полноценный локальный маркетплейс, вдохновлённый корейскими платформами коммерции сообществ, адаптированный под то, как узбекские махалли на самом деле покупают и продают.',
    },
    tags: ['Django', 'Flutter / Dart', 'PostgreSQL', 'REST API'],
    context: {
      en: 'Korean platforms like Karrot proved that commerce works best at neighborhood scale: people trust nearby sellers. Uzbekistan has that social structure built in — the mahalla — but no marketplace designed around it. Classifieds here are city-wide, anonymous, and spam-heavy.',
      uz: 'Karrot kabi koreys platformalari savdo mahalla miqyosida eng yaxshi ishlashini isbotladi: odamlar yaqin atrofdagi sotuvchilarga ishonadi. O‘zbekistonda bu ijtimoiy tuzilma azaldan bor — mahalla — lekin unga moslab qurilgan bozor yo‘q. Mavjud e’lon saytlari shahar miqyosida, anonim va spamga to‘la.',
      ru: 'Корейские платформы вроде Karrot доказали, что торговля работает лучше всего в масштабе района: люди доверяют продавцам поблизости. В Узбекистане такая социальная структура уже есть — махалля — но маркетплейса, построенного вокруг неё, не было. Существующие доски объявлений — общегородские, анонимные и перегружены спамом.',
    },
    role: {
      en: 'Sole developer, full stack. Django REST backend and a Flutter/Dart mobile frontend: authentication flows, product listings with image uploads, chat structure, and the regional categorization logic mapping Uzbek cities and districts.',
      uz: 'Yagona dasturchi, to‘liq stek. Django REST backend va Flutter/Dart mobil frontend: autentifikatsiya, rasm yuklash bilan mahsulot e’lonlari, chat tuzilmasi hamda O‘zbekiston shahar va tumanlarini qamrab oluvchi hududiy toifalash mantig‘i.',
      ru: 'Единственный разработчик, полный стек. Backend на Django REST и мобильный frontend на Flutter/Dart: потоки аутентификации, объявления о товарах с загрузкой изображений, структура чата и логика региональной категоризации, охватывающая города и районы Узбекистана.',
    },
    challenges: {
      en: [
        'Modeling Uzbekistan’s administrative geography (regions → cities → districts → mahallas) so listings surface to the right nearby buyers.',
        'Designing image upload and storage flows that stay fast on mobile networks common in the Fergana Valley.',
        'Structuring buyer–seller chat around listings rather than free-form messaging, to keep conversations tied to actual transactions.',
        'Rapid UI/UX iteration with AI-assisted development — testing screens with real users and adjusting fast.',
      ],
      uz: [
        'O‘zbekiston ma’muriy geografiyasini modellashtirish (viloyat → shahar → tuman → mahalla) — e’lonlar aynan yaqin atrofdagi xaridorlarga ko‘rinishi uchun.',
        'Farg‘ona vodiysida keng tarqalgan mobil tarmoqlarda ham tez ishlaydigan rasm yuklash va saqlash jarayonlarini loyihalash.',
        'Xaridor–sotuvchi chatini erkin yozishmalar emas, e’lonlarga bog‘lab qurish — suhbatlar haqiqiy bitimlarga bog‘liq bo‘lishi uchun.',
        'AI yordamida tez UI/UX iteratsiyasi — ekranlarni haqiqiy foydalanuvchilar bilan sinab, tez o‘zgartirish.',
      ],
      ru: [
        'Моделирование административной географии Узбекистана (область → город → район → махалля), чтобы объявления показывались нужным покупателям поблизости.',
        'Проектирование загрузки и хранения изображений, остающихся быстрыми в мобильных сетях, типичных для Ферганской долины.',
        'Построение чата между покупателем и продавцом вокруг объявлений, а не свободной переписки, чтобы разговоры оставались привязаны к реальным сделкам.',
        'Быстрая итерация UI/UX с использованием ИИ в разработке — тестирование экранов с реальными пользователями и быстрые доработки.',
      ],
    },
    outcome: {
      en: 'A working full-stack product demonstrating end-to-end mobile development: from database schema to a polished Flutter interface. The project doubles as a foundation for a future community-commerce launch in the region.',
      uz: 'Mobil dasturlashni boshidan oxirigacha ko‘rsatuvchi ishlaydigan mahsulot: ma’lumotlar bazasi sxemasidan tortib puxta Flutter interfeysigacha. Loyiha kelajakda mintaqada hamjamiyat savdosini yo‘lga qo‘yish uchun poydevor bo‘lib xizmat qiladi.',
      ru: 'Работающий full-stack продукт, демонстрирующий разработку мобильного приложения от начала до конца: от схемы базы данных до отточенного интерфейса на Flutter. Проект также служит основой для возможного запуска коммерции сообщества в регионе в будущем.',
    },
  },
  {
    slug: 'transport-telegram-bots',
    num: '№ 03',
    title: {
      en: 'Transportation Telegram Bot Ecosystem',
      uz: 'Transport Telegram botlar tizimi',
      ru: 'Экосистема Telegram-ботов для перевозок',
    },
    short: {
      en: 'A multi-role ride-booking system — separate passenger, driver, and dispatcher Telegram bots connected to one Python backend.',
      uz: 'Ko‘p rolli yo‘lovchi tashish tizimi — bitta Python backendga ulangan alohida yo‘lovchi, haydovchi va dispetcher Telegram botlari.',
      ru: 'Многоролевая система бронирования поездок — отдельные Telegram-боты для пассажира, водителя и диспетчера, подключённые к единому backend на Python.',
    },
    sub: {
      en: 'Telegram is the default app in Uzbekistan — so instead of forcing users to install something new, the booking system lives where they already are.',
      uz: 'Telegram O‘zbekistonda asosiy ilova — shuning uchun foydalanuvchilarni yangi ilova o‘rnatishga majburlamasdan, buyurtma tizimi ular allaqachon bor joyda ishlaydi.',
      ru: 'Telegram — приложение по умолчанию в Узбекистане, поэтому вместо того, чтобы заставлять пользователей ставить что-то новое, система бронирования работает там, где они уже есть.',
    },
    tags: ['Python', 'Telegram Bot API', 'State machines', 'Modular architecture'],
    context: {
      en: 'Intercity ride-sharing in Uzbekistan runs on phone calls and Telegram groups: chaotic, unstructured, easy to lose track of. The goal was a structured booking flow with three distinct user roles — without asking anyone to leave Telegram.',
      uz: 'O‘zbekistonda shaharlararo yo‘lovchi tashish telefon qo‘ng‘iroqlari va Telegram guruhlarida yuradi: tartibsiz, tizimsiz, adashish oson. Maqsad — uch xil foydalanuvchi roli uchun tartibli buyurtma jarayoni yaratish, hech kimni Telegramdan chiqarmasdan.',
      ru: 'Междугородние перевозки в Узбекистане держатся на телефонных звонках и группах в Telegram: хаотично, без структуры, легко потерять концы. Цель — структурированный процесс бронирования с тремя разными ролями пользователей, не заставляя никого покидать Telegram.',
    },
    role: {
      en: 'Sole developer. I designed the multi-bot architecture: separate passenger, driver, and dispatcher bots sharing one backend, with live booking flows, per-user session state handling, and request filtering so drivers only see relevant rides.',
      uz: 'Yagona dasturchi. Ko‘p botli arxitekturani men loyihaladim: bitta backendni bo‘lishuvchi alohida yo‘lovchi, haydovchi va dispetcher botlari — jonli buyurtma jarayonlari, har bir foydalanuvchi uchun sessiya holatini boshqarish va haydovchilar faqat o‘zlariga tegishli buyurtmalarni ko‘rishi uchun so‘rovlarni filtrlash bilan.',
      ru: 'Единственный разработчик. Я спроектировал многоботовую архитектуру: отдельные боты для пассажира, водителя и диспетчера, использующие общий backend, с живыми процессами бронирования, управлением состоянием сессии для каждого пользователя и фильтрацией заявок, чтобы водители видели только релевантные поездки.',
    },
    challenges: {
      en: [
        'Session state management across three bots: a booking created in the passenger bot must appear correctly, in real time, in driver and dispatcher flows.',
        'Designing conversation state machines that survive users answering out of order, going silent mid-flow, or restarting the bot.',
        'Request filtering and routing so each driver sees only rides matching their route and role.',
        'Keeping the codebase modular so new roles or routes can be added without rewriting the core.',
      ],
      uz: [
        'Uch bot bo‘ylab sessiya holatini boshqarish: yo‘lovchi botida yaratilgan buyurtma haydovchi va dispetcher jarayonlarida real vaqtda to‘g‘ri ko‘rinishi kerak.',
        'Foydalanuvchi tartibsiz javob berishi, jarayon o‘rtasida jim bo‘lib qolishi yoki botni qayta ishga tushirishiga chidaydigan suhbat holat mashinalarini loyihalash.',
        'So‘rovlarni filtrlash va yo‘naltirish — har bir haydovchi faqat o‘z yo‘nalishi va roliga mos buyurtmalarni ko‘rishi uchun.',
        'Kod bazasini modulli saqlash — yangi rollar yoki yo‘nalishlar yadroni qayta yozmasdan qo‘shilishi uchun.',
      ],
      ru: [
        'Управление состоянием сессии между тремя ботами: бронирование, созданное в боте пассажира, должно корректно и в реальном времени отображаться в потоках водителя и диспетчера.',
        'Проектирование конечных автоматов диалога, устойчивых к тому, что пользователи отвечают не по порядку, замолкают на середине или перезапускают бота.',
        'Фильтрация и маршрутизация заявок, чтобы каждый водитель видел только поездки, соответствующие его маршруту и роли.',
        'Поддержание модульности кодовой базы, чтобы новые роли или маршруты можно было добавлять без переписывания ядра.',
      ],
    },
    outcome: {
      en: 'A working multi-role booking ecosystem in pure Python, demonstrating architecture skills beyond CRUD: state machines, role-based routing, and a modular bot framework reusable for other Telegram-first products.',
      uz: 'Sof Python’da ishlaydigan ko‘p rolli buyurtma tizimi — oddiy CRUD’dan tashqari arxitektura ko‘nikmalarini namoyish etadi: holat mashinalari, rolga asoslangan yo‘naltirish va boshqa Telegram mahsulotlari uchun qayta ishlatiladigan modulli bot freymvorki.',
      ru: 'Работающая многоролевая экосистема бронирования на чистом Python, демонстрирующая архитектурные навыки за пределами простого CRUD: конечные автоматы, маршрутизация на основе ролей и модульный фреймворк для ботов, пригодный для других Telegram-продуктов.',
    },
  },
];

export interface Job {
  period: string;
  company: L<string>;
  role: L<string>;
  text: L<string>;
  oneLiner: L<string>;
}

export const JOBS: Job[] = [
  {
    period: 'Jun 2026 — present',
    company: { en: 'Silk Road Professionals & Baker Street Network', uz: 'Silk Road Professionals & Baker Street Network', ru: 'Silk Road Professionals & Baker Street Network' },
    role: { en: 'Junior Developer (internship)', uz: 'Junior dasturchi (amaliyot)', ru: 'Junior-разработчик (стажировка)' },
    text: {
      en: 'Contributing to production projects: building and maintaining custom Odoo 19 modules for an agriculture management platform — custom models and OWL frontend components — and an EOS business platform (NestJS, Angular, PostgreSQL) where I implemented workspace entities, database migrations, and Google OAuth, and reviewed teammates’ code.',
      uz: 'Ishlab chiqarish loyihalarida qatnashaman: qishloq xo‘jaligi boshqaruv platformasi uchun maxsus Odoo 19 modullari — maxsus modellar va OWL frontend komponentlari — hamda EOS biznes platformasi (NestJS, Angular, PostgreSQL): workspace obyektlari, baza migratsiyalari, Google OAuth va jamoadoshlar kodini tekshirish.',
      ru: 'Участвую в продакшен-проектах: разработка и поддержка кастомных модулей Odoo 19 для платформы управления сельским хозяйством — кастомные модели и frontend-компоненты на OWL — а также бизнес-платформа EOS (NestJS, Angular, PostgreSQL), где я реализовал сущности workspace, миграции базы данных и Google OAuth, а также проверял код коллег.',
    },
    oneLiner: {
      en: 'Building Odoo 19 modules and an EOS platform (NestJS, Angular, PostgreSQL) in production.',
      uz: 'Odoo 19 modullari va EOS platformasi (NestJS, Angular, PostgreSQL) ustida ishlab chiqarishda ishlayman.',
      ru: 'Разрабатываю модули Odoo 19 и платформу EOS (NestJS, Angular, PostgreSQL) в продакшене.',
    },
  },
  {
    period: 'Apr 2022 — 2024',
    company: { en: 'SchoolLink', uz: 'SchoolLink', ru: 'SchoolLink' },
    role: { en: 'Co-Founder & Project Lead', uz: 'Hammuassis va loyiha rahbari', ru: 'Сооснователь и руководитель проекта' },
    text: {
      en: 'Founded an online platform for English and IT courses; managed scheduling, curriculum, and student tracking. Directed marketing, partnerships, and day-to-day operations of a live product serving real students.',
      uz: 'Ingliz tili va IT kurslari uchun onlayn platformaga asos soldim; jadval, o‘quv dasturi va o‘quvchilarni kuzatishni boshqardim. Marketing, hamkorliklar va haqiqiy o‘quvchilarga xizmat qiluvchi mahsulotning kundalik faoliyatini yo‘naltirdim.',
      ru: 'Основал онлайн-платформу для курсов английского языка и IT; управлял расписанием, учебной программой и отслеживанием учеников. Руководил маркетингом, партнёрствами и повседневной работой действующего продукта, обслуживающего реальных учеников.',
    },
    oneLiner: {
      en: 'Founded and ran an online platform for English and IT courses.',
      uz: 'Ingliz tili va IT kurslari uchun onlayn platformaga asos solib, boshqardim.',
      ru: 'Основал и руководил онлайн-платформой для курсов английского языка и IT.',
    },
  },
  {
    period: 'Jun 2023 — Aug 2024',
    company: { en: 'XCDM.AI', uz: 'XCDM.AI', ru: 'XCDM.AI' },
    role: { en: 'Project Manager', uz: 'Loyiha menejeri', ru: 'Проект-менеджер' },
    text: {
      en: 'Translated business requirements into developer tasks and managed client communications in English. Hands-on exposure to software delivery, API-driven features, and agile workflows.',
      uz: 'Biznes talablarini dasturchi vazifalariga aylantirdim va mijozlar bilan ingliz tilida muloqotni boshqardim. Dasturiy ta’minot yetkazish, API asosidagi funksiyalar va agile jarayonlarida amaliy tajriba oldim.',
      ru: 'Переводил бизнес-требования в задачи для разработчиков и вёл коммуникацию с клиентами на английском языке. Получил практический опыт в поставке ПО, разработке функций на основе API и agile-процессах.',
    },
    oneLiner: {
      en: 'Translated business requirements into developer tasks and managed client communication.',
      uz: 'Biznes talablarini dasturchi vazifalariga aylantirdim va mijozlar bilan muloqotni boshqardim.',
      ru: 'Переводил бизнес-требования в задачи для разработчиков и вёл коммуникацию с клиентами.',
    },
  },
];

export const SKILLS = [
  { group: { en: 'Frontend', uz: 'Frontend', ru: 'Фронтенд' }, items: ['Angular', 'HTML / CSS', 'JavaScript / TypeScript', 'Responsive layouts', 'Async APIs'] },
  { group: { en: 'Backend', uz: 'Backend', ru: 'Бэкенд' }, items: ['Python', 'Flask', 'Django', 'REST APIs', 'Server deployment'] },
  { group: { en: 'Mobile', uz: 'Mobil', ru: 'Мобильная разработка' }, items: ['React Native (Expo)', 'Flutter / Dart', 'API integration'] },
  { group: { en: 'Data & Tools', uz: 'Ma’lumotlar va vositalar', ru: 'Данные и инструменты' }, items: ['PostgreSQL', 'Git / GitHub', 'Linux / bash', 'Postman', 'AI-assisted workflows'] },
] as const;
