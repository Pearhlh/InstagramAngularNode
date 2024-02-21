import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {delay, Subject, tap} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  check : boolean = false;
  check$ = new Subject();
  @ViewChild('myElement', { static: true }) myElementRef!: ElementRef;
  ngOnInit() {
    this.check$.pipe(
      tap(() => {
        this.myElementRef.nativeElement.classList.add('tranformSmall');
      }),
      delay(150),
      tap(() => {
        this.myElementRef.nativeElement.classList.remove('tranformSmall');
        this.check = !this.check
      })
    ).subscribe()
  }
}
