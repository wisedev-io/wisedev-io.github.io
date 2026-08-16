import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { I18n } from '../core/i18n';
import { CONTACT_API_URL, EMAIL, PHONE, GITHUB, LINKEDIN } from '../core/config';
import { RevealDirective } from '../core/reveal.directive';

type FormState = 'idle' | 'sending' | 'ok' | 'err';

@Component({
  selector: 'page-contact',
  imports: [FormsModule, RevealDirective],
  template: `
    <section class="block wrap">
      <div class="contact-card" reveal>
        @if (cvIntent()) {
          <h1>{{ i18n.t().contact.cvTitle }}</h1>
          <p class="sub">{{ i18n.t().contact.cvSub }}</p>
        } @else {
          <h1>{{ i18n.t().contact.title }}</h1>
          <p class="sub">{{ i18n.t().contact.sub }}</p>
        }

        <div class="contact-flex">
          <div class="contact-links">
            <a href="mailto:{{ email }}">{{ email }}</a>
            <a href="tel:{{ phone.replaceAll(' ', '') }}">{{ phone }}</a>
            <a [href]="github" target="_blank" rel="noopener">github.com/wisedev-io</a>
          </div>

          <form class="cform" (ngSubmit)="submit()">
            <label>
              {{ i18n.t().contact.name }}
              <input name="name" [(ngModel)]="name" required maxlength="120" />
            </label>
            <label>
              {{ i18n.t().contact.email }}
              @if (cvIntent()) { <span class="email-hint">{{ i18n.t().contact.cvEmailHint }}</span> }
              <input #emailInput name="email" type="email" [(ngModel)]="fromEmail" required maxlength="200" />
            </label>
            <label>
              {{ i18n.t().contact.message }}
              <textarea name="message" [(ngModel)]="message" rows="5" required maxlength="4000"></textarea>
            </label>

            @if (state() === 'ok') {
              <div class="form-note ok">{{ i18n.t().contact.ok }}</div>
            } @else if (state() === 'err') {
              <div class="form-note err">
                {{ i18n.t().contact.err }} <a href="mailto:{{ email }}">{{ email }}</a>
              </div>
            }

            <button class="btn" type="submit" [disabled]="state() === 'sending'">
              @if (state() === 'sending') { {{ i18n.t().contact.sending }} }
              @else { {{ i18n.t().contact.send }} }
            </button>

            <div class="social-row">
              <a class="social-icon" href="https://t.me/kamaliddiyn" target="_blank" rel="noopener" aria-label="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6 18.6 20.7c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.15L18.2 6.6c.4-.36-.09-.56-.62-.2L7.2 13.15l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6L20.6 3.4c.9-.34 1.68.2 1.34 1.2Z"/></svg>
              </a>
              <a class="social-icon" [href]="whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.03 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.83 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.53 2 12.03 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3-.2-.31a8.24 8.24 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.26 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.06s.88 2.39 1 2.56c.13.17 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29Z"/></svg>
              </a>
              <a class="social-icon" [href]="linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.24h4V23h-4V8.24ZM8.5 8.24h3.83v2.01h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8.24Z"/></svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ContactPage implements OnInit {
  readonly i18n = inject(I18n);
  private route = inject(ActivatedRoute);

  readonly email = EMAIL;
  readonly phone = PHONE;
  readonly github = GITHUB;
  readonly linkedin = LINKEDIN;
  readonly whatsapp = `https://wa.me/${PHONE.replace(/[^\d]/g, '')}`;

  @ViewChild('emailInput') emailInput?: ElementRef<HTMLInputElement>;

  name = '';
  fromEmail = '';
  message = '';
  readonly state = signal<FormState>('idle');
  readonly cvIntent = signal(false);

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('intent') !== 'cv') return;
    this.cvIntent.set(true);
    this.typeMessage(this.i18n.t().contact.cvMessage);
    setTimeout(() => this.emailInput?.nativeElement.focus(), 400);
  }

  private typeMessage(text: string) {
    this.message = '';
    let i = 0;
    const step = () => {
      if (i > text.length) return;
      this.message = text.slice(0, i);
      i++;
      setTimeout(step, 14 + Math.random() * 16);
    };
    step();
  }

  async submit() {
    if (!this.name || !this.fromEmail || !this.message) return;
    this.state.set('sending');
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, email: this.fromEmail, message: this.message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.state.set('ok');
      this.name = this.fromEmail = this.message = '';
    } catch {
      this.state.set('err');
    }
  }
}
