import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { NavService } from './main/static-sidebar/nav-list-item/nav-service';
import { SharedModule } from './modules/shared-module/shared.module';
import { ScrollService } from './services/scroll.service';
import { SwiperModule } from 'swiper/angular';
import { ProductResolver } from './services/product.resolver';
import { BlogResolver } from './services/blog.resolver';



// Firebase services + environment module
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { CartResolver } from './services/cart.resolver';
import { WishListResolver } from './services/wishlist.resolver';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxStripeModule } from 'ngx-stripe';


// import { environment } from '../environments/dev';

import { environment} from '../environments/environment.prod';
import { HeadingModule } from './main/header/heading.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    SwiperModule,
    HeadingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule,
    NgxStripeModule.forRoot(environment.stripe.public_key),
  ],
  providers: [
    ScrollService,
    NavService,
    ProductResolver,
    CartResolver,
    WishListResolver,
    BlogResolver,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
   
    {provide: 'googleTagManagerId', useValue: environment.gtm_id},
   
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
