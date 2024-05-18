import axios from 'axios'


export const SignupApi = async(uname,email,pass1) => {
  return (
    await axios.post(`http://127.0.0.1:8000/api/signup/`,
      {
        username: uname,
        email:email,
        password: pass1,
      },{
        headers:{
            'Content-Type':'application/json',
          } })
        .then (resp =>resp.data)   
        .catch(error=>console.error(error))
  )
  }


export const LoginApi = async(uname,pass1,setError) => {
  return (
     await axios.post(`http://127.0.0.1:8000/api/signin/`,
      {
        username: uname,
        password: pass1,
      },{
        headers:{
            'Content-Type':'application/json',
          } })
        .then (resp =>resp.data)   
       
        .catch(error=>{console.log(error)
        setError(error.response.data.non_field_errors)
        })
       
  )
  }

