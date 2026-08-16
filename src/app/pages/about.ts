import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { JOBS } from '../core/projects';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'page-about',
  imports: [RevealDirective, RouterLink],
  template: `
    <div class="wrap about-grid">
      <img src="profile.png" alt="Kamoliddin Rasulov" />
      <div>
        <h1>{{ i18n.t().about.title }}</h1>
        <p class="bio">{{ i18n.t().about.bio1 }}</p>
        <p class="bio">{{ i18n.t().about.bio2 }}</p>
        <div class="factline">
          <b>●</b> {{ i18n.t().about.facts }}<br />
          <b>●</b> {{ i18n.t().about.langs }}
        </div>
        <div style="margin-top: 26px;">
          <a class="btn" routerLink="/contact" [queryParams]="{ intent: 'cv' }">
            {{ i18n.t().about.cv }} <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <section class="block wrap">
      <div class="eyebrow" reveal>{{ i18n.t().about.expTitle }}</div>
      @for (j of jobs; track j.period; let i = $index) {
        <article class="entry" reveal [revealDelay]="i * 90">
          <div class="meta"><b>{{ j.period }}</b></div>
          <div>
            <h3>{{ j.company[i18n.lang()] }}</h3>
            <div class="role">{{ j.role[i18n.lang()] }}</div>
            <p>{{ j.oneLiner[i18n.lang()] }}</p>
          </div>
        </article>
      }
    </section>

    <section class="block wrap">
      <div class="eyebrow" reveal>{{ i18n.t().about.eduTitle }}</div>
      <article class="entry" reveal>
        <div class="meta"><b>2017 — 2022</b></div>
        <div>
          <h3>Sejong University</h3>
          <p>{{ i18n.t().about.edu }}</p>
        </div>
      </article>
    </section>
  `,
})
export class AboutPage {
  readonly i18n = inject(I18n);
  readonly jobs = JOBS;
}
