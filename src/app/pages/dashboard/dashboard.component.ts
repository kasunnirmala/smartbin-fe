import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Level1ServiceService} from '../../services/level1-service.service';
import {AngularTreeGridComponent} from 'angular-tree-grid';
import {Level2ServiceService} from '../../services/level2-service.service';
import {Level3ServiceService} from '../../services/level3-service.service';
import {lastValueFrom} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {DeviceServiceService} from '../../services/device-service.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddLevel1DialogComponent} from './add-level1-dialog/add-level1-dialog.component';
import {AddLevel2DialogComponent} from './add-level2-dialog/add-level2-dialog.component';
import {AddLevel3DialogComponent} from './add-level3-dialog/add-level3-dialog.component';
import {AddDeviceDialogComponent} from './add-device-dialog/add-device-dialog.component';

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
    actions: {
      add: true,
      edit: true,
      delete: true,
      resolve_add: true,
      resolve_delete: true,
      resolve_edit: true
    },
    columns: [
      {
        name: 'code',
        header: 'CODE',
        width: '20%',
        editable: true
      },
      {
        name: 'name',
        header: 'LEVEL NAME',
        width: '27%',
        editable: true
      },
      {
        name: 'binId',
        header: 'BIN ID',
        width: '30%',
        editable: true
      },
      {
        name: 'status',
        header: 'STATUS',
        type: 'custom',
        component: CustomStatusCellViewComponent,
        width: '15%'
      },
      // {
      //   name: 'createdAt',
      //   header: 'CREATED AT',
      //   width: '100%'
      // },
    ],
    css: {
                
      //expand_icon: '<i class="fa fa-caret-right"> </i>',
      //collapse_icon: '<i class="fa fa-caret-down"> </i>',
      //add_icon: '<i class="fa fa-plus"> </i>',
      //edit_icon: '<i class="fa fa-plus"> </i>',
      //delete_icon: '<i class="fa fa-trash"> </i>',
      //save_icon: '<i class="fa fa-save"> </i>',
      //cancel_icon: '<i class="fa fa-remove"> </i>',
    }
  };

  @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;

  constructor(
    private level1Service: Level1ServiceService,
    private level2Service: Level2ServiceService,
    private level3Service: Level3ServiceService,
    private deviceService: DeviceServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  onRowSave($e) {
    if($e.data.parent.split('-')[0] == 'level3'){
      //console.log($e.data)
      this.deviceService.updateDevice($e.data).subscribe(value => {
        if(value){
          this.getData().then(r => console.log(r));
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Device Edited Successfully', '', {
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    else if($e.data.parent.split('-')[0] == 'level2'){
      //console.log($e.data)
      this.level3Service.updateLevel3($e.data).subscribe(value => {
        if(value){
          this.getData().then(r => console.log(r));
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 3 Edited Successfully', '', {
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    else if($e.data.parent.split('-')[0] == 'level1'){
      //console.log($e.data)
      this.level2Service.updateLevel2($e.data).subscribe(value => {
        if(value){
          this.getData().then(r => console.log(r));
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 2 Edited Successfully', '', {
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    else if($e.data.parent == '0'){
      //console.log($e.data)
      this.level1Service.updateLevel1($e.data).subscribe(value => {
        if(value){
          this.getData().then(r => console.log(r));
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 1 Edited Successfully', '', {
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    const data = $e.data;
    setTimeout(() => {
      $e.resolve();
    }, 500);
  }

  onRowDelete($e) {
    //console.log($e.data)
    if(confirm("Are you sure to delete " + $e.data.code)){
      if($e.data.parent.split('-')[0] == 'level3'){
        const idList = $e.data.id.split('-')
        this.deviceService.deleteDevice(idList[idList.length-1]).subscribe(value => {
          if(value){
            this.getData().then(r => console.log(r));
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Device Deleted', '', {
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-warning alert-with-icon',
              positionClass: 'toast-top-right'
            });
          }
        });
      }
      else if($e.data.parent.split('-')[0] == 'level2'){
        //console.log("in Level 3")
        const idList = $e.data.id.split('-')
        this.level3Service.deleteLevel3(idList[idList.length-1]).subscribe(value => {
          if(value){
            this.getData().then(r => console.log(r));
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 3 Deleted', '', {
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-warning alert-with-icon',
              positionClass: 'toast-top-right'
            });
          }
        });
      }
      else if($e.data.parent.split('-')[0] == 'level1'){
        //console.log("in level 2")
        const idList = $e.data.id.split('-')
        this.level2Service.deleteLevel2(idList[idList.length-1]).subscribe(value => {
          if(value){
            this.getData().then(r => console.log(r));
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 2 Deleted', '', {
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-warning alert-with-icon',
              positionClass: 'toast-top-right'
            });
          }
        });
      }
      else if($e.data.parent == '0'){
        //console.log("in Level 1")
        const idList = $e.data.id.split('-')
        this.level1Service.deleteLevel1(idList[idList.length-1]).subscribe(value => {
          if(value){
            this.getData().then(r => console.log(r));
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 1 Deleted', '', {
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-warning alert-with-icon',
              positionClass: 'toast-top-right'
            });
          }
        });
      }
      const data = $e.data;
      $e.resolve();}
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
