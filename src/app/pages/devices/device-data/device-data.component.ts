import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Device} from '../../../models/device';
import {lastValueFrom} from 'rxjs';
import {Level1ServiceService} from '../../../services/level1-service.service';
import {Level2ServiceService} from '../../../services/level2-service.service';
import {Level3ServiceService} from '../../../services/level3-service.service';
import QuickChart from 'quickchart-js';
import {DeviceServiceService} from "../../../services/device-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  @Input()
  device: Device
  levelHierarchy: { level1: string, level2: string, level3: string } = {level1: '', level2: '', level3: ''}
  chartURL = '';

  constructor(public activeModal: NgbActiveModal, private level1Service: Level1ServiceService,
              private level2Service: Level2ServiceService, private datePipe: DatePipe,
              private level3Service: Level3ServiceService, private deviceService: DeviceServiceService) {
  }

  ngOnInit(): void {
    this.getLevelsData().then(res => {
      this.levelHierarchy = res;
      this.getChartURL();
    });

  }

  async getLevelsData(): Promise<{ level1: string, level2: string, level3: string }> {
    const level3 = await lastValueFrom(this.level3Service.getLevel3ById(this.device.level3Id));
    const level2 = await lastValueFrom(this.level2Service.getLevel2ById(level3.level2Id));
    const level1 = await lastValueFrom(this.level1Service.getLevel1ById(level2.level1Id));
    const device = await lastValueFrom(this.deviceService.getDeviceById(this.device.id));
    this.device = device;
    return {
      level1: level1.code, level2: level2.code, level3: level3.code
    };
  }

  getChartURL() {
    const yVals = this.device.History?.map(d => d.value);
    const xVals = this.device.History?.map(d => this.datePipe.transform(d.createdAt, 'short'));
    const historyChart = new QuickChart();
    historyChart.setConfig({
      type: 'line',                                // Show a bar chart
      data: {
        labels: xVals,   // Set X-axis labels
        datasets: [{
          label: this.device.binId,                         // Create the 'Users' dataset
          data: yVals          // Add data to the chart
        }]
      },
    });
    this.chartURL = historyChart.getUrl();
    console.log(this.chartURL);
  }
}
