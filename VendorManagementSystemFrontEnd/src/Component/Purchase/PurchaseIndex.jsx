/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import {PurchaseAPIServiceGETALL, PurchaseAPIServiceGETONE,PurchaseAPIServiceCreate, PurchaseAPIServiceDelete } from "./PurchaseAPIService"
import style from'./PurchaseIndex.module.css'
import PurchasecreateForm from "./PurchasecreateForm";
import {useCookies} from 'react-cookie'

export const PurchaseIndex = ({vendor_code}) => {
    const [postdata,setPostdata] = useState([]);
    const [purchasedata, setPurchasedata] = useState([]);
    const [showpurchasecreate,setShowpurchasecreate] = useState(false)
    const [render,setRender] = useState(false)
    const [accesstoken] = useCookies(['mytoken'])
  
    useEffect(()=>{
      
      console.log("second",vendor_code)

      vendor_code !== 0? PurchaseAPIServiceGETONE({vendor_code},accesstoken.mytoken)
     .then(resp =>{
       setPurchasedata(resp)
       setPostdata(resp)
      }) : PurchaseAPIServiceGETALL(accesstoken.mytoken)
    .then(resp =>{
      setPurchasedata(resp)
      setPostdata(resp)
})
      },[render])
    
    //Create Purchase
    const createPurchaseFormSubmit=(data)=>{
      PurchaseAPIServiceCreate(data,accesstoken.mytoken) 
      .then(resp =>{
        setPostdata(resp)
        setPurchasedata(postdata)
      
  })
  }
    //Delete Purchase
    const deletePurchaseFormSubmit=(po_id)=>{
      setRender(true)
      console.log(po_id)
      PurchaseAPIServiceDelete(po_id,accesstoken.mytoken) 
      .then(resp =>{
        setPostdata(resp)
        setPurchasedata(postdata)
        setRender(false)
  })  
  }


  
  return (
    
    <div className={style.purchase_container}>
        <h3>Ventor Purchase Order Details</h3>
        <table className={style.purchase_table}>
          <tbody>
          <tr>
            <th> po_number</th>
            <th>vendor</th>
            <th>order_date</th>
            <th>delivery_date</th>
            <th>items</th>
            <th>quantity</th>
            <th>status</th>
            <th>quality_rating</th>
            <th>issue_date</th>
            <th>acknowledgment_date</th>
            
          </tr>
          {purchasedata ? purchasedata.map((item)=>(
          <tr key={item.po_number}>
          <td>{item.po_number}</td>
          <td>{item.vendor}</td>
          <td>{item.order_date}</td>
          <td>{item.delivery_date}</td>
          <td>
            <ul>
              <li>{item.items.name}</li>
              <li>{item.items.type}</li>
            </ul>
          </td>
          <td>{item.quantity}</td>
          <td>{item.status}</td>
          <td>{item.quality_rating}</td>
          <td>{item.issue_date}</td>
          <td>{item.acknowledgment_date}</td>
          <td><button className={style.purchase_delete} onClick={()=>{deletePurchaseFormSubmit(item.po_id)}}>Delete</button></td>
          </tr>
          
        
        )) : <tr><td> No record Found on Vendor_code:  </td></tr>}  
        </tbody> 
        </table>

        <div className={style.purchase_create}>
          <button className={style.purchase_create} onClick={()=>setShowpurchasecreate(true)}>Create Purchase</button>
        </div>
        <div className={style.purchase_form}> 
        {showpurchasecreate && <div className={style.purchase_create}><PurchasecreateForm createPurchaseFormSubmit ={createPurchaseFormSubmit}/></div>}
         </div>

        </div>
        
  )
 
}
