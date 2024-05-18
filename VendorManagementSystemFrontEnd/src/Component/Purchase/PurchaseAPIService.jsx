import axios from 'axios';

export function PurchaseAPIServiceGETALL(token){
  return axios.get(`http://127.0.0.1:8000/api/purchase_orders/`,{
    headers:{
        'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data)
    .catch(error=>console.log(error))
}

export function PurchaseAPIServiceCreate(data,token){

  return axios.post(`http://127.0.0.1:8000/api/purchase_orders/`,{
    acknowledgment_date: data.acknowledgment_date,
    delivery_date: data.delivery_date ,
    issue_date: data.issue_date,
    items: {name: data.items_name, type: data.items_type},
    order_date: data.order_date,
    po_number: data.po_number,
    quality_rating: data.quality_rating,
    quantity: data.quantity,
    status: data.status,
    vendor: data.vendor
    },{
      headers:{
          'Content-Type':'application/json',
        'Authorization':`Token ${token}`} })
      .then(resp =>resp.data)
      .catch(error=>console.log(error))
}

export function PurchaseAPIServiceGETONE({vendor_code},token){
 
  return axios.get(`http://127.0.0.1:8000/api/purchase_orders/${vendor_code}/`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data) 
    .catch(error=>console.log(error))
}

export function PurchaseAPIServiceDelete(po_id,token){
  console.log("po_number",po_id)
  return axios.delete(`http://127.0.0.1:8000/api/purchase_orders/${po_id}/`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`} })
    .then(resp =>resp.data) 
    .catch(error=>console.log(error))
}
