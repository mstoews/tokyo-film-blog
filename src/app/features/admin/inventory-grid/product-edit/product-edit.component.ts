import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'app/models/category';
import { IImageStorage } from 'app/models/maintenance';
import { Product } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  sTitle: any;
  @Input() rich_description: string

  prdGroup: FormGroup
  action: string
  party: string
  cPriority: string
  cRAG: string
  cType: string
  currentDate: Date
  product: Product
  productId: string
  current_Url: string
  updated_category: string
  selectedItemKeys: string
  categories: Category[]
  imageArray: IImageStorage[] = []
  inventoryImages$: Observable<IImageStorage[]>

  allProducts$: Observable<Product[]>
  category$: Observable<Category[]>
  prd: any

  constructor(
    private matDialog: MatDialog,
    private afs: AngularFirestore,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
    private fb: FormBuilder
  ) {
    this.prd = this.productType
    this.createEmptyForm()
  }

  public productType = {
    id: '',
    description: '',
    rich_description: '',
    image: '',
    images: '',
    brand: '',
    price: '',
    category: '',
    rating: '',
    is_featured: '',
    user_updated: '',
    date_created: '',
    date_updated: '',
  }


createProduct(results: any) {
  const newProduct = { ...this.prdGroup.value } as Product
  newProduct.image = results.data.url
  this.productService.update(newProduct)
  this.prdGroup.setValue(newProduct)
  this.afs
    .collection('inventory')
    .doc(newProduct.id)
    .collection('images')
    .add(results.data)
}

changeCategory(category: any) {
  this.updated_category = category
}

createEmptyForm() {
  this.prdGroup = this.fb.group({
    id: [''],
    description: [''],
    rich_description: [''],
    image: [''],
    images: [''],
    brand: [''],
    price: [''],
    category: [''],
    rating: [''],
    is_featured: [''],
    user_updated: [''],
    date_created: [''],
    date_updated: [''],
  })
}

createForm(prd: Product) {
  this.sTitle = 'Inventory - ' + prd.description

  this.prdGroup = this.fb.group({
    id: [prd.id],
    description: [prd.description],
    rich_description: [prd.rich_description],
    image: [prd.image],
    brand: [prd.brand],
    price: [prd.price],
    category: [prd.category],
    rating: [prd.rating],
    is_featured: [prd.is_featured],
    user_updated: [prd.user_updated],
    date_created: [prd.date_created],
    date_updated: [prd.date_updated],
  })
}

ngOnInit() {
  this.sTitle = 'Product Inventory and Images'
  this.allProducts$ = this.productService.getAll()
  this.category$ = this.categoryService.getAll()
  this.category$.subscribe((result) => {
    this.categories = result
  })
}

onOpenButtonClicked(event: any) {
  var counter = 0
  this.imageArray = []
  this.inventoryImages$ = this.productService.getProductImage(event.id)
  this.current_Url = event.image
  this.rich_description = event.rich_description
  this.updated_category = event.category

  this.inventoryImages$.subscribe((image) => {
    image.forEach((img) => {
      counter++
      const Image: IImageStorage = {
        url: img.url,
        name: img.name,
        parentId: img.parentId,
        version_no: counter,
      }
      this.imageArray.push(Image)
    })
  })

  this.prdGroup.setValue(event)
}

}
