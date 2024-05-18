

import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom'
import { UserSignIn } from './Component/Sign-Up_In/UserSignIn'
import { UserSignUp } from './Component/Sign-Up_In/UserSignUp'
import { Vendorindex } from './Component/Index/Vendorindex'
import {CookiesProvider} from 'react-cookie';


function App() {


  return (
    <>
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
      <Route index element = {<UserSignIn/>}/>
        <Route path = 'index' element={<UserSignIn />}/>
        <Route path = '/signup' element={<UserSignUp/>}/>
        <Route path = '/vendor' element={<Vendorindex/>}/>
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
    </>
  )
}

export default App
