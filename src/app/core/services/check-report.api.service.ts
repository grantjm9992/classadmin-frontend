import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckReportApiService extends AbstractApiService {
  getUrl(): string {
    return "/check-report";
  }
}
