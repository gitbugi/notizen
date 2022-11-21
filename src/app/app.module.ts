import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { SQLiteService } from './services/sqlite.service';
import { DetailService } from './services/detail.service';
import { InitializeAppService } from './services/initialize.app.service';

import { DatabaseService } from './services/database.service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule],
  providers: [
    SQLiteService,
    DetailService,
    DatabaseService,
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
