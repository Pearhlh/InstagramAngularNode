import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGroupComponent } from './post-group.component';

describe('PostGroupComponent', () => {
  let component: PostGroupComponent;
  let fixture: ComponentFixture<PostGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostGroupComponent]
    });
    fixture = TestBed.createComponent(PostGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
