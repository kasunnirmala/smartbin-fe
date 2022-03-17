import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import ldBar from '@loadingio/loading-bar';
import {Device} from '../../models/device';
import {DeviceServiceService} from '../../services/device-service.service';
import {AddLevel3DialogComponent} from "../dashboard/add-level3-dialog/add-level3-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeviceDataComponent} from "./device-data/device-data.component";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})

export class DevicesComponent implements OnInit, AfterViewInit {
  devices: Device[] = [];
  @ViewChildren('bins') binsQueue: QueryList<any>;

  constructor(private deviceService: DeviceServiceService, private modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
    this.setBins();

    this.binsQueue.changes.subscribe(t => {
      console.log('FINISHED');
      this.setBins();
    });
  }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getAllDevices().subscribe(value => {
      this.devices = value;
    });
  }

  setBins() {
    this.devices.forEach(bin => {
      let val = ((bin.lastUpdatedValue ?? 0) / 2);
      val = val > 100 ? 100 : val;
      val = Math.round(val * 100) / 100
      new ldBar(`#${bin.binId}`, {
        type: 'fill',
        fill: val > 60 ? 'red' : val > 30 ? 'orange' : 'green',
        path: 'M 16 64 L 56 64 C 65 44 65 19 56 0 L 15 0 C 7 18 7 44 16 64',
        value: val
      });
    })
  }

  openDeviceData(device: Device) {
    const modalRef = this.modalService.open(DeviceDataComponent);
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {

      },
      (reason) => {
      });
  }
}
