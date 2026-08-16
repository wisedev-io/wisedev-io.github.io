import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'uz';

const DICT = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    hero: {
      title1: 'Practical software,',
      title2: 'built to be used.',
      lede: 'I\u2019m Kamoliddin Rasulov — a full-stack developer in the Fergana Valley, Uzbekistan. I build and deploy real products for energy auditing, local commerce, and agriculture: Python backends, Angular and mobile frontends, running on real servers for real clients.',
      cta: 'See the work',
      cv: 'Request CV',
      tag: 'Python · Angular · React Native · PostgreSQL',
    },
    sections: { featured: 'Selected work', experience: 'Experience', skills: 'Working stack' },
    more: 'Read case study →',
    caseStudy: {
      context: 'Context',
      role: 'My role',
      challenges: 'Technical challenges',
      outcome: 'Outcome',
      stack: 'Stack',
      back: '← All work',
      next: 'Next case study →',
    },
    about: {
      title: 'About me',
      bio1: 'I\u2019m a self-taught full-stack developer focused on building real products, not tutorial projects. I\u2019ve built and deployed applications using Python, Flask, Angular, JavaScript, React Native and PostgreSQL on Ubuntu servers — including AI-assisted development workflows that let me ship fast and learn under pressure.',
      bio2: 'Before going deep into engineering, I co-founded an education platform and worked as a project manager translating business requirements into developer tasks. That background means I understand both sides: what clients need, and how to build it.',
      facts: 'Fergana, Uzbekistan · IELTS 6.5 · Available full-time',
      langs: 'English — advanced · Korean — intermediate · Uzbek — native',
      expTitle: 'Experience',
      eduTitle: 'Education',
      edu: 'BBA, Sejong University (AACSB accredited), 2017–2022. Coursework: Python, data structures & algorithms, MIS, software development, business intelligence.',
      cv: 'Request CV',
      cvSending: 'Sending request…',
      cvOk: 'Got it — I’ll email you the CV shortly. You can also reach me directly at',
      cvErr: 'Could not send the request. Please email me directly at',
    },
    contact: {
      title: 'Have a project or a role in mind? Let\u2019s talk.',
      sub: 'I\u2019m open to full-time roles (on-site in Uzbekistan or remote) and selected freelance work. The fastest way to reach me is email or the form — it pings my phone instantly.',
      name: 'Your name',
      email: 'Your email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      ok: 'Message sent — I\u2019ll reply soon. Rahmat!',
      err: 'Could not reach the server. Please email me directly:',
      cvTitle: 'Requesting the CV \u2014 just add your email below.',
      cvSub: 'I\u2019ve filled in a quick message for you. Drop your email in and hit send \u2014 I\u2019ll get the CV over to you personally.',
      cvMessage: 'Hi Kamoliddin, I checked out your portfolio and I\u2019d like to request a copy of your CV. Could you send it over? Thanks!',
      cvEmailHint: '\u2193 I\u2019ll send the CV here',
    },
    footer: { rights: '© 2026 Kamoliddin Rasulov', built: 'Built with Angular + Flask' },
  },
  uz: {
    nav: { work: 'Ishlar', about: 'Men haqimda', contact: 'Aloqa' },
    hero: {
      title1: 'Amaliy dasturlar,',
      title2: 'haqiqiy foydalanish uchun.',
      lede: 'Men Kamoliddin Rasulov — Farg\u2018ona vodiysida yashovchi full-stack dasturchiman. Energiya auditi, mahalliy savdo va qishloq xo\u2018jaligi uchun haqiqiy mahsulotlar yarataman: Python backend, Angular va mobil frontend — real serverlarda, real mijozlar uchun.',
      cta: 'Ishlarni ko\u2018rish',
      cv: 'CV so\u2018rash',
      tag: 'Python · Angular · React Native · PostgreSQL',
    },
    sections: { featured: 'Tanlangan ishlar', experience: 'Ish tajribasi', skills: 'Texnologiyalar' },
    more: 'Batafsil o\u2018qish →',
    caseStudy: {
      context: 'Loyiha haqida',
      role: 'Mening vazifam',
      challenges: 'Texnik qiyinchiliklar',
      outcome: 'Natija',
      stack: 'Texnologiyalar',
      back: '← Barcha ishlar',
      next: 'Keyingi loyiha →',
    },
    about: {
      title: 'Men haqimda',
      bio1: 'Men mustaqil o\u2018rgangan full-stack dasturchiman — darslik loyihalari emas, haqiqiy mahsulotlar yarataman. Python, Flask, Angular, JavaScript, React Native va PostgreSQL yordamida ilovalar qurib, Ubuntu serverlarga joylashtirganman. AI yordamidagi ish jarayonlari tez ishlash va bosim ostida o\u2018rganish imkonini beradi.',
      bio2: 'Dasturlashga chuqur kirishishdan oldin ta\u2019lim platformasiga asos solganman va loyiha menejeri sifatida biznes talablarini dasturchi vazifalariga aylantirganman. Shu tufayli ikkala tomonni ham tushunaman: mijozga nima kerak va uni qanday qurish kerak.',
      facts: 'Farg\u2018ona, O\u2018zbekiston · IELTS 6.5 · To\u2018liq stavkada ishlashga tayyor',
      langs: 'Ingliz — yuqori daraja · Koreys — o\u2018rta daraja · O\u2018zbek — ona tili',
      expTitle: 'Ish tajribasi',
      eduTitle: 'Ta\u2019lim',
      edu: 'BBA, Sejong universiteti (AACSB akkreditatsiyasi), 2017–2022. Fanlar: Python, ma\u2019lumotlar tuzilmalari va algoritmlar, MIS, dasturiy ta\u2019minot ishlab chiqish, biznes-tahlil.',
      cv: 'CV so\u2018rash',
      cvSending: 'So\u2018rov yuborilmoqda\u2026',
      cvOk: 'Qabul qildim \u2014 tez orada CV\u2019ni emailingizga yuboraman. Menga to\u2018g\u2018ridan-to\u2018g\u2018ri ham yozishingiz mumkin:',
      cvErr: 'So\u2018rovni yuborib bo\u2018lmadi. Iltimos, to\u2018g\u2018ridan-to\u2018g\u2018ri email yozing:',
    },
    contact: {
      title: 'Loyiha yoki ish taklifingiz bormi? Bog\u2018laning.',
      sub: 'To\u2018liq stavkali ishlarga (O\u2018zbekistonda yoki masofaviy) va tanlangan frilans loyihalarga ochiqman. Eng tez yo\u2018l — email yoki quyidagi forma: xabar darhol telefonimga keladi.',
      name: 'Ismingiz',
      email: 'Emailingiz',
      message: 'Xabar',
      send: 'Xabar yuborish',
      sending: 'Yuborilmoqda…',
      ok: 'Xabar yuborildi — tez orada javob beraman. Rahmat!',
      err: 'Serverga ulanib bo\u2018lmadi. Iltimos, to\u2018g\u2018ridan-to\u2018g\u2018ri email yozing:',
      cvTitle: 'CV so\u2018ralmoqda \u2014 quyida emailingizni qoldiring.',
      cvSub: 'Siz uchun xabarni oldindan yozib qo\u2018ydim. Emailingizni kiriting va yuboring \u2014 CV\u2019ni shaxsan o\u2018zim yuboraman.',
      cvMessage: 'Salom Kamoliddin, portfolioingizni ko\u2018rib chiqdim va CV nusxangizni so\u2018ramoqchiman. Yuborib yubora olasizmi? Rahmat!',
      cvEmailHint: '\u2193 CV\u2019ni shu yerga yuboraman',
    },
    footer: { rights: '© 2026 Kamoliddin Rasulov', built: 'Angular + Flask bilan qurilgan' },
  },
} as const;

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>('en');
  readonly t = computed(() => DICT[this.lang()]);

  toggle() {
    this.lang.update(l => (l === 'en' ? 'uz' : 'en'));
  }
}
