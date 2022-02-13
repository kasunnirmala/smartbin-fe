import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Level1ServiceService} from '../../../services/level1-service.service';
import {ToastrService} from 'ngx-toastr';
import {Level2ServiceService} from '../../../services/level2-service.service';
import {Level1} from '../../../models/level1';
import {Level2} from '../../../models/level2';

@Component({
  selector: 'app-add-level2-dialog',
  templateUrl: './add-level2-dialog.component.html',
  styleUrls: ['./add-level2-dialog.component.scss']
})
export class AddLevel2DialogComponent implements OnInit {
  level2 = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    level1Id: new FormControl('', Validators.required),
  });
  level1s: Level1[] = [];

  constructor(public activeModal: NgbActiveModal,
              private level1Service: Level1ServiceService,
              private level2Service: Level2ServiceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllLevel1s();
  }

  getAllLevel1s() {
    this.level1Service.getAllLevel1s().subscribe(value => this.level1s = value);
  }

  onAdd() {
    if (this.level2.valid) {
      const lvl2: Level2 = {
        code: this.level2.get('code').value,
        name: this.level2.get('name').value,
        level1Id: parseInt(this.level2.get('level1Id').value),
      }
      this.level2Service.createLevel2(lvl2).subscribe(value => {
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
