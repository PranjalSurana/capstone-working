export class UserPreference {
    constructor(
        public id: number,
        public investmentPurpose: String,
        public riskTolerance: String,
        public incomeCategory: String,
        public lengthOfInvestment: String,
        public acceptedRoboAdvisor: boolean,
        public isEmpty: boolean
    ) {}
}
