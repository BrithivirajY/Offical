/* eslint-disable react/prop-types */
import {  useState } from "react"

export default function PurchasecreateForm({createPurchaseFormSubmit}) {

  const [inputs, setInputs] = useState([]);

  const changehandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs)
  }

  return (
    <>
        <h3> ADD NEW USER</h3>
        <form onSubmit={()=>createPurchaseFormSubmit(inputs)}>
        po_number : <input type='text' name='po_number' onChange={changehandle}/>
        vendor : <input type='text' name='vendor' onChange={changehandle}/>
        order_date : <input type='text' name='order_date' onChange={changehandle}/>
        delivery_date : <input type='text' name='delivery_date' onChange={changehandle}/>
        items_name : <input type='text' name='items_name' onChange={changehandle}/>
        items_type : <input type='text' name='items_type' onChange={changehandle}/>
        quantity : <input type='text' name='quantity' onChange={changehandle}/>
        status : <input type='text' name='status' onChange={changehandle}/>
 
        quality_rating : <input type='text' name='quality_rating' onChange={changehandle}/>
        issue_date : <input type='text' name='issue_date' onChange={changehandle}/>
        acknowledgment_date : <input type='text' name='acknowledgment_date' onChange={changehandle}/>
        <button type='submit'>Create</button>
        </form>
    </>
  )
}



