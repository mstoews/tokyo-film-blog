import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mainpage } from 'app/5.models/mainpage';
import { MainPageService } from 'app/4.services/main-page.service';
import { Observable, Subscription, filter, first, take } from 'rxjs';

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormComponent implements OnInit, OnDestroy {
  sTitle = 'Main Page';
  mainpageGroup: FormGroup;
  mainPage$: Observable<Mainpage[]>;
  mainPage: Mainpage;
  subMainPage: Subscription;

  mainPageService = inject(MainPageService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.mainPage$ = this.mainPageService.getAll().pipe(first());
    this.createEmptyForm();
    this.subMainPage = this.mainPage$.pipe(take(1)).subscribe((page) => {
      if (page.length > 0) {
        this.createForm(page[0]);
      }
    });
  }

  ngOnDestroy(): void {
    this.subMainPage.unsubscribe();
  }

  createEmptyForm() {
    this.mainpageGroup = this.fb.group({
      hero_title: [''],
      features_header: [''],
      features_subheader: [''],
      cta_left: [''],
      cta_center: [''],
      cta_right: [''],
      contact_email: [''],
      contact_telephone: [''],
      contact_shipping: [''],
      active: [''],
    });
  }

  createForm(mainPage: Mainpage) {
    this.mainpageGroup = this.fb.group({
      id: [mainPage.id],
      hero_title: [mainPage.hero_title],
      features_header: [mainPage.features_header],
      features_subheader: [mainPage.features_subheader],
      cta_left: [mainPage.cta_left],
      cta_center: [mainPage.cta_center],
      cta_right: [mainPage.cta_right],
      contact_email: [mainPage.contact_email],
      contact_telephone: [mainPage.contact_telephone],
      contact_shipping: [mainPage.contact_shipping],
      active: [mainPage.active],
    });
  }

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  onUpdate(mainPage: Mainpage) {
    mainPage = this.mainpageGroup.getRawValue();
    console.debug(`onUpdate: ${JSON.stringify(mainPage)}`);
    this.mainPageService.update(mainPage);
  }

  onCreate() {
    const mainPage = this.mainpageGroup.getRawValue();
    // console.debug(`onUpdate: ${JSON.stringify(mainPage)}`);
    this.mainPageService.create(mainPage);
  }

  onDelete(landingPage: any) {}

  onImages() {}
}

/**
 *
 *
 */
