import { Component, inject } from '@angular/core';
import { I18n } from './i18n';

interface Tool {
  label: string;
  mono: string;
}

const TOOLS: Tool[] = [
  { label: 'Angular', mono: 'Ng' },
  { label: 'Python', mono: 'Py' },
  { label: 'Flask', mono: 'Fk' },
  { label: 'Django', mono: 'Dj' },
  { label: 'PostgreSQL', mono: 'Pg' },
  { label: 'React Native', mono: 'RN' },
  { label: 'Flutter', mono: 'Ft' },
  { label: 'Git', mono: 'Gi' },
];

@Component({
  selector: 'tools-dock',
  template: `
    <div class="tools-dock" role="group" [attr.aria-label]="i18n.t().sections.skills">
      @for (tool of tools; track tool.label) {
        <span class="tool-badge" [title]="tool.label" tabindex="0">{{ tool.mono }}</span>
      }
    </div>
  `,
  styles: [`
    .tools-dock {
      position: fixed;
      right: 18px; top: 50%;
      transform: translateY(-50%);
      z-index: 40;
      display: flex; flex-direction: column; gap: 10px;
      padding: 12px 8px;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 999px;
      box-shadow: var(--shadow);
    }
    .tool-badge {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 50%;
      font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500;
      color: var(--slate); border: 1px solid var(--line-strong);
      cursor: default;
      transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }
    .tool-badge:hover, .tool-badge:focus-visible {
      color: var(--leaf); border-color: var(--leaf);
      transform: scale(1.1);
    }
    @media (max-width: 900px) {
      .tools-dock { right: 10px; }
    }
    /* fixed side dock competes with content on small screens — hide there */
    @media (max-width: 680px) {
      .tools-dock { display: none; }
    }
  `],
})
export class ToolsDock {
  readonly i18n = inject(I18n);
  readonly tools = TOOLS;
}
