import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Mainpage } from 'app/models/mainpage'
import { MainPageService } from 'app/services/main-page.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  sTitle: any
  mainpageGroup: FormGroup
  mainPage$: Observable<Mainpage[]>
  mainPage: Mainpage

  constructor(
    private fb: FormBuilder,
    private mainPageService: MainPageService
  ) {
    this.sTitle = 'Main Page'
  }

  ngOnInit(): void {
    this.mainPage$ = this.mainPageService.getAll()
    this.createEmptyForm()
    this.mainPage$.subscribe((page) => {
      if (page.length > 0) {
        this.mainPage = page[0]
        this.createForm(this.mainPage)
      } else {
        this.createEmptyForm()
      }
    })
  }

  createEmptyForm() {
    this.mainpageGroup = this.fb.group({
      hero_title: [''],
      features_header: [''],
      features_subheader: [''],
      cta_left: [''],
      cta_right: [''],
      contact_email: [''],
      contact_telephone: [''],
      contact_shipping: [''],
      active: [''],
    })
  }

  createForm(mainPage: Mainpage) {
    this.mainpageGroup = this.fb.group({
      id: [mainPage.id],
      hero_title: [mainPage.hero_title],
      features_header: [mainPage.features_header],
      features_subheader: [mainPage.features_subheader],
      cta_left: [mainPage.cta_left],
      cta_right: [mainPage.cta_right],
      contact_email: [mainPage.contact_email],
      contact_telephone: [mainPage.contact_telephone],
      contact_shipping: [mainPage.contact_shipping],
      active: [mainPage.active],
    })
  }

  dateFormatter(params: any) {
    const dateAsString = params.value
    const dateParts = dateAsString.split('-')
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`
  }

  onUpdate(mainPage: Mainpage) {
    mainPage = this.mainpageGroup.getRawValue()
    // console.log(`onUpdate: ${JSON.stringify(mainPage)}`);
    this.mainPageService.update(mainPage);
  }

  onCreate() {
    const mainPage = this.mainpageGroup.getRawValue()
    // console.log(`onUpdate: ${JSON.stringify(mainPage)}`);
    this.mainPageService.create(mainPage);
  }

  onDelete(landingPage: any) {}

  onImages() {}
}

/**
 *
 *
 */
