export class RoboAdvisor {
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public priceDiff: number,
    public quantDiff: number,
    public option: string,
    public risk: number,
    public returnRate: number,
    public score: number
  ) {}
}
