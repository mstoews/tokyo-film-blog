import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'section-title',
  template: `
    <div fxLayout fxLayoutAlign="start center">
      <h2>
        <i class="fas fa-caret-right" aria-hidden="true"></i>
        <!-- <svg [icon]="iconCaretRight size="lg"></svg> -->
        <ng-content></ng-content>
      </h2>
    </div>
  `,
  styleUrls: ['section-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule]
})
export class SectionTitleComponent {

  // iconCaretRight = faCaretRight;
}
