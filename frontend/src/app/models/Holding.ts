import { Instrument } from './Instrument';

export class Holding {
  constructor(
    public instrument: Instrument,
    public quantity: number,
    public buySellPrice: number
  ) {}
}
