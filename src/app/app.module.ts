import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatrixBuilderModule} from "./modules/matrix-builder/matrix-builder.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatrixBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
