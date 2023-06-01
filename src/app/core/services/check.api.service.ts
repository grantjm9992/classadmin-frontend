import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckApiService extends AbstractApiService {
  getUrl(): string {
    return "/checks";
  }

  public checkIn(): Observable<any> {
    return this.post(`${this.getUrl()}/check-in`, {});
  }

  public checkOut(): Observable<any> {
    return this.post(`${this.getUrl()}/check-out`, {});
  }
}
