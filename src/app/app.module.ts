import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { CardComponent } from './components/card/card.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ArtViewComponent } from './components/art-view/art-view.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListingComponent,
    CardComponent,
    FavouritesComponent,
    SignupComponent,
    LoginComponent,
    ArtViewComponent,
    CarouselComponent,
    HomeComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    HttpClientModule,
    ReactiveFormsModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
