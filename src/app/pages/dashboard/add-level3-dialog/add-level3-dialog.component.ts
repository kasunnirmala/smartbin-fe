import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Level1} from "../../../models/level1";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Level1ServiceService} from "../../../services/level1-service.service";
import {Level2ServiceService} from "../../../services/level2-service.service";
import {ToastrService} from "ngx-toastr";
import {Level2} from "../../../models/level2";
import {Level3ServiceService} from "../../../services/level3-service.service";
import {Level3} from "../../../models/level3";

@Component({
  selector: 'app-add-level3-dialog',
  templateUrl: './add-level3-dialog.component.html',
  styleUrls: ['./add-level3-dialog.component.scss']
})
export class AddLevel3DialogComponent implements OnInit {
  level3 = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    level2Id: new FormControl('', Validators.required),
  });
  level2s: Level2[] = [];

  constructor(public activeModal: NgbActiveModal,
              private level3Service: Level3ServiceService,
              private level2Service: Level2ServiceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllLevel2s();
  }

  getAllLevel2s() {
    this.level2Service.getAllLevel2s().subscribe(value => this.level2s = value);
  }

  onAdd() {
    if (this.level3.valid) {
      const lvl3: Level3 = {
        code: this.level3.get('code').value,
        name: this.level3.get('name').value,
        level2Id: parseInt(this.level3.get('level2Id').value),
      }
      this.level3Service.createLevel3(lvl3).subscribe(value => {
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
