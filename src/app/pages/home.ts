import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { PROJECTS, JOBS, SKILLS } from '../core/projects';
import { RevealDirective } from '../core/reveal.directive';
import { LogoMarquee } from '../core/logo-marquee';

@Component({
  selector: 'page-home',
  imports: [RouterLink, RevealDirective, LogoMarquee],
  template: `
    <div class="hero">
      <div class="hero-portrait">
        <img src="profile-cutout.png" alt="Kamoliddin Rasulov" />
      </div>
      <div class="hero-grid">
        <div class="hero-copy">
          <h1>{{ i18n.t().hero.title1 }} <em>{{ i18n.t().hero.title2 }}</em></h1>
          <p class="lede">{{ i18n.t().hero.lede }}</p>
          <div class="actions">
            <a class="btn" href="#work">{{ i18n.t().hero.cta }} <span class="arrow">→</span></a>
            <a class="btn ghost" routerLink="/contact" [queryParams]="{ intent: 'cv' }">{{ i18n.t().hero.cv }}</a>
          </div>
          <div class="tagline-mono"><span>$</span> {{ i18n.t().hero.tag }}</div>
        </div>
      </div>
      <a class="scroll-cue" href="#work" aria-label="Scroll to work">↓</a>
    </div>

    <section class="block wrap" id="work">
      <div class="eyebrow" reveal>{{ i18n.t().sections.featured }}</div>
      <div class="cards">
        @for (p of projects; track p.slug; let i = $index) {
          <a class="pcard" [routerLink]="['/projects', p.slug]" reveal [revealDelay]="i * 90">
            <span class="num">{{ p.num }}</span>
            <h3>{{ p.title[i18n.lang()] }}</h3>
            <p>{{ p.short[i18n.lang()] }}</p>
            <div class="tags">
              @for (t of p.tags.slice(0, 4); track t) { <span>{{ t }}</span> }
            </div>
            @if (p.liveUrl || p.repoUrl) {
              <div class="links">
                @if (p.liveUrl) {
                  <a [href]="p.liveUrl" target="_blank" rel="noopener" (click)="$event.stopPropagation()">Live ↗</a>
                }
                @if (p.repoUrl) {
                  <a [href]="p.repoUrl" target="_blank" rel="noopener" (click)="$event.stopPropagation()">Code ↗</a>
                }
              </div>
            }
            <span class="more">{{ i18n.t().more }}</span>
          </a>
        }
      </div>
    </section>

    <logo-marquee />

    <section class="block wrap">
      <div class="eyebrow" reveal>{{ i18n.t().sections.experience }}</div>
      @for (j of jobs; track j.period; let i = $index) {
        <article class="entry" reveal [revealDelay]="i * 90">
          <div class="meta"><b>{{ j.period }}</b></div>
          <div>
            <h3>{{ j.company[i18n.lang()] }}</h3>
            <div class="role">{{ j.role[i18n.lang()] }}</div>
            <p>{{ j.text[i18n.lang()] }}</p>
          </div>
        </article>
      }
    </section>

    <section class="block wrap">
      <div class="eyebrow" reveal>{{ i18n.t().sections.skills }}</div>
      <div class="skillgroups">
        @for (g of skills; track g.group.en; let i = $index) {
          <div class="sgroup" reveal [revealDelay]="i * 90">
            <h3>{{ g.group[i18n.lang()] }}</h3>
            <ul>
              @for (s of g.items; track s) { <li class="chip">{{ s }}</li> }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
})
export class HomePage {
  readonly i18n = inject(I18n);
  readonly projects = PROJECTS;
  readonly jobs = JOBS;
  readonly skills = SKILLS;
}
