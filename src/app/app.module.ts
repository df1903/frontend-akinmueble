import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/master-page/header/header.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { SideNavComponent } from './public/master-page/side-nav/side-nav.component';
import { PathNotFoundComponent } from './public/errors/path-not-found/path-not-found.component';
import { ServerErrorComponent } from './public/errors/server-error/server-error.component';
import { HomeComponent } from './public/home/home.component';
import { RegisterSwitchComponent } from './public/register-switch/register-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    PathNotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    RegisterSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
