import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18n } from '../core/i18n';
import { PROJECTS } from '../core/projects';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'page-project',
  imports: [RouterLink, RevealDirective],
  template: `
    @if (project(); as p) {
      <div class="wrap case-head">
        <div class="num">{{ p.num }} — {{ i18n.t().sections.featured }}</div>
        <h1>{{ p.title[i18n.lang()] }}</h1>
        <p class="sub">{{ p.sub[i18n.lang()] }}</p>
        <div class="tags">
          @for (t of p.tags; track t) { <span class="chip">{{ t }}</span> }
        </div>
        @if (p.liveUrl || p.repoUrl) {
          <div class="links">
            @if (p.liveUrl) {
              <a class="btn" [href]="p.liveUrl" target="_blank" rel="noopener">View live ↗</a>
            }
            @if (p.repoUrl) {
              <a class="btn ghost" [href]="p.repoUrl" target="_blank" rel="noopener">Source ↗</a>
            }
          </div>
        }
      </div>

      <div class="wrap case-body">
        <div class="case-sec" reveal>
          <h2>{{ i18n.t().caseStudy.context }}</h2>
          <p>{{ p.context[i18n.lang()] }}</p>
        </div>
        <div class="case-sec" reveal>
          <h2>{{ i18n.t().caseStudy.role }}</h2>
          <p>{{ p.role[i18n.lang()] }}</p>
        </div>
        <div class="case-sec" reveal>
          <h2>{{ i18n.t().caseStudy.challenges }}</h2>
          <ul>
            @for (c of p.challenges[i18n.lang()]; track c) { <li>{{ c }}</li> }
          </ul>
        </div>
        <div class="case-sec" reveal>
          <h2>{{ i18n.t().caseStudy.outcome }}</h2>
          <p>{{ p.outcome[i18n.lang()] }}</p>
        </div>
      </div>

      <div class="wrap case-nav">
        <a class="btn ghost" routerLink="/">{{ i18n.t().caseStudy.back }}</a>
        <a class="btn" [routerLink]="['/projects', next().slug]">
          {{ i18n.t().caseStudy.next }}
        </a>
      </div>
    }
  `,
})
export class ProjectPage {
  readonly i18n = inject(I18n);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug'))), { initialValue: null });

  readonly project = computed(() => {
    const s = this.slug();
    const found = PROJECTS.find(p => p.slug === s);
    if (s !== null && !found) this.router.navigateByUrl('/');
    return found;
  });

  readonly next = computed(() => {
    const idx = PROJECTS.findIndex(p => p.slug === this.slug());
    return PROJECTS[(idx + 1) % PROJECTS.length];
  });
}
