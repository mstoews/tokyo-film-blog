import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteDuplicateService } from 'app/4.services/delete-duplicate.service';

@Component({
  selector: 'app-image-mgt-edit',
  templateUrl: './image-mgt-edit.component.html',
  styleUrls: ['./image-mgt-edit.component.css'],
})
export class ImageMgtEditComponent {
  deleteDupesService = inject(DeleteDuplicateService);
  route = inject(Router);

  onBackToInventory() {
    this.route.navigate(['/admin/inventory']);
  }
  RefreshList() {
    console.log('RefreshList');
    this.deleteDupesService.updateImages();
  }
  createImageOnce() {
    console.log('createImageOnce');
  }
}
