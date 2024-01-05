import type { NextApiRequest, NextApiResponse } from 'next'
import { BeneficiaryType, IBeneficiary, IHealthBenefits } from '../../../../models'
import { v4 as uuid } from 'uuid';
import test from 'node:test';

let testBeneficiaries:IBeneficiary[] = [
  {beneficiaryName:"Matthew", baseAnnualCost:1000, beneficiaryId:uuid(), beneficiaryType: BeneficiaryType.EMPLOYEE},
  {beneficiaryName:"SummerRay", baseAnnualCost:500, beneficiaryId:uuid(), beneficiaryType: BeneficiaryType.SPOUSE}
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IHealthBenefits>
) {

  //TODO: This would be where we get the data from the database, let's just return some defaults

  let benefits:IHealthBenefits = {
    beneficiaries: testBeneficiaries,
    employeePerPaycheckSalary: 2000
  }
  res.status(200).json(benefits)
}
