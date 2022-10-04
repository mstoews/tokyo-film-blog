import {
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit,
    Optional,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { IProducts } from '../../../interfaces/mt-products'

@Component({
    selector: 'app-prd-form',
    templateUrl: './products.form.html',
})
export class ProductsFormComponent implements OnInit {

    prdGroup: FormGroup;
    action: string;
    party: string;
    sTitle: string;
    cPriority: string;
    cRAG: string;
    cType: string;
    currentDate: Date;
    
    subType: Subscription;
    subPriority: Subscription;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public dialogRef: MatDialogRef<ProductsFormComponent>,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private readonly productService: ProductsService,
        @Optional() @Inject(MAT_DIALOG_DATA) public product: IProducts
    ) 
    {
        this.createForm(product);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ngOnInit() {
        this.prdGroup.valueChanges
        .subscribe((value) => {
            //  console.log (`Value changed  ${value}, ${value.id}`);
            this.changeDetectorRef.markForCheck();
        });

    }

    OnDestroy() {
        this.subType.unsubscribe();
        this.subPriority.unsubscribe();
    }

    
    createForm(prd: IProducts) {
        this.sTitle = 'Kanban prd - ' + prd.id;

        const dDate = new Date(prd.date_updated);
        const dueDate = dDate.toISOString().split('T')[0];

        const sDate = new Date(prd.date_created);
        const startDate = sDate.toISOString().split('T')[0];

        this.prdGroup = this.fb.group({
            id:                 [prd.id],
            description:        [prd.description],
            rich_description:   [prd.rich_description],
            image:              [prd.image],
            images:             [prd.images],
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

    onCreate(data: IProducts) {
        data = this.prdGroup.getRawValue();
        this.dialogRef.close({ event: 'Create', data });
    }

    onUpdate(data: IProducts) {
        data = this.prdGroup.getRawValue();
        this.dialogRef.close({ event: 'Update', data });
    }

    onDelete(data: IProducts) {
        data = this.prdGroup.getRawValue();
        this.dialogRef.close({ event: 'Delete', data });
    }
    
    onVerify(data: IProducts) {
        //  console.log (`OnVerify ${data}`);
    }

    onAddComment(data: IProducts) {
        //  console.log (`onAddComment ${data}`);
    }

    onAssignment(data: IProducts) {
        //  console.log (`${data}`);
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
}
