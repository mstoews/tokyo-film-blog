import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { StaticSidebarComponent } from 'app/2.main/static-sidebar/static-sidebar.component';
import { IconsModule } from 'app/icons.module';
import { FooterComponent } from 'app/3.components/footer/footer.component';
import { MenubarComponent } from 'app/3.components/menubar/menubar.component';
import { SideNavComponent } from 'app/2.main/sidenav/sidenav.component';
import { ShellComponent } from 'app/2.main/shell.component';
import { NavItemComponent } from 'app/2.main/static-sidebar/nav-list-item/nav-item.component';
import { NotificationComponent } from '../../3.components/notification/notification.component';
import { HeadingModule } from 'app/2.main/header/heading.module';

const components = [
  StaticSidebarComponent,
  MenubarComponent,
  NavItemComponent,
  FooterComponent,
  SideNavComponent,
  ShellComponent,

];

const modules = [
  CommonModule,
  RouterModule,
  MaterialModule,
  IconsModule,
  NotificationComponent,
  HeadingModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, components],
})
export class SharedModule {}
