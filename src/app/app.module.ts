import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { AddLevel1DialogComponent } from './pages/dashboard/add-level1-dialog/add-level1-dialog.component';
import { AddLevel2DialogComponent } from './pages/dashboard/add-level2-dialog/add-level2-dialog.component';
import { AddLevel3DialogComponent } from './pages/dashboard/add-level3-dialog/add-level3-dialog.component';
import { AddDeviceDialogComponent } from './pages/dashboard/add-device-dialog/add-device-dialog.component';
import { DevicesComponent } from './pages/devices/devices.component';
import {FlexModule} from "@angular/flex-layout";
import { DeviceDataComponent } from './pages/devices/device-data/device-data.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FlexModule
    ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, AddLevel1DialogComponent, AddLevel2DialogComponent, AddLevel3DialogComponent, AddDeviceDialogComponent, DevicesComponent, DeviceDataComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
