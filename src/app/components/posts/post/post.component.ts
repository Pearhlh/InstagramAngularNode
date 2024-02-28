import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  images=["https://www.planetarealmadrid.com/uploads/s1/16/52/88/1244160617-1.jpeg","https://wallpaperaccess.com/full/2569261.jpg","https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt2fa7040006e7c7e4/6328b02311e23a10a2e085ef/GettyImages-1399806403.jpg?format=jpg"]
  images2=["https://vignette.wikia.nocookie.net/lesfootballeursdanslemonde/images/7/73/Virgil_van_Dijk.jpg/revision/latest?cb=20180802105345&path-prefix=fr","https://www.afriquesports.net/wp-content/uploads/2020/04/156611-1.jpeg","https://www.fussballeuropa.com/images/xtra/imago-virgil-van-dijk-160821.jpg"]
  cards = [1,2,3,4,5];
  @ViewChild(NgbCarousel, {static : true}) ngCarousel!: NgbCarousel;
  constructor(config:NgbCarouselConfig){
    config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = true;
    config.showNavigationIndicators=false;
    config.showNavigationArrows=false;
    config.animation=true;
  }
  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }
  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }
  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }
  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }
  // onSlide(event){
  //   const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);
  // }
}
