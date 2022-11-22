import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'app/models/products';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog } from '@angular/material/dialog';
import { IImageStorage } from 'app/models/maintenance';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-grid.component.html',
    styleUrls: ['./inventory-grid.component.css'],
})

export class InventoryComponent implements OnInit  {


    @ViewChild('drawer') drawer: MatDrawer;
    drawOpen: 'open' | 'close' = 'open';
    prdGroup: FormGroup;
    action: string;
    party: string;
    sTitle: string;
    cPriority: string;
    cRAG: string;
    cType: string;
    currentDate: Date;
    product: Product;
    productId: string;
    current_Url: string;
    updated_category: string;
    selectedItemKeys: string;
    categories: Category[];
    imageArray: IImageStorage[] = []
    inventoryImages$: Observable<IImageStorage[]> ;

    allProducts$: Observable<Product[]>;
    category$: Observable<Category[]>;
    prd: any;

    constructor(
      private matDialog: MatDialog,
      private afs: AngularFirestore,
      private readonly categoryService: CategoryService,
      private readonly productService: ProductsService,
      private fb: FormBuilder )
      {
      this.prd = this.productType;
      this.createEmptyForm();
      }

    onRefresh() {
      this.allProducts$ = this.productService.getAll();
    }

    onTabClick() {
      console.log('onTabClick');
    }

     valueChangedEvent($event: Event) {
      console.log('valueChangedEvent');
     }

    /**
     * The dialogue entry is passed the current entry and parentId which is subsequently
     * passed back so the images collection can be created from the parent inventory item.
     * The parentID must exist before the image collection could be created.
     */

    onImages(): void {
      console.log('onImages');
      const parentId = this.prdGroup.getRawValue();
      const dialogRef = this.matDialog.open(DndComponent, {
        width: '500px',
        data: parentId.id
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === undefined) {
          result = { event: 'Cancel' };
        }
        switch (result.event) {
          case 'Create':
            console.log(`create Images to save: ${JSON.stringify(result.data)}`);
            this.createProduct(result);
            break;
          case 'Cancel':
            console.log(`Image transfer cancelled`);
            break;
        }
      });
    }

    createProduct(results: any ){
      const newProduct = { ...this.prdGroup.value} as Product;
      newProduct.image = results.data.url;
      this.productService.update(newProduct);
      this.prdGroup.setValue(newProduct);
      this.afs
      .collection('inventory')
      .doc(newProduct.id)
      .collection('images')
      .add(results.data);
    }

    changeCategory(category: any) {
      this.updated_category = category;
      console.log(`update category ${this.updated_category}`);
    }

    ngOnInit() {
      this.sTitle = 'Product Inventory and Images'
      this.allProducts$ = this.productService.getAll();
      this.category$ = this.categoryService.getAll()
      this.category$.subscribe(result => {
          this.categories = result;
          console.log(this.categories);
      });
    }

    toggleDrawer() {
      const opened = this.drawer.opened;
      if (opened !== true) {
        this.drawer.toggle();
      } else {
        if (this.drawOpen === 'close') {
          this.drawer.toggle();
        }
      }
    }

    openDrawer() {
      const opened = this.drawer.opened;
      if (opened !== true) {
        this.drawer.toggle();
      } else {
        return;
        }
    }

    onOpenButtonClicked(event: any ){
        console.log(JSON.stringify(event));
        var counter = 0;
        this.imageArray = [];
        this.inventoryImages$ = this.productService.getProductImage(event.id)
        this.current_Url = event.image;

        this.inventoryImages$.subscribe(image => {
          image.forEach(img =>{
            counter++;
            const Image: IImageStorage = {
              url: img.url,
              name: img.name,
              parentId: img.parentId,
              version_no: counter,
            }
            this.imageArray.push(Image);
          } )
        });

        this.prdGroup.setValue(event);
        this.openDrawer()
    }

    onFocusedRowChanged(e: any){
        const rowData = e.row && e.row.data;
        console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`)
        this.current_Url = rowData.images;
        this.prdGroup.setValue(rowData);
    }

    closeDrawer() {
      const opened = this.drawer.opened;
      if (opened === true) {
        this.drawer.toggle();
      } else {
        return;
        }
    }

    dateFormatter(params: any) {
      const dateAsString = params.value;
      const dateParts = dateAsString.split('-');
      return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
    }

    onAdd() {
      console.log('open drawer to add ... ');
      this.openDrawer();
    }

    onCreate() {
      const newProduct = { ...this.prdGroup.value} as Product;
      console.log(`onCreate ${newProduct}`);
      this.productService.create(newProduct);
    }

    onUpdate(data: Product) {
      data = this.prdGroup.getRawValue();
      data.category = this.updated_category;
      console.log(`onUpdate:  ${JSON.stringify(data)}`);
      this.productService.update(data);
    }

    onDelete(data: Product) {
      data = this.prdGroup.getRawValue();
      this.productService.delete(data.id.toString());
    }

    public productType = {
        id:                 '',
        description:        '',
        rich_description:   '',
        image:              '',
        images:             '',
        brand:              '',
        price:              '',
        category:           '',
        rating:             '',
        is_featured:        '',
        user_updated:       '',
        date_created:       '',
        date_updated:       '',
    }

    createEmptyForm() {
      this.prdGroup = this.fb.group({
        id:                 [''],
        description:        [''],
        rich_description:   [''],
        image:              [''],
        images:             [''],
        brand:              [''],
        price:              [''],
        category:           [''],
        rating:             [''],
        is_featured:        [''],
        user_updated:       [''],
        date_created:       [''],
        date_updated:       [''],
      });
    }

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.prdGroup = this.fb.group({
        id:                 [prd.id],
        description:        [prd.description],
        rich_description:   [prd.rich_description],
        image:              [prd.image],
        brand:              [prd.brand],
        price:              [prd.price],
        category:           [prd.category],
        rating:             [prd.rating],
        is_featured:        [prd.is_featured],
        user_updated:       [prd.user_updated],
        date_created:       [prd.date_created],
        date_updated:       [prd.date_updated]
    });
  }

  columnsToDisplay: string[] = [
    'actions',
    'description',
    'image',
    'rich_description',
    'price'
  ];
}
