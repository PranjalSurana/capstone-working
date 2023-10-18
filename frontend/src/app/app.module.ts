import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarketwatchComponent } from './marketwatch/marketwatch.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TradehistoryComponent } from './tradehistory/tradehistory.component';
import { ClientPreferencesComponent } from './client-preferences/client-preferences.component';
import { BuynsellComponent } from './buynsell/buynsell.component';
import { RoboAdvisorComponent } from './robo-advisor/robo-advisor.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ClientPreferencesComponent,
    RoboAdvisorComponent,
    MarketwatchComponent,
    PortfolioComponent,
    TradehistoryComponent,
    BuynsellComponent,
    RoboAdvisorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
