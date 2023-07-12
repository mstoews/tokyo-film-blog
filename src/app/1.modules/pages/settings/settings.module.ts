import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@made-to/components/alert';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SettingsComponent } from 'app/1.modules/pages/settings/settings.component';
import { SettingsAccountComponent } from 'app/1.modules/pages/settings/account/account.component';
import { SettingsSecurityComponent } from 'app/1.modules/pages/settings/security/security.component';
import { SettingsPlanBillingComponent } from 'app/1.modules/pages/settings/plan-billing/plan-billing.component';
import { SettingsNotificationsComponent } from 'app/1.modules/pages/settings/notifications/notifications.component';
import { SettingsTeamComponent } from 'app/1.modules/pages/settings/team/team.component';
import { settingsRoutes } from 'app/1.modules/pages/settings/settings.routing';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    SettingsPlanBillingComponent,
    SettingsNotificationsComponent,
    SettingsTeamComponent,
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FuseAlertModule,
    SharedModule,
  ],
})
export class SettingsModule {}
