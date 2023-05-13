import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/master-page/header/header.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { PathNotFoundComponent } from './public/errors/path-not-found/path-not-found.component';
import { ServerErrorComponent } from './public/errors/server-error/server-error.component';
import { HomeComponent } from './public/home/home.component';

import { BodyComponent } from './public/home/body/body.component';
import { ContactComponent } from './public/contact/contact.component';
import { RegisterSwitchComponent } from './public/register-switch/register-switch.component';
import { PublicRegistryRequestingAdviceComponent } from './public/public-registry-requesting-advice/public-registry-requesting-advice.component';
import { MissionAndVisionComponent } from './public/mission-and-vision/mission-and-vision.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PathNotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    BodyComponent,
    ContactComponent,
    RegisterSwitchComponent,
    PublicRegistryRequestingAdviceComponent,
    MissionAndVisionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
