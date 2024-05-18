

export default function EditUser({editusersubmit,editdata}) {
  return (
    <>
    <h3> Edit USER</h3>
    <form onSubmit={(e)=>editusersubmit(e,editdata.Vendor_id)}>
    Name : <input type='text' name='Name' defaultValue={editdata.name}/>
    Contact details : <input type='text' name='Contact_details' defaultValue={editdata.contact_details}/>
    Address : <input type='text' name='Address' defaultValue={editdata.address}/>
    Vendor code : <input type='text' name='Vendor_code' defaultValue={editdata.vendor_code}/>
    On time delivery rate : <input type='text' name='Ontime_delivery_rate' defaultValue={editdata.on_time_delivery_rate}/>
    Quality rating avg : <input type='text' name='Quality_rating_avg' defaultValue={editdata.quality_rating_avg}/>
    Average response time : <input type='text' name='Average_response_time' defaultValue={editdata.average_response_time}/>
    Fulfillment rate : <input type='text' name='Fulfillment_rate' defaultValue={editdata.fulfillment_rate}/>
    <button type='submit'>Edit</button>
    </form>
</>
  )
}
