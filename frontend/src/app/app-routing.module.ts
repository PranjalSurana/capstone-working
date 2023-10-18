import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MarketwatchComponent } from './marketwatch/marketwatch.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TradehistoryComponent } from './tradehistory/tradehistory.component';
import { ClientPreferencesComponent } from './client-preferences/client-preferences.component';
import { BuynsellComponent } from './buynsell/buynsell.component';
import { RoboAdvisorComponent } from './robo-advisor/robo-advisor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'client-preferences', component: ClientPreferencesComponent },
  { path: 'dashboard', component: MarketwatchComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'tradehistory', component: TradehistoryComponent },
  { path: 'trade/:id', component: BuynsellComponent },
  { path: 'robo-advisor', component: RoboAdvisorComponent }
  // Add more routes for other parts of your application here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
