import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Level1ServiceService} from '../../../services/level1-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-level1-dialog',
  templateUrl: './add-level1-dialog.component.html',
  styleUrls: ['./add-level1-dialog.component.scss']
})
export class AddLevel1DialogComponent implements OnInit {
  level1 = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  constructor(public activeModal: NgbActiveModal,
              private level1Service: Level1ServiceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onAdd() {
    if (this.level1.valid) {
      console.log(this.level1.value);
      this.level1Service.createLevel1(this.level1.value).subscribe(value => {
        if (value) {
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Level 1 Added Successfully', '', {
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
