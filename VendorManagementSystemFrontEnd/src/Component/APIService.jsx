import axios from 'axios';



export async function Getdetails (token) {

  return await axios.get('http://127.0.0.1:8000/api/vendors/', { 
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data)
    .catch(error=>console.log(error))
}

export  function Adddetails(user,token) {
  console.log(user)
  return axios.post('http://127.0.0.1:8000/api/vendors/', {
    name : user.Name.value,
    contact_details: user.Contact_details.value,
    address: user.Address.value,
    vendor_code: user.Vendor_code.value,
    on_time_delivery_rate: user.Ontime_delivery_rate.value,
    quality_rating_avg: user.Quality_rating_avg.value,
    average_response_time: user.Average_response_time.value,
    fulfillment_rate: user.Fulfillment_rate.value,
  },{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data)
    .catch(error=>console.log(error))
}

export  function Editdetails(user ,Vendor_id,token) {
  console.log(Vendor_id)
  return axios.put(`http://127.0.0.1:8000/api/vendors/${Vendor_id}/`, {
    name : user.Name.value,
    contact_details: user.Contact_details.value,
    address: user.Address.value,
    vendor_code: user.Vendor_code.value,
    on_time_delivery_rate: user.Ontime_delivery_rate.value,
    quality_rating_avg: user.Quality_rating_avg.value,
    average_response_time: user.Average_response_time.value,
    fulfillment_rate: user.Fulfillment_rate.value,
  },{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data)
    .catch(error=>console.log(error))
}


export function Deletedetails(Vendor_id,token) {
  console.log(Vendor_id)
  return axios.delete(`http://127.0.0.1:8000/api/vendors/${Vendor_id}/`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data)
    .catch(error=>console.log(error))
}





