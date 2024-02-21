import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoryListComponent implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
  }

}
