import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Level1ServiceService} from '../../services/level1-service.service';
import {AngularTreeGridComponent} from 'angular-tree-grid';
import {Level2ServiceService} from '../../services/level2-service.service';
import {Level3ServiceService} from '../../services/level3-service.service';
import {lastValueFrom} from 'rxjs';
import {DeviceServiceService} from "../../services/device-service.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddLevel1DialogComponent} from "./add-level1-dialog/add-level1-dialog.component";
import {AddLevel2DialogComponent} from "./add-level2-dialog/add-level2-dialog.component";
import {AddLevel3DialogComponent} from "./add-level3-dialog/add-level3-dialog.component";
import {AddDeviceDialogComponent} from "./add-device-dialog/add-device-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // public activeTab = 0;
  data = [];

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'code',
    filter: true,
    columns: [
      {
        name: 'code',
        header: 'CODE',
        width: '20%',
      },
      {
        name: 'name',
        header: 'LEVEL NAME',
        width: '30%'
      },
      {
        name: 'binId',
        header: 'BIN ID',
        width: '50%'
      },
      {
        name: 'status',
        header: 'STATUS',
        type: 'custom',
        component: CustomStatusCellViewComponent,
        width: '50%'
      },
      // {
      //   name: 'createdAt',
      //   header: 'CREATED AT',
      //   width: '100%'
      // },
    ]
  };

  @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;

  constructor(
    private level1Service: Level1ServiceService,
    private level2Service: Level2ServiceService,
    private level3Service: Level3ServiceService,
    private deviceService: DeviceServiceService,
    private modalService: NgbModal
  ) {
  }

  openAddLevel1Dialog() {
    const modalRef = this.modalService.open(AddLevel1DialogComponent);
    modalRef.result.then((result) => {
        this.getData().then(r => console.log(r));
      },
      (reason) => {
      });
  }
  openAddLevel2Dialog() {
    const modalRef = this.modalService.open(AddLevel2DialogComponent);
    modalRef.result.then((result) => {
        this.getData().then(r => console.log(r));
      },
      (reason) => {
      });
  }
  openAddLevel3Dialog() {
    const modalRef = this.modalService.open(AddLevel3DialogComponent);
    modalRef.result.then((result) => {
        this.getData().then(r => console.log(r));
      },
      (reason) => {
      });
  }
  openAddDeviceDialog() {
    const modalRef = this.modalService.open(AddDeviceDialogComponent);
    modalRef.result.then((result) => {
        this.getData().then(r => console.log(r));
      },
      (reason) => {
      });
  }

  ngOnInit() {
    this.getData().then(r => console.log(r));

  }

  // public updateOptions(tab) {
  //   this.activeTab = tab;
  // }

  async getData() {
    const arr: { id: string, code?: string, name?: string, binId?: string, status?: boolean, createdAt: Date }[] = [];
    const level1s = await lastValueFrom(this.level1Service.getAllLevel1s());
    arr.push(...level1s.map(v => ({
      id: `level1-${v.id}`,
      code: v.code,
      // status: v.status,
      name: v.name,
      createdAt: v.createdAt,
      parent: '0',

    })));
    const level2s = await lastValueFrom(this.level2Service.getAllLevel2s());
    arr.push(...level2s.map(v => ({
      id: `level2-${v.id}`,
      code: v.code,
      // status: v.status,
      name: v.name,
      createdAt: v.createdAt,
      parent: `level1-${v.level1Id}`
    })));
    const level3s = await lastValueFrom(this.level3Service.getAllLevel3s());
    arr.push(...level3s.map(v => ({
      id: `level3-${v.id}`,
      code: v.code,
      // status: v.status,
      name: v.name,
      createdAt: v.createdAt,
      parent: `level2-${v.level2Id}`
    })));
    const devices = await lastValueFrom(this.deviceService.getAllDevices());
    arr.push(...devices.map(v => ({
      id: `device-${v.id}`,
      code: v.binId,
      status: v.status,
      binId: v.binId,
      createdAt: v.createdAt,
      parent: `level3-${v.level3Id}`
    })));
    this.data = arr;
  }
}


@Component({
  selector: 'app-cell-component',
  template: `
    <b *ngIf="cell_value!=null" style="text-align: center"><span
      [style]="cell_value?'color:green':'color:red'">{{cell_value ? 'ACTIVE' : 'INACTIVE'}}</span></b>
  `,
})
export class CustomStatusCellViewComponent {
  @Input()
  column: any;

  @Input()
  cell_value: string;

}
