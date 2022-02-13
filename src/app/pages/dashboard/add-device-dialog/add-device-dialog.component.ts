import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Level2} from '../../../models/level2';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Level3ServiceService} from '../../../services/level3-service.service';
import {Level2ServiceService} from '../../../services/level2-service.service';
import {ToastrService} from 'ngx-toastr';
import {Level3} from '../../../models/level3';
import {DeviceServiceService} from '../../../services/device-service.service';
import {Device} from '../../../models/device';

@Component({
  selector: 'app-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.scss']
})
export class AddDeviceDialogComponent implements OnInit {
  device = new FormGroup({
    binId: new FormControl('', Validators.required),
    level3Id: new FormControl('', Validators.required),
  });
  level3s: Level3[] = [];

  constructor(public activeModal: NgbActiveModal,
              private level3Service: Level3ServiceService,
              private deviceService: DeviceServiceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllLevel3s();
  }

  getAllLevel3s() {
    this.level3Service.getAllLevel3s().subscribe(value => this.level3s = value);
  }

  onAdd() {
    if (this.device.valid) {
      const dev: Device = {
        binId: this.device.get('binId').value,
        level3Id: parseInt(this.device.get('level3Id').value),
      }
      this.deviceService.createDevice(dev).subscribe(value => {
        if (value) {
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 2 Added Successfully', '', {
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          });
          this.activeModal.close();
        }

      })
    }

  }

}
