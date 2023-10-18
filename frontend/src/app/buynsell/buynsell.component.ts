import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuynsellService } from '../services/buynsell.service';
import { Instrument } from '../models/Instrument';
import { ToastrService } from 'ngx-toastr';
import { Stock } from '../models/Stock';

@Component({
  selector: 'app-buynsell',
  templateUrl: './buynsell.component.html',
  styleUrls: ['./buynsell.component.css'],
})
export class BuynsellComponent {
  isBuy: boolean = true;
  myBalance: number = 9834899237;
  myStocks: number = 10;
  maxQuantity = 100;
  myStockPrice: number = 34;
  instrument: Instrument = new Instrument('', '', '', '', '', -1, -1);

  constructor(
    private route: ActivatedRoute,
    private buynsellService: BuynsellService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const isBuy = params['isBuy'];
      const price = params['price'];
      this.isBuy = isBuy === 'true';
      this.myStockPrice = price;
    });
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.buynsellService.getInstrumentById(id).subscribe({
        next: (instrument) => {
          this.instrument = instrument;
        },
        error: (err) => {
          this.toastr.error(err.message);
          this.router.navigate(['/dashboard']);
        },
      });
    });
  }

  setIsBuy(isBuy: boolean) {
    this.isBuy = isBuy;
  }

  placeBuyOrder(buySellPrice: number, quantity: number) {
    if (this.myStocks > 100 || this.myStocks < 10) {
      this.toastr.error(
        'Min of 10 stocks required and max of 100 stocks allowed'
      );
      return;
    }
    if (this.myBalance < buySellPrice * quantity) {
      this.toastr.error('Insufficient balance');
      return;
    }
    console.log(this.instrument);
    this.buynsellService
      .placeBuyOrder(this.instrument, buySellPrice, quantity)
      .subscribe({
        next: (transactions) => {
          this.toastr.success('Buy order placed successfully');
          this.router.navigate(['/tradehistory']);
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }

  placeSellOrder(
    instrument: Instrument,
    buySellPrice: number,
    quantity: number
  ) {
    if (this.myStocks > 100 || this.myStocks < 10) {
      this.toastr.error(
        'Min of 10 stocks required and max of 100 stocks allowed'
      );
      return;
    }
    if (quantity > 23) {
      this.toastr.error("You don't have enough stocks to sell");
      return;
    }
    if (this.myStocks < quantity) {
      this.toastr.error('Insufficient stocks');
      return;
    }
    this.buynsellService
      .placeSellOrder(instrument, buySellPrice, quantity)
      .subscribe({
        next: (transactions) => {
          this.toastr.success('Sell order placed successfully');
          this.router.navigate(['/tradehistory']);
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }
}
