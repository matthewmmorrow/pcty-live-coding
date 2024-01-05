import { IBeneficiary } from "../models";

export const PAYCHECKS_PER_YEAR:number = 26;
export function calculateTotalAnnualCost(beneficiaryName:string, baseAnnualCost:number) {
    // Anyone whose name starts with ‘A’ gets a 10% discount, employee or dependent
    let discountedRate = beneficiaryName?.toLocaleUpperCase().charAt(0) === "A" ? .9 : 1;
    return baseAnnualCost * discountedRate;
}

export function calculatePerPaycheckCost(beneficiaryName:string, baseAnnualCost:number) {
    return calculateTotalAnnualCost(beneficiaryName, baseAnnualCost) / PAYCHECKS_PER_YEAR;
}