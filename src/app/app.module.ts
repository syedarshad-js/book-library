import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from './ui/ui.module';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
