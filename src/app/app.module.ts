import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostServiceService } from './service/post-service.service';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from './common/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [PostServiceService,
  {provide : ErrorHandler, useClass : AppErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
