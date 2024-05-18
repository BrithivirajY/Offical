import { useEffect, useState } from "react"
import {useCookies} from 'react-cookie'
import style from './UserSignInstyle.module.css';
import {Link, useNavigate } from 'react-router-dom'

import { LoginApi } from "./APIAuth"


export const UserSignIn = () => {
    const [accesstoken,setAccessToken] = useCookies(['mytoken'])
    const [uname, setUname] = useState() 
    const [pass1, setPass1] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate();
 
    
    useEffect(() =>{
        console.log(accesstoken.mytoken)
        if(accesstoken['mytoken'] !=='undefined') {
            navigate('/vendor')
        } 
            
             
    },[accesstoken])


    const handlesubmit = (e) =>{
        e.preventDefault()
        LoginApi(uname,pass1,setError)
        .then(resp =>{
            if(resp!==undefined)
                {
                   
                    setAccessToken("mytoken",resp.token)

                }
          })  
   

            
    }
  return (
    <div className={style.main_container}>
    <div className={style.heading}>
        <h3>USER LOGIN PAGE</h3>
    </div>
    <div className={style.signin_form}>
        <form onSubmit={handlesubmit}>
     
            {error && <div className={style.error_message}>{error}</div>}
            <label htmlFor="uname">Username : </label>
            <input type="text" id="uname" placeholder="Enter your Username" className={style.uname} onChange={(e)=>{setUname(e.target.value)}}/>
            <label htmlFor="pass1">Password : </label>
            <input type="Password" id="Password" placeholder="Enter your Password" className={style.pass1} onChange={(e)=>{setPass1(e.target.value)}}/>
            <button>Submit</button>
        </form>

    </div>
    <div className={style.signup_page}>
        <span>New User : </span>
        <Link to="/signup">SignUp</Link>
    </div>
</div>
  )
}
