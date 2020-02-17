import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router,
    private el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let myTag = this.el.nativeElement.querySelector(".collapse");
    if (document.documentElement.scrollTop === 1 && myTag.classList.contains('show')) {
      myTag.classList.remove('show');
    }

  }
}
