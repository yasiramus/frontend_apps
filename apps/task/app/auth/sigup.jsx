// axios
import axios from "axios";

// useState
import { useState } from "react";

// import usenavigate
import { useNavigate } from "react-router-dom";

// importing person icons
import { BiUser, BiGroup } from "react-icons/bi";

// email icon
import { FaRegEnvelope } from "react-icons/fa";

// password icon
import { MdLockOutline } from "react-icons/md";

function SignUp() {

  //usenavigate
  const redirect = useNavigate();

  // setting all input fields state
  const [firstName, setFirstName] = useState(""); //first name

  const [firstNameError, setFirstNameError] = useState(""); //first name error

  const [lastName, setLastName] = useState(""); //last name 

  const [lastNameError, setLastNameError] = useState(""); //last name error

  const [otherName, setOtherName] = useState(""); //other name

  const [otherNameError, setOtherNameError] = useState(""); //other name error

  const [email, SetEmail] = useState(""); //email

  const [EmailError, setEmailError] = useState(""); //email error

  const [duplicateEmailError, setDuplicateEmailError] = useState(""); //duplicateEmailError

  const [password, setPassword] = useState(""); //password

  const [passwordError, setPasswordError] = useState(""); //passwordError

  const [confirm_password, setConfirmPassword] = useState(""); //confirm_password

  const [confirmPasswordError, setConfirmPasswordError] = useState(""); //confirmPasswordError

  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(''); //ConfirmPasswordEmpty

  const [error, setError] = useState(""); //first name maxlength and minlength error

  const [error1, setError1] = useState(""); //last name maxlength and min length error

  const [emailMaxLenth, setEmailMaxLength] = useState(""); //emailMaxLenth error

  const [passwordMaxLength, setPasswordMaxLength] = useState(""); //passwordMaxLength error

  // submit form function
  const SubmitForm = async (e) => {

    e.preventDefault();

      // handling error input field at the frontend only 
    if (!firstName) {

      setFirstNameError("enter first name")
      
    }

    else if (!lastName) {

      setLastNameError("enter last name")
      
    }

     else if (!email) {

      setEmailError("enter email")
      
    } 
      
    else if (!password) {

      setPasswordError("enter password")

    } 
      
    else if (!confirm_password) {

      setConfirmPasswordEmpty("confirm password" )

    }
      
    // if password doent match it shold not allow to user to register
    else if (password !== confirm_password) {

      setConfirmPasswordError("Password don't match")

    }

    // if it matches users details should be saved to the database
    else {

      try {

        const SignUser = {

          firstName,

          lastName,

          otherName,

          email,

          password,

          confirm_password,
        };

        const Response = await axios.post(`/user/`, SignUser);

        const { data } = Response;

        console.log(data, "data");

        // setting of id in the local storage 
        window.localStorage.setItem("id", JSON.stringify(data));
        
        // if user details has been saved it shold redirect the user to the login page
        if (data) {

          redirect("/confirm_email", { replace: true });

        };

      } catch (error) {

        console.log(error.response.data, " : errormessage");

        // this error are being handled both backend and frontend 
        //  maxlength and min length error handling for first name field
        if (error.response.data === "first name character should not exceed 9.") {

          setError(error.response.data);

        } else if (error.response.data === "first name character should not be below 2.") {

          setError(error.response.data);

        }
        
        //  maxlength and min length error handling for last name
        else if (error.response.data === "last name character should not exceed 14."){ 

          setError1(error.response.data);

        } else if (error.response.data === "last name character should not be below 2.") {
          
          setError1(error.response.data);

        }  
        // othername maxlength error handling
        else if (error.response.data === "other name character should not exceed 9.") {
          
          setOtherNameError(error.response.data);

        }  
        //  maxlength error handling for email
         else if (error.response.data === "email character should not exceed 29.") {

          return setEmailMaxLength(error.response.data);

        }

         //  maxlength error handling for password
        else if (error.response.data === "password should be above 5 characters.") {

          return setPasswordMaxLength(error.response.data);

        }

        //  duplicate error message for email
        else if (error.message.includes(409)) {

          return setDuplicateEmailError("Sorry can't use this email, use a different one");

        }
        
      };

    }

  };

  return (

    <div id="signup_form">
      <form className="loginForm">
        <h1>SignUp</h1>

        <div className="Row">
          <label htmlFor="firstName">
            <BiUser /> First Name <i>*</i>
          </label>

          <input
            type="text"
            id="firstName"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* setting a conditional statement where the error message disapperimdiatelythe user start typing   for the empty input field*/}
          {!firstName && (
            <div className="duplicateEmailError">{firstNameError}</div>
          )}
        
          {/* {/* setting a conditional statement maxlength and minlength error message/} */}
          {(firstName.length < 9 && firstName.length > 2) ||  (
            <div className="duplicateEmailError">{error}</div>
          )} 

        </div>

        <div className="Row">
          <label htmlFor="lastName">
            <BiGroup /> Last Name <i>*</i>
          </label>

          <input
            type="text"
            id="lastName"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* setting a conditional statement where the error message disapperimdiatelythe user start typing for empty input field */}
          {!lastName && (
            <div className="duplicateEmailError">{lastNameError}</div>
          )}

        {/* {/* setting a conditional statement maxlength and minlength error message/} */}
          {(lastName.length < 14 && lastName.length > 2) ||
            <div className="duplicateEmailError">{error1}</div>
          }

        </div>

        <div className="Row">
          <label htmlFor="otherName">
            <BiUser /> Other Name
          </label>

          <input
            type="text"
            id="otherName"
            autoComplete="off"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
          />

          {/* {/* setting a conditional statement maxlength error message/} */}
          <div className="duplicateEmailError">{otherNameError}</div>  

        </div>

        <div className="Row">
          <label htmlFor="Email">
            <FaRegEnvelope className="svg" /> Email <i>*</i>
          </label>

          <input
            type="email"
            id="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />

          {/* duplicate email  */}
          {!EmailError && (
            <div className="duplicateEmailError">{duplicateEmailError}</div>
          )}

          {/* empty email input field  */}
          {!email && <div className="duplicateEmailError">{EmailError}</div>}

          {/* emailMaxLenth */}
          <div className="duplicateEmailError">{emailMaxLenth}</div>

        </div>

        <div className="Row">
          <label htmlFor="Password">
            <MdLockOutline /> Password <i>*</i>
          </label>

          <input
            type="password"
            id="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* empty password field  */}
          {!password && (
            <div className="duplicateEmailError">{passwordError}</div>
          )}

          {/* {/* setting a conditional statement maxlength error message/} */}
          <div className="duplicateEmailError">{passwordMaxLength}</div>
        </div>

        <div className="Row">
          <label htmlFor="confirm_password">
            <MdLockOutline /> Confirm Password<i> *</i>
          </label>

          <input
            type="password"
            id="confirm_password"
            autoComplete="off"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {!confirm_password && (<div className='duplicateEmailError' >{confirmPasswordEmpty}</div>)}
          
          <div className="duplicateEmailError">{confirmPasswordError}</div>

        </div>

        <button type="submit" onClick={SubmitForm}>
          signUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
