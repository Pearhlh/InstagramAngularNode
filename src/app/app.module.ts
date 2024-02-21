import {NgModule} from '@angular/core';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, NavbarComponent, StoryListComponent, StoryItemComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule {
}
