import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularTreeGridModule} from 'angular-tree-grid';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {
  CustomStatusCellViewComponent,
  DashboardComponent
} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {NgxTabsModule} from '@ngx-tiny/tabs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxTabsModule,
    AngularTreeGridModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    IconsComponent,
    CustomStatusCellViewComponent
  ]
})
export class AdminLayoutModule {
}
