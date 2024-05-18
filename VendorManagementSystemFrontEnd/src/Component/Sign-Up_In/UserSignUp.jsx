import { useState } from 'react'
import style from './UserSignUp.module.css';
import { validPassward , ValidEmail} from './Regex'
import {Link} from 'react-router-dom'
import { SignupApi } from './APIAuth'

export const UserSignUp = () => {
    const [uname, setUname] = useState() 
    const [email, setEmail] = useState()
    const [pass1, setPass1] = useState()
    const [pass2, setPass2] = useState()
    const [error, setError] = useState()


    const handlesubmit = (e) =>{
        e.preventDefault()
        

        if(!ValidEmail.test(email))
            {
            setError("Invalid Email ID")
            }
        else if(pass1 !== pass2)
            {
            setError("Passward Does not Match")
            }
        else if(!validPassward.test(pass1))
            {
            setError("Password is not strong")
            }
        else
        {
            SignupApi(uname,email,pass1) 
            .then(resp=>{
                console.log(resp.non_field_errors)
                
                if(resp.non_field_errors === undefined)
                    {
                        setError("Singup Successful")
                    }
                else{
                    setError(resp.non_field_errors)
                }
            })
            }
    }
  return (
    <div className={style.main_container}>
        <div className={style.heading}>
            <h3>USER REGISTATION PAGE</h3>
        </div>
        <div className={style.signup_form}>
            <form onSubmit={handlesubmit}>
                {error && <div className={style.error_message}>{error}</div>}
                <label htmlFor="uname">Username : </label>
                <input type="text" id="uname" placeholder="Enter your Username" className={style.uname} onChange={(e)=>{setUname(e.target.value)}}/>
                <label htmlFor="Email">Email ID : </label>
                <input type="email" id="Email" placeholder="Enter your Email ID" className={style.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="pass1">Password : </label>
                <input type="Password" id="Password" placeholder="Enter your Password" className={style.pass1} onChange={(e)=>{setPass1(e.target.value)}}/>
                <label htmlFor="pass1">Confirm Password : </label>
                <input type="Password" id="pass1" placeholder="Enter your Confirm Password" className={style.pass2} onChange={(e)=>{setPass2(e.target.value)}}/>
                <button>Submit</button>
            </form>

        </div>
        <div className={style.signin_page}>
        <span>To Sign : </span>
        <Link to="/">Signin</Link>
    </div>
    </div>
    

  )
}
