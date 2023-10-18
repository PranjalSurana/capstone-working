import { Component } from '@angular/core';
import { BuynsellService } from '../services/buynsell.service';
import { Router } from '@angular/router';
import { Holding } from '../models/Holding';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  holdings?: Holding[];

  constructor(
    private buynsellService: BuynsellService,
    private router: Router
  ) {}
  ngOnInit() {
    this.buynsellService.getHoldings().subscribe((data: any) => {
      this.holdings = data;
    });
  }

  onBuyOrSell(id: string, price: number, isBuy: boolean) {
    this.router.navigate(['/trade', id], {
      queryParams: { isBuy: isBuy, price: price },
    });
  }
}
