import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Services } from 'app/models/services';
import { ServicesService } from 'app/services/services.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  sTitle: any;
  ServicesGroup: FormGroup;
  Services$: Observable<Services[]>;
  ServicesPage: Services;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {
    this.sTitle = 'Services';
  }

  ngOnInit(): void {
    this.Services$ = this.servicesService.getAll();
    this.createEmptyForm();
    this.Services$.subscribe((page) => {
      if (page.length > 0) {
        this.ServicesPage = page[0];
        this.createForm(this.ServicesPage);
      } else {
        this.createEmptyForm();
      }
    });
  }

  createEmptyForm() {
    this.ServicesGroup = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      rich_description: [''],
      image: [''],
      ranking: [''],
      is_active: [''],
   });
  }

  createForm(service: Services) {
    this.ServicesGroup = this.fb.group({
      id: [service.id],
      title: [service.title],
      description: [service.description],
      rich_description: [service.rich_description],
      image: [service.image],
      ranking: [service.ranking],
      is_active: [service.is_active],
    });
  }

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  onUpdate(servicesPage: Services) {
    servicesPage = this.ServicesGroup.getRawValue();
    console.log(`onUpdate: ${JSON.stringify(servicesPage)}`);
    this.servicesService.update(servicesPage);
  }

  onCreate() {}

  onDelete(landingPage: any) {}

  onImages() {}
}

/**
 *
 *
 */
