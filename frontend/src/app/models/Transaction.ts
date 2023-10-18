import { Instrument } from './Instrument';

export class Transaction {
  constructor(
    public instrument: Instrument,
    public isBuy: boolean,
    public buySellPrice: number,
    public quantity: number,
    public transactionDate: string
  ) {}
}
