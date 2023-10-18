import { Instrument } from './Instrument';

export class Stock {
  constructor(
    public askPrice: number,
    public bidPrice: number,
    public priceTimestamp: string,
    public instrument: Instrument
  ) {}
}
