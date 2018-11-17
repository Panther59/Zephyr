import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AuthService } from './_services/auth.service';
import { MessageService } from './_services/message.service';
import { StorageService } from './_services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    BlockUIModule.forRoot()],
  providers: [
    AuthService,
    MessageService,
    StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
