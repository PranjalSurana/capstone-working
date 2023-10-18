import { Component } from '@angular/core';
import { RoboAdvisor } from '../models/RoboAdvisor';
import { RoboAdvisorService } from '../services/robo-advisor.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-robo-advisor',
  templateUrl: './robo-advisor.component.html',
  styleUrls: ['./robo-advisor.component.css'],
})
export class RoboAdvisorComponent {

  constructor(private roboService: RoboAdvisorService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

  mockTrades: {
      name: string;
      price: number;
      quantity: number;
      priceDiff: number;
      quantDiff: number;
      option: string;
      risk: number;
      returnRate: number;
      score: number;
    }[] = [];

//   mockTradesBuy: {
//       name: string;
//       price: number;
//       quantity: number;
//       priceDiff: number;
//       quantDiff: number;
//       option: string;
//     }[] = [];
//
//   mockTradesSell: {
//     name: string;
//     price: number;
//     quantity: number;
//     priceDiff: number;
//     quantDiff: number;
//     option: string;
//   }[] = [];

  ngOnInit() {
    this.roboService.getTrades().subscribe((data: RoboAdvisor[]) => {
      this.mockTrades = data;
      console.log(data)
    });
  }

  clearLocalStorage() {
    this.authService.logout();
    this.router.navigate(['/']);
//     this.toastr.success('Logged Out successfully');
//       localStorage.clear();
//       localStorage.removeItem('user');
    }

}
