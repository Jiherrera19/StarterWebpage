import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GumbyComponent } from './gumby/gumby.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('navbar', { static: true })
  navbar: ElementRef<HTMLCanvasElement>;

  navbarHeight: number;

  ngAfterViewInit() {
    this.navbarHeight = this.navbar.nativeElement.offsetHeight
  }

  onActivate(component: any) {
    if (component instanceof GumbyComponent) {
      component.navbarHeight = this.navbarHeight;
    }
  }
}
