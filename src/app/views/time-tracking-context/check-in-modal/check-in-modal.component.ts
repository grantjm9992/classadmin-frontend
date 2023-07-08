import { Component, OnInit } from '@angular/core';
import {TaskApiService} from "../../../core/services/task.api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrls: ['./check-in-modal.component.scss']
})
export class CheckInModalComponent implements OnInit {

  public onSubmit: (eventName: string) => void;
  public tasks: any = [];
  public form: FormGroup;

  constructor(
    private taskApiService: TaskApiService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.taskApiService.getAll().subscribe(res => {
      this.tasks = res.data;
      this.form = this.formBuilder.group({
        task_id: null
      });
    })
  }

  submitForm() {
    if (this.onSubmit) {
      this.onSubmit(this.form.value);
    }
  }

}
