import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[reveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class RevealDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>);

  @Input() revealDelay = 0;

  private static observer = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              RevealDirective.observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
    : null;

  ngOnInit() {
    const node = this.el.nativeElement;
    if (this.revealDelay) node.style.transitionDelay = `${this.revealDelay}ms`;
    if (RevealDirective.observer) {
      RevealDirective.observer.observe(node);
    } else {
      node.classList.add('in');
    }
  }
}
