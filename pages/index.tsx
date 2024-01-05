import Head from 'next/head'
import { IBeneficiary, BeneficiaryType } from '../models'
import styles from '../styles/Home.module.css'
import { v4 as uuid } from 'uuid';
import Beneficiary from '../components/beneficiary';
import { useState } from 'react';

let testBeneficiaries:IBeneficiary[] = [
  {beneficiaryName:"Matthew", baseAnnualCost:1000, beneficiaryId:uuid(), beneficiaryType: BeneficiaryType.EMPLOYEE},
  {beneficiaryName:"SummerRay", baseAnnualCost:500, beneficiaryId:uuid(), beneficiaryType: BeneficiaryType.SPOUSE}
]

export default function Home() {

  let [beneficiaries, setBeneficiaries] = useState(testBeneficiaries);

  // Use the ! non-null assertion operator. An invalid case where the employee doesn't exist is outside the scope.
  let employeeBeneficiary = beneficiaries.find(b=>b.beneficiaryType === BeneficiaryType.EMPLOYEE)!

  let spouseBeneficiary = beneficiaries.find(b=>b.beneficiaryType === BeneficiaryType.SPOUSE)
  let childBeneficiaries = beneficiaries.filter(b=>b.beneficiaryType === BeneficiaryType.CHILD)

  function addSpouse() {
    let newBeneficiary:IBeneficiary = {
      beneficiaryType: BeneficiaryType.SPOUSE,
      beneficiaryId: uuid(),
      beneficiaryName: "",
      baseAnnualCost: 500
    }
    setBeneficiaries(
      [...beneficiaries, newBeneficiary]
    )
  }
  function renderSpouse(spouseBeneficiary?:IBeneficiary) {
    if(!spouseBeneficiary) {
      return <button onClick={()=>addSpouse()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Spouse</button>;
    }
    return <Beneficiary beneficiary={spouseBeneficiary} removeBeneficiary={removeBeneficiary}></Beneficiary>;
  }
  function removeBeneficiary(beneficiaryId:string) {
    setBeneficiaries(beneficiaries.filter(b=>b.beneficiaryId != beneficiaryId));
  }

  function addChild() {
    let newBeneficiary:IBeneficiary = {
      beneficiaryType: BeneficiaryType.CHILD,
      beneficiaryId: uuid(),
      beneficiaryName: "",
      baseAnnualCost: 500
    }
    setBeneficiaries(
      [...beneficiaries, newBeneficiary]
    )
  }
  function renderChild(childBeneficiary:IBeneficiary) {
    return <Beneficiary beneficiary={childBeneficiary} removeBeneficiary={removeBeneficiary}></Beneficiary>;
  }
  function renderChildren(childBeneficiaries:IBeneficiary[]) {
    return <>
      {childBeneficiaries.map(b=>renderChild(b))}
      <button onClick={()=>addChild()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Child</button>
    </>
  }

  return (
    <div>
      <Head>
        <title>Frontend Challenge</title>
      </Head>

      <main className={styles.container}>
        <>
          <h1 className='text-orange-900 text-center text-2xl'>
            Health Benefits Selection
          </h1>
          <h2 className='text-xl'>Employee</h2>
          <Beneficiary beneficiary={employeeBeneficiary}></Beneficiary>
          <h2 className='text-xl'>Spouse</h2>
          {renderSpouse(spouseBeneficiary)}
          <h2 className='text-xl'>Children</h2>
          {renderChildren(childBeneficiaries)}
        </>
      </main>
    </div>
  )
}
