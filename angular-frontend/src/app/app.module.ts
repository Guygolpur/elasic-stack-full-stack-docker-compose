import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameService } from './name.service';
import { FormsModule } from '@angular/forms';
import { ApmModule, ApmService } from '@elastic/apm-rum-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApmModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApmService, NameService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    service.init({
      serviceName: 'your-angular-app',
      serverUrl: 'http://localhost:8200',
      environment: 'development',
    })
  }
}
