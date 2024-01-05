import Head from 'next/head'
import { BeneficiaryType, IBeneficiary } from '../models';
import styles from '../styles/Home.module.css'

export interface BeneficiaryProps {
  beneficiary:IBeneficiary,
  removeBeneficiary?:((beneficiaryId:string)=>void),
}

export default function Beneficiary(props:BeneficiaryProps) {
  let removeBeneficiary = props.removeBeneficiary;
  let {beneficiaryId, beneficiaryName, beneficiaryType} = props.beneficiary;
  let nameId = `${beneficiaryId}-name`
  let allowRemove = !!removeBeneficiary;

  function save() {

  }
  
  function remove() {
    removeBeneficiary && removeBeneficiary(beneficiaryId);
  }

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <label  htmlFor={nameId} className="block text-gray-700 text-sm font-bold mb-2">
        Beneficiary Name
      </label>
      <input id="{nameId}" type="text" placeholder="Name" defaultValue={beneficiaryName} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
      {allowRemove && <button onClick={()=>remove()} className="border border-blue-500 bg-white-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 rounded">Remove</button>}
    </div>
  )
}
