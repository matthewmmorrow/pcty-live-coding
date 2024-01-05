import Head from 'next/head'
import { useState } from 'react';
import { BeneficiaryType, IBeneficiary } from '../models';
import { calculatePerPaycheckCost } from '../services/calculations';
import styles from '../styles/Home.module.css'

export interface BeneficiaryProps {
  beneficiary:IBeneficiary,
  removeBeneficiary?:((beneficiaryId:string)=>void),
  saveBeneficiary:((beneficiary:IBeneficiary)=>void)
}

export default function Beneficiary(props:BeneficiaryProps) {
  let [beneficiaryName, setBeneficiaryName] = useState(props.beneficiary.beneficiaryName);
  let [isEditing,setIsEditing] = useState(false);
  let {removeBeneficiary, saveBeneficiary} = props;
  let {beneficiaryId, baseAnnualCost} = props.beneficiary;
  let nameId = `${beneficiaryId}-name`
  let allowRemove = !!removeBeneficiary;
  let perPaycheckCost = calculatePerPaycheckCost(beneficiaryName, baseAnnualCost);

  function save() {
    // Quick validator, no validation message
    if(!beneficiaryName) return;
    saveBeneficiary({
      ...props.beneficiary,
      beneficiaryName: beneficiaryName
    })
    setIsEditing(false);
  }

  function edit() {
    setIsEditing(true);
  }

  function updateName(name:string) {
    setBeneficiaryName(name);
  }
  
  function remove() {
    removeBeneficiary && removeBeneficiary(beneficiaryId);
  }

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <label  htmlFor={nameId} className="block text-gray-700 text-sm font-bold mb-2">
        Beneficiary Name
      </label>
      <input id="{nameId}" onChange={(e)=>{updateName(e.target.value)}} required={true} disabled={!isEditing} type="text" placeholder="Name" defaultValue={beneficiaryName} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"></input>
      {!isEditing && <button onClick={()=>edit()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Edit</button>}
      {isEditing && <button onClick={()=>save()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Save</button>}
      {allowRemove && <button onClick={()=>remove()} className="border border-blue-500 bg-white-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 rounded">Remove</button>}
      <div>
        Cost per paycheck: ${perPaycheckCost.toFixed(2)}
      </div>
    </div>
  )
}
