
import { useEffect, useState } from 'react'
import style from "./Vendorpage.module.css";
import { Getdetails, Adddetails, Editdetails, Deletedetails } from "../APIService"
import AddUserDetails from '../Form';
import  EditUser  from '../EditUser';
import { PurchaseIndex } from '../Purchase/PurchaseIndex';
import { useCookies} from 'react-cookie'
import {useNavigate } from 'react-router-dom'

export const Vendorindex = () => {
  const [datainput, setDatainput] = useState([]);
  const [filterdata,setFilterData] = useState([]);
  const [showNewUser, setShowNewUser] = useState(false)
  const [showEditUser,setShowEditUser] = useState(false)
  const [editdata,setEditData] =useState()
  const [showorder,setShoworder] = useState(false)
  const [vendor_code, setVendor_code] = useState([])
  const navigate = useNavigate();
  const [accesstoken, removeAccessToken] = useCookies()
  const [removetoken,setRemoveToken] =useState(false)
  

  
    useEffect( ()=>{
      
      console.log(accesstoken)
      if(accesstoken['mytoken']!=='undefined') {
        Getdetails(accesstoken.mytoken)
        .then(resp =>{
          setDatainput(resp)
          setFilterData(resp)
          }) 
      } 
  },[])

//search function
  const handlesearch = (e) =>{
    const searchtext = e.target.value.toLowerCase()
    const filtertext = datainput.filter((data)=>data.name.toLowerCase().includes(searchtext))
    setFilterData(filtertext)
  }

///create new user

const createuser=(e)=>{
  console.log('post',e.target)
  Adddetails(e.target,accesstoken.mytoken)
  .then(resp=>{console.log('post',resp)
    setDatainput(resp)
    filterdata(resp)
  })
}

//Edit user
const edituser =(edittext)=>{
  setEditData(edittext)
  setShowEditUser(true)
  setShowNewUser(false)
  setShoworder(false)
}

const editusersubmit = (e,Vendor_id)=> {
  Editdetails(e.target,Vendor_id,accesstoken.mytoken)
  .then(resp=>{console.log('put',resp)
    setDatainput(resp)
    setFilterData(resp)
  })
}

//Delete


//delete user
const deleteuser=(Vendor_id)=>{
  setShoworder(false)
  setShowEditUser(false)
  Deletedetails(Vendor_id,accesstoken.mytoken)
  .then(resp=>{console.log('delete',resp)
    setDatainput(resp)
    setFilterData(filterdata.filter(p=>p.Vendor_id !==Vendor_id))
  })
  
}


//purchase oredr
const PurchaseOrder=(vendor_code)=>{
  
  console.log("initial",vendor_code)
  setVendor_code(vendor_code)
  setTimeout(function() {
    setShoworder(true)
  }, 500);
  setShoworder(false)
  setShowEditUser(false)
  setShowNewUser(false)
}
//logout
const logout=()=>{
  setRemoveToken(true)
  removeAccessToken(['mytoken']);
  navigate('/') 
  location.reload()
 
}

  return (
    
     <>
      <div className={style.logout}>
          <button className={style.logout_btn} onClick={logout}>Logout</button>
      </div>
      <div className={style.main_container}>

        <h3>VENDOR DETAILS </h3>
        <div className={style.search_tab}>
          <input type='text' placeholder='Enter the text for Search' onChange={handlesearch}></input>
        </div>
        <table className={style.table_ventor}>
          <tbody>
          <tr>
            <th> Name</th>
            <th>Contact details</th>
            <th>Address</th>
            <th>Vendor code</th>
            <th>On time delivery rate</th>
            <th>Quality rating avg</th>
            <th>Average response time</th>
            <th>Fulfillment rate</th>
            <th>UPDATE Action</th>
            <th>DELETE Action</th>
            <th>View Purchase Order</th>
            
            
          </tr>

        { filterdata ? filterdata.map((item)=>(
          <tr key={item.Vendor_id}>
          <td>{item.name}</td>
          <td>{item.contact_details}</td>
          <td>{item.address}</td>
          <td>{item.vendor_code}</td>
          <td>{item.on_time_delivery_rate}</td>
          <td>{item.quality_rating_avg}</td>
          <td>{item.average_response_time}</td>
          <td>{item.fulfillment_rate}</td>
          <td><button className={style.updatebtn} onClick={()=>edituser(item)}>Update</button></td>
          <td><button className={style.deletebtn} onClick={()=>deleteuser(item.Vendor_id)}>Delete</button></td>
          <td><button className={style.PurchaseOrder} onClick={()=>PurchaseOrder(item.vendor_code)}>Purchase Order</button></td>
          </tr>
          
        
        )) : <p>Tabel is Empty</p>}  
        </tbody> 
        </table>

        <div className={style.Add_container}>
        { !showNewUser && <div className={style.ADDbtn}>
          <button onClick={()=>{setShowNewUser(true)
                                setShoworder(false)
                                setShowEditUser(false)
          }}>Create User</button>
        </div>}
        {showNewUser && <div className={style.addform}><AddUserDetails createuser= {createuser} /></div>}
        </div>
        
        <div className={style.EDITUSER}>
          {showEditUser && <EditUser editusersubmit= {editusersubmit} editdata = {editdata} />}
        </div>
        <div className={style.Viewall_purchase}>
          <button onClick={()=>{setShoworder(false); setVendor_code(0); setTimeout(function() {
    setShoworder(true)
  }, 500);}}>View All Purchase</button>
        </div>

        {showorder && <div className={style.PurchaseOrder_container}>
          <PurchaseIndex vendor_code = {vendor_code} /> </div>}
        
      </div>
      
    </>
  )
}
