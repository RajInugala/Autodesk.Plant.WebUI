import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';

import { LoginComponent } from './shared/login.component';
import { LoginService } from './shared/login.service';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        HttpModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        LoginComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        LoginService
    ]
})
export class AppModule { }
