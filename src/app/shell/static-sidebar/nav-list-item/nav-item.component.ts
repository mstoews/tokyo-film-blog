import {
  Component,
  HostBinding,
  Input,
  OnInit,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from './nav-service';
import { slideStateTrigger, sideNavTrigger } from '../../animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../MaterialModule';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule],
  selector: 'app-nav-list-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [slideStateTrigger],
})
export class NavItemComponent implements OnInit {
  public expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @HostBinding('@slideState') routeAnimation = true;
  // @HostBinding('@sideNavigationState') navigationAnimation = true;
  @Input()
  item!: NavItem;
  @Input() depth = 0;
  private noMenuUpdate = true;
  public isClicked = false;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (url === null || url === undefined) {
        this.expanded = false;
      } else if (this.item.route) {
        const expand = url.indexOf(`${this.item.route}`);
        if (expand === 0) {
          this.expanded = false;
        }
        this.ariaExpanded = this.expanded;
      }
    });
    this.ariaExpanded = this.expanded;
  }

  onItemSelected(item: NavItem) {
    if (this.routeAnimation === true) {
      this.routeAnimation = false;
    } else {
      this.routeAnimation = true;
    }

    if (this.isClicked === false) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }

    console.log('on selected ..');
    if (item.parent) {
      this.expanded = !this.expanded;
    } else {
      this.expanded = true;
      this.router.navigate([item.route]);
    }
  }
}
