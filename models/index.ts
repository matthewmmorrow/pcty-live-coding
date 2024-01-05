export enum BeneficiaryType {
    EMPLOYEE,
    SPOUSE,
    CHILD
}

export interface IBeneficiary {
    beneficiaryName: string,
    baseAnnualCost: number,
    beneficiaryId: string,
    beneficiaryType: BeneficiaryType
}

export interface IHealthBenefits {
    employeePerPaycheckSalary:number,
    beneficiaries:IBeneficiary[],
}