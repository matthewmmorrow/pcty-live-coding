import type { NextApiRequest, NextApiResponse } from 'next'
import { BeneficiaryType, IBeneficiary, IHealthBenefits } from '../../../../../models'
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
  console.log("Got request from UI!", req.method, req.body)

  //TODO: This would be where we save the data to the UI, let's just return the defaults
  //TODO: I would also calculate the benefits on the server-side and return just to ensure the employee isn't seeing a bad number
  //TODO: Also need to do server-side validation to ensure no duplicate spouses/employee types

  let benefits:IHealthBenefits = {
    beneficiaries: testBeneficiaries,
    employeePerPaycheckSalary: 2000
  }
  res.status(200).json(benefits)
}
