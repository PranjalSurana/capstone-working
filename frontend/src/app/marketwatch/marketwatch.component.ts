import { Component, OnInit } from '@angular/core';
import { MarketwatchService } from '../services/marketwatch.service';
import { Stock } from '../models/Stock';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketwatch',
  templateUrl: './marketwatch.component.html',
  styleUrls: ['./marketwatch.component.css'],
})
export class MarketwatchComponent {
  stockDetails?: Stock[];

  constructor(
    private marketwatchService: MarketwatchService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.authService.getUser()?.preferences === null) {
      this.router.navigate(['/client-preferences']);
      return;
    }
    this.marketwatchService.getMarketWatchData().subscribe((data) => {
      console.log(data);
      this.stockDetails = data;
    });
  }

  onBuyOrSell(id: string, price: number, isBuy: boolean) {
    this.router.navigate(['/trade', id], {
      queryParams: { isBuy: isBuy, price: price },
    });
  }
}
