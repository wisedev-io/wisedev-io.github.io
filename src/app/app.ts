import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { I18n } from './core/i18n';

const FERGANA_TZ = 'Asia/Tashkent'; // UTC+5, same offset as Fergana, no DST

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  readonly i18n = inject(I18n);
  readonly localTime = signal(this.formatTime());
  private timer?: ReturnType<typeof setInterval>;
  private headerObserver?: ResizeObserver;

  @ViewChild('headerEl') headerEl?: ElementRef<HTMLElement>;

  ngOnInit() {
    this.timer = setInterval(() => this.localTime.set(this.formatTime()), 1000);
  }

  ngAfterViewInit() {
    const el = this.headerEl?.nativeElement;
    if (!el) return;
    const sync = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    sync();
    this.headerObserver = new ResizeObserver(sync);
    this.headerObserver.observe(el);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.headerObserver?.disconnect();
  }

  private formatTime(): string {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: FERGANA_TZ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  }
}
