

// eslint-disable-next-line react/prop-types
export default function AddUserDetails ({createuser}){
  return (
    <>
        <h3> ADD NEW USER</h3>
        <form onSubmit={createuser}>
        Name : <input type='text' name='Name'/>
        Contact details : <input type='text' name='Contact_details'/>
        Address : <input type='text' name='Address'/>
        Vendor code : <input type='text' name='Vendor_code'/>
        On time delivery rate : <input type='text' name='Ontime_delivery_rate'/>
        Quality rating avg : <input type='text' name='Quality_rating_avg'/>
        Average response time : <input type='text' name='Average_response_time'/>
        Fulfillment rate : <input type='text' name='Fulfillment_rate'/>
        <button type='submit'>Create</button>
        </form>
    </>
  )
}

