import Head from 'next/head'
import { IBeneficiary, BeneficiaryType } from '../models'
import styles from '../styles/Home.module.css'
import Beneficiary from '../components/beneficiary';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { calculatePerPaycheckCost } from '../services/calculations';

export default function Home() {
  let [beneficiaries, setBeneficiaries] = useState([] as IBeneficiary[]);
  let [employeeSalary, setEmployeeSalary] = useState(0);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/benefits/health/beneficiary')
      .then((res) => res.json())
      .then((data) => {
        setBeneficiaries(data.beneficiaries)
        setEmployeeSalary(data.employeePerPaycheckSalary)
        setIsLoading(false)
      })
  }, [])
  
  function saveBeneficiary(beneficiary:IBeneficiary) {
    //TODO: send a reduced model to the server, get a reduced response
    fetch(`/api/benefits/health/beneficiary/${beneficiary.beneficiaryId}`, {method: "PUT", body: JSON.stringify(beneficiary)},)
      .then((res) => res.json())
      .then((data) => {
        setBeneficiaries(data.beneficiaries)
        setEmployeeSalary(data.employeePerPaycheckSalary)
        setIsLoading(false)
      })
  }

  // Use the ! non-null assertion operator. An invalid case where the employee doesn't exist is outside the scope.
  let employeeBeneficiary = beneficiaries.find(b=>b.beneficiaryType === BeneficiaryType.EMPLOYEE)!

  let spouseBeneficiary = beneficiaries.find(b=>b.beneficiaryType === BeneficiaryType.SPOUSE)
  let childBeneficiaries = beneficiaries.filter(b=>b.beneficiaryType === BeneficiaryType.CHILD)

  let totalCost = beneficiaries.reduce((prev,b,index,all)=>{return prev + calculatePerPaycheckCost(b.beneficiaryName, b.baseAnnualCost)}, 0);
  let netPay = employeeSalary - totalCost;

  function addSpouse() {
    let newBeneficiary:IBeneficiary = {
      beneficiaryType: BeneficiaryType.SPOUSE,
      beneficiaryId: uuid(), //TODO: get from server
      beneficiaryName: "",
      baseAnnualCost: 500 //TODO: get from server
    }
    setBeneficiaries(
      [...beneficiaries, newBeneficiary]
    )
  }
  function renderSpouse(spouseBeneficiary?:IBeneficiary) {
    if(!spouseBeneficiary) {
      return <button onClick={()=>addSpouse()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Spouse</button>;
    }
    return <Beneficiary beneficiary={spouseBeneficiary} removeBeneficiary={removeBeneficiary} saveBeneficiary={saveBeneficiary}></Beneficiary>;
  }
  function removeBeneficiary(beneficiaryId:string) {
    setBeneficiaries(beneficiaries.filter(b=>b.beneficiaryId != beneficiaryId));
  }

  function addChild() {
    let newBeneficiary:IBeneficiary = {
      beneficiaryType: BeneficiaryType.CHILD,
      beneficiaryId: uuid(), //TODO: get from server
      beneficiaryName: "",
      baseAnnualCost: 500 //TODO: get from server
    }
    setBeneficiaries(
      [...beneficiaries, newBeneficiary]
    )
  }
  function renderChild(childBeneficiary:IBeneficiary) {
    return <Beneficiary beneficiary={childBeneficiary} removeBeneficiary={removeBeneficiary} saveBeneficiary={saveBeneficiary}></Beneficiary>;
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
          {isLoading && <span>Loading...</span>}
          {!isLoading && 
          <>
            <h2 className='text-xl'>Employee</h2>
            <Beneficiary beneficiary={employeeBeneficiary} saveBeneficiary={saveBeneficiary}></Beneficiary>
            <h2 className='text-xl'>Spouse</h2>
            {renderSpouse(spouseBeneficiary)}
            <h2 className='text-xl'>Children</h2>
            {renderChildren(childBeneficiaries)}
            <h2 className='text-xl'>Paycheck</h2>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h3 className='text-lg'>Gross Pay</h3>
              ${employeeSalary?.toFixed(2)}
              <h3 className='text-lg'>Health Deductions</h3>
              ${totalCost.toFixed(2)}
              <h3 className='text-lg'>Net Pay</h3>
              ${netPay.toFixed(2)}
            </div>
          </>
          }
        </>
      </main>
    </div>
  )
}
