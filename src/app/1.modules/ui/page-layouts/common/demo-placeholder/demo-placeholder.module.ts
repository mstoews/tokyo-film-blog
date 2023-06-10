import { NgModule } from '@angular/core';
import { DemoPlaceholderComponent } from 'app/features/admin/ui/page-layouts/common/demo-placeholder/demo-placeholder.component';

@NgModule({
    declarations: [
        DemoPlaceholderComponent
    ],
    exports     : [
        DemoPlaceholderComponent
    ]
})
export class DemoPlaceholderModule
{
}
