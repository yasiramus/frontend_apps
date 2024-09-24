import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
   
    <div id="login_form">

      <form className="loginForm">

        <h1>Login</h1>


        <div className="Row">

          <label htmlFor="email"> Email <i>*</i></label>

          <input
            type="email"

            id="email"

            autoComplete="off"

            // value={email}

            // grabbing values 
            // onChange={(e) => setEmail(e.target.value)}

          />

        <div className="duplicateEmailError">{"unRegisteredemail"}</div>

        </div>

        <div className="Row">

          <label htmlFor="password"> Password <i>*</i></label>

          <input
            
            type= {  'password'}

            id="password"

            autoComplete="off"

            // value={password}

            // grabbing values
            // onChange={(e) => setPassword(e.target.value)}

          />

          <div id="toggle" >toggle</div>

            {/* error message for incorrect password */}
          <div className="duplicateEmailError">incorrectPassword</div>
          
        </div>

        <div className="noaccount">

          <span> Don&#39;t have an account </span> |

          <span>
            <Link href ="/signup"> SignUp </Link>
          </span>

        </div>

        <button type="submit"
          
          disabled
        >
          login
        </button>

        <button type="submit" id="btnLink">
          
          <Link href="/forgotpassword">Forgot Password ?</Link>
          
        </button>          
        
        {/* <ShowModal open={isOpen} onClose={() => { setIsOpen(false) }} /> */}

        {/* <ShowModal open={isOpen}/> */}

        
      </form>
      

    </div>
  )
}

export default Login