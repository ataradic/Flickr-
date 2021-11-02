import { FlickrService } from './services/flickr.service';
import { DataService } from './services/data.service';

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LastUploadedComponent } from './last-uploaded/last-uploaded.component';
import { AppErrorHandler } from './errors/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    LastUploadedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'lastUploaded', pathMatch: 'full'},
      {path: 'lastUploaded', component:LastUploadedComponent},
    ]),
  ],
  providers: [
    DataService,
    FlickrService,
    {provide:ErrorHandler,useClass:AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
