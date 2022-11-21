import { Component } from '@angular/core';

import { StatusBar } from '@awesome-cordova-plugins/status-bar';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  component = HomeComponent;

  constructor(private platform: Platform) {
    this.platform.ready().then(async () => {
      this.platform.backButton.subscribeWithPriority(
        666666, () => {
          App.exitApp();
        });

      this.setStatusBarOverlayWebView();
    });
  }

  setStatusBarOverlayWebView() {
    const capacitorPlatform = Capacitor.getPlatform();

    if (capacitorPlatform !== "web") {
      StatusBar.overlaysWebView(false);
    }
  }

}
