import { UserPreference } from "./UserPreferences";

export class User {
  constructor(
    public id: number,
    public personalName: string,
    public email: string,
    public country: string,
    public dob: string,
    public riskAppetite: string,
    public preferences: UserPreference
  ) {}
}
