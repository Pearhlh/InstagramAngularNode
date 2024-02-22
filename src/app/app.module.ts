import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './components/navbar/navbar.component';
import {StoryListComponent} from './components/story-list/story-list.component';
import {StoryItemComponent} from './components/story-item/story-item.component';
import {NgbCarousel, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { PostViewComponent } from './components/post-view/post-view.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, NavbarComponent, StoryListComponent, StoryItemComponent, HeaderComponent, PostViewComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, NgbCarouselModule],
  providers: [],
  bootstrap: [AppComponent,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
