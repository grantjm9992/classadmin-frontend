import {Component, OnInit} from '@angular/core';
import {MyHoursReportModel} from "../../../core/models/my-hours-report.model";
import {CheckReportApiService} from "../../../core/services/check-report.api.service";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserApiService} from "../../../core/services/user.api.service";
import {SubscriptionApiService} from "../../../core/services/subscription.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {CompanyResponse} from "../../../core/models/company.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public subscription: any;
  public myHoursReport: MyHoursReportModel;
  public user: User;
  public company: any;
  password: any;
  error: any[] = [];
  formGroup: FormGroup;
  companyFormGroup: FormGroup;

  constructor(
    private checkReportApiService: CheckReportApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private subscriptionApiService: SubscriptionApiService,
    private companyApiService: CompanyApiService
  ) {
  }

  ngOnInit(): void {
    this.subscriptionApiService.getAll().subscribe(result => {
      this.subscription = result.data;
    });
    this.checkReportApiService.getAll().subscribe((result: MyHoursReportModel) => {
      this.myHoursReport = result;
    });
    this.userService.getUserEntity().subscribe((user) => {
      if (user) {
        this.user = user;
        this.formGroup = this.formBuilder.group({
          name: [user.name, Validators.required],
          surname: [user.surname, Validators.required],
        });
        if (user.user_role === 'company_admin') {
          this.companyApiService.getCompany(user.company_id).subscribe((res: CompanyResponse) => {
            this.company = res.data;
            this.companyFormGroup = this.formBuilder.group({
              configuration: this.formBuilder.group({
                auto_approve_checks: [null, Validators.required],
                auto_approve_manual_checks: [null, Validators.required],
                automatic_check_out_time: [null, Validators.required],
              }),
              name: ['', Validators.required],
            });
            this.companyFormGroup.patchValue(this.company);
          });
        }
      }
    });
  }


  submitCompanyConfiguration(): void {
    let _updatedCompanyConfig = this.companyFormGroup.value;
    const company = {...this.company, ..._updatedCompanyConfig};
    console.log(company);
    this.companyApiService.updateCompany(company.id, company).subscribe(res => {
      console.log(res);
    });
  }

  onSubmit(): void {
    let _updatedValues = this.formGroup.value;
    const userObject = {...this.user, ..._updatedValues};
    this.userApiService.update(this.user.id, userObject).subscribe(res => {
      this.userService.setUserEntity(userObject);
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

  private getTimeString(timeObject: any, seconds: boolean = false): string {
    let string = `${this.pad(timeObject.hour)}:${this.pad(timeObject.minute)}`;
    if (seconds) {
      string += `:${this.pad(timeObject.second)}`;
    }
    return string;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
