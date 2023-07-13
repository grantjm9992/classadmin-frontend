import { Component, OnInit } from '@angular/core';
import {MyHoursReportModel} from "../../../core/models/my-hours-report.model";
import {CheckReportApiService} from "../../../core/services/check-report.api.service";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserApiService} from "../../../core/services/user.api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myHoursReport: MyHoursReportModel;
  public user: User;
  password: any;
  error: any[] = [];
  formGroup: FormGroup;
  constructor(
    private checkReportApiService: CheckReportApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    this.checkReportApiService.getAll().subscribe((result: MyHoursReportModel) => {
      this.myHoursReport = result;
    });
    this.userService.getUserEntity().subscribe((user) => {
      if (user) {
        this.user = user;
        this.formBuilder.group({
          name: [user.name, Validators.required],
          surname: [user.surname, Validators.required],
        });
      }
    });
  }

  onSubmit(): void {
    let _updatedValues = this.formGroup.value;
    const userObject = {...this.user, _updatedValues};
    this.userApiService.update(this.user.id, userObject).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated your details successfully"
      })
    });
  }

  updatePassword(): void {
    this.userApiService.updateUserPassword(this.user.id, this.password).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated correctly",
      });
    });
  }

  public pipeHours(seconds: string): string {
    return Math.round(parseInt(seconds) / 3600).toString();
  }
}
