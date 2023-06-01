import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import {DatePipe, DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import {CheckApiService} from "../../../core/services/check.api.service";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  counter: any = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private checkApiService: CheckApiService,
    private userService: UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userService.getCheck().subscribe(activeCheck => {
      if (activeCheck !== null) {
        const startedTimeStamp = new Date(activeCheck.date_started);
        let currentTimeStamp = new Date();
        currentTimeStamp.setHours(currentTimeStamp.getHours() + (currentTimeStamp.getTimezoneOffset() / 60));
        if (currentTimeStamp && startedTimeStamp) {
          this.counter = currentTimeStamp.getTime() - startedTimeStamp.getTime();
          this.addCounter();
        }
      }
    })
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  public checkIn() {
    this.checkApiService.checkIn().subscribe(res => {
      this.counter = 0;
      this.addCounter();
      this.userService.setCheck(res.data);
    });
  }

  private addCounter(): void {
    setInterval(() => {
      if (this.counter === null) {
        return;
      }
      this.counter += 1000;
    }, 1000)
  }

  public checkOut(): void {
    this.checkApiService.checkOut().subscribe(res => {
      this.counter = null;
      this.userService.setCheck(null);
    })
  }
}
